import React from 'react'
import { LandingSEO } from './LandingSEO'

export const contenido = {
  ruta: '/cuanto-cuesta-una-pagina-web',

  seo: {
    titulo: '¿Cuánto cuesta una página web en 2026? Precios reales',
    descripcion:
      'Cuánto cuesta una página web: desde 350€ una landing, 699€ una web completa y 999€ una tienda online, más IVA. Qué encarece el precio y qué gastos tiene.',
  },

  hero: {
    badge: 'Precios sin rodeos',
    h1: '¿Cuánto cuesta una página web?',
    subtitulo:
      'La respuesta honesta: entre 350€ y 3.000€ según lo que necesites. Abajo te explico exactamente qué mueve ese precio, para que sepas si un presupuesto es justo o te están inflando la factura.',
    mensajeWhatsApp:
      'Hola Alex, he visto tu página de precios y quiero saber cuánto costaría mi web.',
  },

  intro: [
    'Preguntar cuánto cuesta una página web es como preguntar cuánto cuesta un coche: depende de si necesitas un utilitario para ir al trabajo o una furgoneta para repartir. El problema es que en este sector casi nadie da precios, y cuando por fin te pasan un presupuesto no tienes con qué compararlo.',
    'Así que voy a hacer algo poco habitual: enseñarte mis precios reales y explicarte de dónde salen. Son los mismos que le paso a cualquiera que me escribe, estés leyendo esto o no.',
    'Como referencia del mercado español en 2026: una plantilla montada por un principiante ronda los 200-400€; un profesional autónomo va de 400€ a 3.000€ según el proyecto; y una agencia con equipo raramente baja de 3.000€ y sube con facilidad a cinco cifras. Ninguno de los tres es una estafa: son servicios distintos para necesidades distintas.',
  ],

  bloques: {
    titulo: 'Qué hace que una web cueste más o menos',
    items: [
      {
        titulo: 'El número de páginas',
        texto:
          'No es lo mismo una página única con todo el contenido que un sitio de diez secciones. Cada página nueva es diseño, textos, adaptación al móvil y configuración de SEO propia. Es el factor que más pesa en el precio.',
      },
      {
        titulo: 'Si vendes online o no',
        texto:
          'Una tienda necesita catálogo, carrito, pasarela de pago, gestión de pedidos, cálculo de envíos y avisos por correo. Eso multiplica el trabajo respecto a una web informativa. Es la diferencia entre un sitio web que informa, desde 699€, y uno que cobra, desde 999€.',
      },
      {
        titulo: 'Quién escribe los textos',
        texto:
          'Si tú entregas los textos, ahorras. Si los tengo que redactar yo, hay que investigar tu sector, entrevistar y escribir, y eso son horas. Suele ser dinero bien gastado, porque los textos son lo que vende.',
      },
      {
        titulo: 'Si necesitas gestionar el contenido',
        texto:
          'Un panel para que tú mismo cambies precios, subas productos o publiques en el blog es una funcionalidad completa por detrás. Si no vas a actualizar la web casi nunca, te ahorras ese dinero.',
      },
      {
        titulo: 'A medida frente a plantilla',
        texto:
          'Una plantilla es más barata el primer día. Pero carga código que no usas, va más lenta, Google penaliza la lentitud y tu web se parece a miles. A medida cuesta más al principio y menos a los tres años.',
      },
      {
        titulo: 'Las prisas',
        texto:
          'Desde que tengo tus textos y fotos, una landing está normalmente en una semana y una web completa, en menos de un mes. Si la necesitas antes, hay que reorganizar la agenda y eso tiene un coste. Si puedes esperar, no pagas de más.',
      },
    ],
  },

  precios: {
    titulo: 'Mis precios, sin letra pequeña',
    intro:
      'Lo que te presupuesto es lo que pagas. Todos los precios que ves aquí son sin IVA: al importe hay que sumarle el 21%, y como es un gasto de tu negocio te lo deduces. Si a mitad de proyecto pides algo que no estaba hablado, te digo lo que cuesta antes de tocarlo. Nunca vas a recibir una factura con sorpresas.',
    planes: [
      {
        nombre: 'Landing',
        precio: 'desde 350€',
        para: 'Una sola página para presentarte y que te contacten. Normalmente en una semana desde que tengo tus textos y fotos. Precio cerrado después de hablar contigo y conocer tu negocio.',
      },
      {
        nombre: 'Web de varias páginas',
        precio: 'desde 699€',
        para: 'Para que te encuentren y te contacten, sin tienda. Normalmente en menos de un mes desde que tengo tus textos y fotos. Precio cerrado después de hablar contigo y conocer tu negocio.',
      },
      {
        nombre: 'Tienda online',
        precio: 'desde 999€',
        para: 'Cuando quieres cobrar online; depende del tamaño del catálogo. Normalmente en menos de un mes desde que tengo tus productos y fotos. Precio cerrado después de hablar contigo y conocer tu negocio.',
      },
      {
        nombre: 'Funciones a medida',
        precio: 'desde 1.499€',
        para: 'Reservas, área de clientes o integraciones con tu gestión. El plazo depende del proyecto. Precio cerrado después de hablar contigo y conocer tu negocio.',
      },
    ],
    nota:
      'Aparte solo va el dominio, unos 20€ al año: es tuyo, y cuando toca renovarlo te aviso y hago yo el trámite. El alojamiento no lo pagas tú, va dentro del mantenimiento. Tu web incluye los 3 primeros meses de mantenimiento. Si quieres continuar, desde 30€/mes más IVA y sin permanencia. Todo con factura, deducible como gasto profesional.',
  },

  faqs: [
    {
      pregunta: '¿Por qué hay quien me la hace por 150€?',
      respuesta:
        'Normalmente por una de tres razones: es alguien empezando que necesita portfolio, es una plantilla con el logo cambiado, o hay una cuota mensual detrás que no te han contado. Ninguna es necesariamente mala si sabes lo que compras. El problema llega cuando a los seis meses quieres un cambio y esa persona ya no responde.',
    },
    {
      pregunta: '¿Y por qué una agencia me pide 6.000€ por algo parecido?',
      respuesta:
        'Porque una agencia tiene oficina, comerciales, diseñador, programador y jefe de proyecto, y todo eso está en tu factura. Para proyectos grandes tiene todo el sentido: hay músculo y equipo de reemplazo. Para la web de un negocio pequeño, estás pagando una estructura que no necesitas.',
    },
    {
      pregunta: '¿Qué gastos tiene la web cada año?',
      respuesta:
        'El dominio, unos 20€ al año. Tu web incluye los 3 primeros meses de mantenimiento; si quieres continuar, desde 30€/mes más IVA. El alojamiento va dentro de esa cuota: no tienes que contratar servidor por tu cuenta ni pagarlo aparte. Y del dominio tampoco te tienes que acordar: te aviso yo cuando toca renovar. Eso es todo: no hay licencias ocultas ni sorpresas.',
    },
    {
      pregunta: '¿El precio incluye que salga en Google?',
      respuesta:
        'Incluye dejarla técnicamente preparada: estructura, títulos, descripciones, velocidad, datos estructurados y sitemap. Eso es la base sin la cual no compites. Escalar posiciones en búsquedas competidas es un trabajo continuo de meses, y eso es lo que cubre el mantenimiento con SEO.',
    },
    {
      pregunta: '¿Puedo pagarlo a plazos?',
      respuesta:
        'Sí. En Landing Pages no pido nada por adelantado. En proyectos más grandes pido una señal para reservar fecha y el resto a la entrega, y si necesitas repartirlo en más pagos lo hablamos sin problema.',
    },
    {
      pregunta: '¿Y si dentro de un año quiero cambiar de desarrollador?',
      respuesta:
        'Te llevas el dominio y el código, son tuyos. No trabajo con sistemas cerrados que te obliguen a seguir pagándome para poder usar tu web. Si algún día no te convenzo, te vas sin ataduras.',
    },
  ],

  cierre: {
    tituloFaq: 'Preguntas sobre precios',
    titulo: '¿Quieres un número concreto para tu caso?',
    texto:
      'Cuéntame qué negocio tienes y qué necesitas. Te paso un presupuesto cerrado y sin compromiso, normalmente el mismo día. Si veo que necesitas menos de lo que crees, te lo digo y te ahorras el dinero.',
  },
}

export const CuantoCuestaPaginaWeb = () => <LandingSEO contenido={contenido} />
