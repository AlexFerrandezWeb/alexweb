// Número de contacto en formato internacional sin '+' ni espacios (lo que espera wa.me)
export const TELEFONO_WHATSAPP = '34722292050'

const MENSAJE_POR_DEFECTO =
  'Hola Alex, he visto tu web y me gustaría información sobre una página para mi negocio.'

export const enlaceWhatsApp = (mensaje = MENSAJE_POR_DEFECTO) =>
  `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`

// Registramos el clic en GA4 para poder medir cuántos contactos salen por WhatsApp
export const registrarClicWhatsApp = (metodo) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'contacto_whatsapp', { metodo })
  }
}
