import React from 'react'
import { LandingSEO } from './LandingSEO'

export const contenido = {
  ruta: '/diseno-web-economico',

  seo: {
    titulo: 'Diseño web económico desde 350€, sin cuotas ni sorpresas',
    descripcion:
      'Diseño web económico a medida desde 350€. Sin cuotas mensuales obligatorias, sin permanencia y con el código en tu propiedad. Entrega en 2-3 semanas. Presupuesto gratis.',
  },

  hero: {
    badge: 'Económico de verdad, no barato',
    h1: 'Diseño web económico, sin que se note en el resultado',
    subtitulo:
      'Webs a medida desde 350€. Barato no significa cargar una plantilla y desaparecer: significa cobrarte solo por lo que de verdad necesitas y no venderte lo que no.',
    mensajeWhatsApp:
      'Hola Alex, busco una web económica para mi negocio. ¿Qué opciones tengo?',
  },

  intro: [
    'Hay dos formas de que una web salga barata. Una es recortar donde se nota: plantilla genérica, textos rellenados con lo primero que salga y desaparecer al cobrar. La otra es quitar lo que no necesitas y hacer bien lo que sí. Yo trabajo de la segunda.',
    'La mayoría de negocios pequeños no necesitan diez páginas, ni panel de administración, ni una tienda con 500 referencias. Necesitan una página que explique qué hacen, que se vea perfecta en el móvil y por la que puedan contactarles. Eso son 350€, no 3.000€.',
    'Lo importante es que ahorrar hoy no te salga caro dentro de un año. Por eso, incluso en el plan más económico, el código y el dominio son tuyos, no hay cuota obligatoria para mantener la web viva, y si mañana quieres ampliarla no hay que empezar de cero.',
  ],

  bloques: {
    titulo: 'Dónde sí se puede ahorrar y dónde no',
    items: [
      {
        titulo: 'Sí: en el número de páginas',
        texto:
          'Una sola página bien organizada puede contar lo mismo que cinco mal repartidas, y encima el visitante no se pierde. Es el mayor ahorro real que existe y no le quita nada a tu web.',
      },
      {
        titulo: 'Sí: en funciones que no vas a usar',
        texto:
          'Panel de gestión, blog, multiidioma, reservas online. Todo eso está muy bien cuando hace falta. Si no lo vas a tocar, es dinero tirado. Lo añadimos el día que lo necesites de verdad.',
      },
      {
        titulo: 'Sí: escribiendo tú los textos',
        texto:
          'Nadie conoce tu negocio mejor que tú. Si me pasas los textos, aunque estén en bruto, te ahorras las horas de redacción. Yo los pulo y los ordeno, que es mucho más rápido que partir de cero.',
      },
      {
        titulo: 'No: en que se vea bien en el móvil',
        texto:
          'Más de la mitad de tus visitas vienen del teléfono. Una web que en el móvil obliga a hacer zoom pierde al visitante en segundos. Esto no es un extra opcional, va siempre incluido.',
      },
      {
        titulo: 'No: en la velocidad de carga',
        texto:
          'Si tu web tarda más de tres segundos, buena parte de la gente se va antes de verla y Google te penaliza. Es exactamente lo que suele fallar en las webs de plantilla más baratas.',
      },
      {
        titulo: 'No: en la parte legal',
        texto:
          'Aviso legal, privacidad y cookies con banner de consentimiento. Ahorrarse esto puede salir carísimo: las sanciones por incumplir el RGPD parten de cifras muy por encima de lo que cuesta la web.',
      },
    ],
  },

  precios: {
    titulo: 'La opción económica, en detalle',
    intro:
      'Sin cuota mensual obligatoria: si no quieres mantenimiento, no lo contratas y tu web sigue funcionando igual. Pagas una vez y es tuya. Los precios son sin IVA: al ser un gasto de tu negocio, te lo deduces.',
    planes: [
      {
        nombre: 'Landing Starter',
        precio: 'desde 350€',
        destacado: true,
        para: 'La opción más económica. Lo esencial, bien hecho y sin recortar donde importa.',
        incluye: [
          '1 sección larga y 3 pequeñas',
          'SEO y posicionamiento local',
          'Diseño a medida y responsive, para cualquier pantalla',
          'Formulario de contacto',
          'Botones flotantes de WhatsApp y chat básico',
          'Textos legales y cookies',
          'Entrega en 2 semanas',
        ],
      },
      {
        nombre: 'Landing Premium',
        precio: 'desde 499€',
        para: 'Si necesitas contar más cosas o quieres que entre mejor por los ojos.',
        incluye: [
          '8 secciones personalizadas, 2 de ellas grandes',
          'SEO y posicionamiento local o nacional',
          'Diseño a medida y responsive, para cualquier pantalla',
          'Formulario de contacto',
          'Botones flotantes de WhatsApp y chat básico',
          'Google Analytics y Search Console para ver tus estadísticas',
          'Entrega en 2-3 semanas',
        ],
      },
      {
        nombre: 'Mantenimiento',
        precio: '50€/mes',
        para: 'Totalmente opcional. Tu web funciona sin esto; es para no tener que ocuparte tú.',
        incluye: [
          'Actualizaciones de seguridad',
          'Copias de seguridad',
          'Pequeños ajustes incluidos',
          'Informe mensual en PDF',
          'Sin permanencia',
        ],
      },
    ],
    nota:
      'Gastos que no dependen de mí: dominio entre 10 y 15€ al año, y alojamiento, que en una web de este tamaño puede salirte gratis. Todo con factura y deducible como gasto profesional.',
  },

  faqs: [
    {
      pregunta: '¿Por 350€ me haces una web de verdad?',
      respuesta:
        'Una landing page a medida, sí. No un sitio de diez páginas ni una tienda online: para eso hacen falta más horas y el precio sube. Lo que te llevas por 350€ es una página diseñada para tu negocio, rápida, que funciona en el móvil y con lo legal en regla.',
    },
    {
      pregunta: '¿Hay alguna cuota mensual obligatoria?',
      respuesta:
        'No. Pagas la web una vez y es tuya. El mantenimiento es opcional y sin permanencia, y si lo cancelas tu web sigue funcionando exactamente igual. No trabajo con el modelo de cuota eterna para mantener tu web encendida.',
    },
    {
      pregunta: '¿Puedo empezar barato y ampliar después?',
      respuesta:
        'Es justo lo que recomiendo. Empieza con la landing, comprueba si te trae clientes y amplía cuando lo notes. Como el código es a medida y tuyo, ampliar no obliga a rehacer nada.',
    },
    {
      pregunta: '¿Qué necesitas de mí para que salga a este precio?',
      respuesta:
        'Idealmente los textos, aunque sea en bruto, tu logo si lo tienes y algunas fotos. Cuanto más material me des, menos horas y más ajustado el precio. Si no tienes nada, también lo resolvemos, pero cuenta con que sube.',
    },
    {
      pregunta: '¿Trabajas con clientes de toda España?',
      respuesta:
        'Sí, en remoto y con cualquier provincia. Nos organizamos por videollamada, teléfono o WhatsApp. No hace falta vernos en persona en ningún momento del proyecto.',
    },
    {
      pregunta: '¿Y si dentro de un tiempo quiero cambiar de desarrollador?',
      respuesta:
        'Te llevas el dominio y el código. Son tuyos desde el primer día. No hay sistemas cerrados ni ataduras que te obliguen a seguir contando conmigo.',
    },
  ],

  cierre: {
    tituloFaq: 'Preguntas sobre webs económicas',
    titulo: 'Dime qué necesitas y te digo qué cuesta',
    texto:
      'Cuéntame tu negocio en dos líneas. Te propongo la opción más ajustada que cubra lo que de verdad necesitas, y si creo que puedes gastar menos de lo que tenías pensado, te lo digo.',
  },
}

export const DisenoWebEconomico = () => <LandingSEO contenido={contenido} />
