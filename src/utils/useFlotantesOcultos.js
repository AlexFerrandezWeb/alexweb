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

// Los botones no ocupan la pantalla entera, solo la esquina de abajo a la
// derecha: entre los dos, el aire que se dejan y el margen del iPhone, unos
// 190px contados desde el borde de abajo. Asi que no hay que esconderlos
// mientras se vea el formulario, sino solo mientras el formulario pase por esa
// franja, que es lo unico que pueden tapar. En cuanto has bajado del boton de
// enviar vuelven a salir, que es donde ya no molestan.
//
// El 30% es esa franja medida en porcentaje para no tener que rehacer el
// observador cada vez que cambia el alto de la ventana (en el movil cambia
// solo, al recogerse la barra del navegador). En pantallas de movil, de 568 a
// 932px de alto, sale una franja de entre 170 y 280px: cubre los 190 con
// holgura y sin llegar a media pantalla.
const FRANJA_FLOTANTES = '-70% 0px 0px 0px'

export const useFlotantesOcultos = (referencia) => {
  useEffect(() => {
    const objetivo = referencia.current
    if (!objetivo || typeof IntersectionObserver === 'undefined') return

    // El observador dispara solo al empezar a observar, asi que no hace falta
    // dejar la clase puesta de entrada: se corrige sola en el primer aviso.
    const observador = new IntersectionObserver(([entrada]) => {
      document.body.classList.toggle('flotantes-ocultos', entrada.isIntersecting)
    }, { rootMargin: FRANJA_FLOTANTES })
    observador.observe(objetivo)

    return () => {
      observador.disconnect()
      // Sin esto la clase se queda puesta al cambiar de pagina y los botones
      // desaparecen del resto del sitio.
      document.body.classList.remove('flotantes-ocultos')
    }
  }, [referencia])
}
