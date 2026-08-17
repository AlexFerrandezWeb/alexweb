import React from 'react'
import { LandingSEO } from './LandingSEO'

export const contenido = {
  ruta: '/diseno-web-para-pymes',

  seo: {
    titulo: 'Diseño web para pymes: precios claros y sin plantillas',
    descripcion:
      'Diseño web para pymes y autónomos a medida, sin plantillas. Precios cerrados desde 350€, entrega en 2-6 semanas y trato directo con el desarrollador. Presupuesto gratis.',
  },

  hero: {
    badge: 'Pymes y autónomos · Toda España',
    h1: 'Diseño web para pymes que quieren vender, no solo estar',
    subtitulo:
      'Webs a medida para pequeñas empresas y autónomos. Precio cerrado desde el principio, sin plantillas recicladas y hablando siempre con la persona que programa tu web.',
    mensajeWhatsApp:
      'Hola Alex, tengo una pyme y me interesa una web. ¿Podemos hablar del presupuesto?',
  },

  intro: [
    'La mayoría de pymes en España tienen uno de estos dos problemas: o no tienen web, o tienen una que hicieron hace años, no se ve bien en el móvil y no aparece en Google. En ambos casos el resultado es el mismo: los clientes buscan lo que vendes, encuentran a tu competencia y nunca llegan a ti.',
    'Yo trabajo solo con negocios pequeños. No monto webs de mil páginas ni te voy a vender un plan de marketing de cinco cifras. Hago lo que una pyme necesita de verdad: una web rápida, que se entienda, que funcione en el móvil y por la que te encuentren cuando alguien busca tu servicio.',
    'Y algo que suena obvio pero no lo es tanto: hablas conmigo. No con un comercial que te promete cosas y luego desaparece, ni con un gestor de cuentas que traslada tus correos a otra persona. La misma persona que te atiende es la que escribe el código.',
  ],

  bloques: {
    titulo: 'Qué incluye una web para pyme',
    items: [
      {
        titulo: 'Diseño a medida, sin plantillas',
        texto:
          'No compro una plantilla de 40€ y le cambio el logo. Cada web se diseña desde cero según tu negocio, tus colores y lo que necesitas contar. Eso significa que tu web no se parece a la de otros 3.000 negocios.',
      },
      {
        titulo: 'Pensada primero para el móvil',
        texto:
          'Más de la mitad de tus visitas van a entrar desde el teléfono, a menudo por la calle y con mala cobertura. Diseño primero la versión móvil y luego la de ordenador, no al revés. Por eso mis webs cargan rápido.',
      },
      {
        titulo: 'Preparada para Google',
        texto:
          'Estructura, títulos, descripciones, velocidad de carga y datos estructurados configurados desde el primer día. No es magia ni te va a poner el primero en una semana, pero sin esto directamente no compites.',
      },
      {
        titulo: 'Que la gente te pueda contactar',
        texto:
          'Formulario que llega a tu correo, botón de WhatsApp, teléfono pulsable y tu ubicación en el mapa. Suena básico, pero es lo primero que falla en la mayoría de webs de pymes que reviso.',
      },
      {
        titulo: 'Legal y en regla',
        texto:
          'Aviso legal, política de privacidad, política de cookies y banner de consentimiento conforme al RGPD. Incluido, no como extra. Las multas por no tenerlo empiezan en cifras que duelen.',
      },
      {
        titulo: 'Tuya de verdad',
        texto:
          'El dominio y el código son tuyos. Si algún día quieres irte con otra persona, te llevas todo. No trabajo con sistemas cerrados que te obligan a quedarte pagando cada mes para siempre.',
      },
    ],
  },

  precios: {
    titulo: 'Cuánto cuesta',
    intro:
      'Precios reales, los mismos que le paso a cualquiera que me escribe. El presupuesto que te doy es el que pagas: si a mitad de proyecto pides algo que no estaba hablado, te digo lo que cuesta antes de hacerlo.',
    planes: [
      {
        nombre: 'Landing Page',
        precio: 'desde 350€',
        para: 'Para un negocio que solo necesita presencia: quién eres, qué haces y cómo contactarte.',
        incluye: [
          'Una página con todas tus secciones',
          'Diseño responsive y a medida',
          'Formulario de contacto',
          'SEO básico configurado',
          'Textos legales y cookies',
          'Entrega en 2-3 semanas',
        ],
      },
      {
        nombre: 'Sitio Web Básico',
        precio: '699€',
        destacado: true,
        para: 'Para pymes con varios servicios que quieren presencia profesional y empezar a posicionarse en Google.',
        incluye: [
          'De 3 a 5 páginas',
          'Diseño responsive',
          'SEO básico incluido',
          'Formulario de contacto',
          'Google Analytics incluido',
          'Entrega en 3-4 semanas',
        ],
      },
      {
        nombre: 'Mantenimiento',
        precio: 'desde 50€/mes',
        para: 'Opcional. Para no tener que preocuparte de actualizaciones, copias ni de que algo se rompa.',
        incluye: [
          'Actualizaciones de seguridad',
          'Copias de seguridad',
          'Pequeños cambios incluidos',
          'Informe mensual en PDF',
          'Sin permanencia',
        ],
      },
    ],
    nota:
      'Todos los precios llevan factura, así que como autónomo o empresa puedes desgravarlo. Consulta con tu gestor tu caso concreto.',
  },

  faqs: [
    {
      pregunta: '¿Por qué una web a medida y no Wix o WordPress con plantilla?',
      respuesta:
        'Si tu presupuesto es muy justo y solo necesitas algo online, una plantilla puede servirte y te lo diré honestamente. Pero las plantillas cargan mucho código que no usas, lo que las hace lentas, y Google penaliza la lentitud. Además acabas pagando una cuota mensual eterna y tu web se parece a miles de otras. Una web a medida es más cara al principio y más barata a los tres años.',
    },
    {
      pregunta: '¿Trabajas con clientes de toda España?',
      respuesta:
        'Sí, en remoto y con cualquier provincia. Nos organizamos por videollamada, teléfono o WhatsApp, lo que te resulte más cómodo. No necesitas que vaya a tu oficina para hacerte una web.',
    },
    {
      pregunta: 'No tengo textos ni fotos. ¿Es un problema?',
      respuesta:
        'Es lo más habitual y no, no es un problema. Te paso un guion con las preguntas que necesito y a partir de tus respuestas redacto los textos. Con las fotos te oriento sobre qué necesitas y, si no tienes nada, usamos imágenes de calidad con licencia mientras consigues las tuyas.',
    },
    {
      pregunta: '¿Cuánto tarda en aparecer mi web en Google?',
      respuesta:
        'Indexada, es decir, que exista en Google, en días o pocas semanas. Posicionada en los primeros puestos para búsquedas con competencia, entre 3 y 6 meses de trabajo constante. Cualquiera que te prometa el primer puesto en un mes te está mintiendo.',
    },
    {
      pregunta: '¿Qué pasa si no me gusta el diseño?',
      respuesta:
        'Antes de programar nada te enseño el diseño. Si no te convence, lo cambiamos. En los planes Premium van incluidas dos rondas de revisiones. Nunca vas a recibir una web terminada que veas por primera vez el día de la entrega.',
    },
    {
      pregunta: '¿Hay que pagar todo por adelantado?',
      respuesta:
        'No. En las Landing Pages no pido nada por adelantado. En sitios web completos pido una señal para reservar la fecha de inicio y el resto se paga a la entrega. Si necesitas fraccionarlo, lo hablamos.',
    },
  ],

  cierre: {
    tituloFaq: 'Dudas frecuentes sobre webs para pymes',
    titulo: '¿Hablamos de tu negocio?',
    texto:
      'Cuéntame a qué te dedicas y qué necesitas. Te digo con franqueza si te puedo ayudar, qué te costaría y cuánto tardaría. Si creo que no soy la mejor opción para ti, también te lo digo.',
  },
}

export const DisenoWebPymes = () => <LandingSEO contenido={contenido} />
