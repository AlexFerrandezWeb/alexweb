import { useEffect, useState } from 'react'

// Devuelve true mientras el usuario esta haciendo scroll y vuelve a false
// cuando se para. Lo usan los dos botones flotantes para apartarse del
// contenido durante el scroll y volver en cuanto el usuario se detiene, que es
// justo cuando puede pulsarlos.
//
// 450ms es el punto de equilibrio: por debajo el boton parpadea entre gesto y
// gesto de dedo, y por encima se hace de rogar cuando el usuario ya ha parado.
const ESPERA_MS = 450

export const useScrollActivo = () => {
  const [scrollActivo, setScrollActivo] = useState(false)

  useEffect(() => {
    let temporizador

    const alHacerScroll = () => {
      setScrollActivo(true)
      clearTimeout(temporizador)
      temporizador = setTimeout(() => setScrollActivo(false), ESPERA_MS)
    }

    window.addEventListener('scroll', alHacerScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', alHacerScroll)
      clearTimeout(temporizador)
    }
  }, [])

  return scrollActivo
}
