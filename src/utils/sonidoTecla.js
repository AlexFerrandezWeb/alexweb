// El "clac" del boton de Contacto, que se comporta como una tecla de teclado.
//
// Va sintetizado en el navegador y no como archivo de audio a proposito: son
// cuatro lineas de cuentas contra un mp3 que habria que descargar, cachear y
// servir en cada visita para 60 milisegundos de sonido.
//
// La receta de un clac de tecla es ruido blanco que se apaga muy rapido: el
// golpe seco del plastico no tiene nota, es un chasquido. La curva de apagado
// (elevado a 8) es lo que lo convierte en golpe y no en siseo, y el filtro se
// queda con la banda aguda, que es donde vive el chasquido; sin el suena a
// tambor.
const DURACION = 0.06
const FRECUENCIA_CLAC = 2200
// Bajito: esto acompana a un gesto que el usuario ya ha hecho, no avisa de
// nada. A volumen de aviso, en la tercera visita cansa.
const VOLUMEN = 0.12

// Un solo contexto para toda la sesion. Crear uno por pulsacion funciona hasta
// que el navegador corta por numero de contextos abiertos, y entonces deja de
// sonar sin decir por que.
let contexto

const obtenerContexto = () => {
  const Audio = window.AudioContext || window.webkitAudioContext
  if (!Audio) return null
  if (!contexto) contexto = new Audio()
  // En el movil el contexto nace dormido y solo se puede despertar dentro de un
  // gesto del usuario, que es justo donde se llama a esto.
  if (contexto.state === 'suspended') contexto.resume()
  return contexto
}

export const sonarTecla = () => {
  try {
    const ctx = obtenerContexto()
    if (!ctx) return

    const muestras = Math.ceil(ctx.sampleRate * DURACION)
    const buffer = ctx.createBuffer(1, muestras, ctx.sampleRate)
    const datos = buffer.getChannelData(0)
    for (let i = 0; i < muestras; i++) {
      datos[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / muestras, 8)
    }

    const fuente = ctx.createBufferSource()
    fuente.buffer = buffer

    const filtro = ctx.createBiquadFilter()
    filtro.type = 'bandpass'
    filtro.frequency.value = FRECUENCIA_CLAC
    filtro.Q.value = 0.8

    const ganancia = ctx.createGain()
    ganancia.gain.value = VOLUMEN

    fuente.connect(filtro)
    filtro.connect(ganancia)
    ganancia.connect(ctx.destination)
    fuente.start()
  } catch {
    // Si el navegador no deja sonar (permisos, ahorro de bateria), el boton
    // sigue funcionando igual: el sonido es el adorno, no la funcion.
  }
}
