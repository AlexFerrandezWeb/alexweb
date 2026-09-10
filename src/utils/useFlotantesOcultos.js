import { useEffect } from 'react'

// Aparta los dos botones flotantes (WhatsApp y chat) mientras el elemento que
// se le pasa esta en pantalla. Se usa con los formularios de contacto: los
// flotantes viven en la esquina de abajo a la derecha, justo encima del boton
// de enviar, y ahi ademas sobran, que el formulario ya es el canal de contacto.
//
// Se mira el formulario y no la seccion entera a proposito: asi los botones
// desaparecen exactamente mientras hay algo que tapar y vuelven en cuanto el
// formulario sale de la pantalla, ya sea subiendo o bajando al footer.
//
// El aviso viaja por una clase en el body, como la cabecera con nav-hidden, y
// asi ningun boton flotante necesita saber en que pagina esta ni recibir props
// desde arriba. Quien decide que hacer con la clase es el CSS de cada boton.
export const useFlotantesOcultos = (referencia) => {
  useEffect(() => {
    const objetivo = referencia.current
    if (!objetivo || typeof IntersectionObserver === 'undefined') return

    // El observador dispara solo al empezar a observar, asi que no hace falta
    // dejar la clase puesta de entrada: se corrige sola en el primer aviso.
    const observador = new IntersectionObserver(([entrada]) => {
      document.body.classList.toggle('flotantes-ocultos', entrada.isIntersecting)
    })
    observador.observe(objetivo)

    return () => {
      observador.disconnect()
      // Sin esto la clase se queda puesta al cambiar de pagina y los botones
      // desaparecen del resto del sitio.
      document.body.classList.remove('flotantes-ocultos')
    }
  }, [referencia])
}
