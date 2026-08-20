import React from 'react'
import { LandingSEO } from './LandingSEO'

export const contenido = {
  ruta: '/cuanto-cuesta-una-pagina-web',

  seo: {
    titulo: '¿Cuánto cuesta una página web en 2026? Precios reales',
    descripcion:
      'Cuánto cuesta una página web de verdad: desde 350€ una landing, 699€ un sitio completo y desde 999€ una tienda online. Qué encarece el precio y qué gastos anuales tiene.',
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
          'Una tienda necesita catálogo, carrito, pasarela de pago, gestión de pedidos, cálculo de envíos y avisos por correo. Eso multiplica el trabajo respecto a una web informativa. Es la diferencia entre los 699€ de un sitio web que informa y los 999€ hacia arriba de uno que cobra.',
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
          'Un plazo normal es de 2 a 6 semanas. Si necesitas la web en una semana, hay que reorganizar la agenda y eso tiene un coste. Si puedes esperar, no pagas de más.',
      },
    ],
  },

  precios: {
    titulo: 'Mis precios, sin letra pequeña',
    intro:
      'Lo que te presupuesto es lo que pagas. Todos los precios que ves aquí son sin IVA: al importe hay que sumarle el 21%, y como es un gasto de tu negocio te lo deduces. Si a mitad de proyecto pides algo que no estaba hablado, te digo lo que cuesta antes de tocarlo. Nunca vas a recibir una factura con sorpresas.',
    planes: [
      {
        nombre: 'Landing Page',
        precio: '350€ - 499€',
        para: 'Una sola página con todo lo tuyo. Para presentarte y que te contacten.',
        incluye: [
          'De 4 a 8 secciones según el plan',
          'Diseño a medida y responsive',
          'Formulario de contacto',
          'SEO básico o avanzado',
          'Textos legales y cookies',
          'Entrega en 2-3 semanas',
        ],
      },
      {
        nombre: 'Sitio Web Básico',
        precio: '699€',
        destacado: true,
        para: 'Varias páginas para que te encuentren y te contacten. Sin tienda. La opción que elige la mayoría.',
        incluye: [
          'Hasta 5 páginas',
          'Diseño responsive',
          'SEO básico incluido',
          'Formulario de contacto',
          'Google Analytics incluido',
          'Entrega en 3-4 semanas',
          'Panel para editarla tú: +290€ opcional',
        ],
      },
      {
        nombre: 'E-commerce / Tienda Online',
        precio: 'desde 999€',
        para: 'Cuando quieres cobrar online. El precio depende del tamaño del catálogo.',
        incluye: [
          'Todo lo del Básico',
          'Carrito y catálogo de productos',
          'Pasarela de pago segura',
          'Reservas y citas online',
          'Panel de gestión de productos y stock incluido',
          'Blog integrado y SEO avanzado',
          'Entrega en 6-8 semanas',
        ],
      },
      {
        nombre: 'Proyecto a Medida',
        precio: 'desde 1.499€',
        para: 'Cuando necesitas funciones propias que ningún nivel cerrado cubre.',
        incluye: [
          'Todo lo anterior',
          'Páginas y funciones sin límite',
          'Panel de administración personalizado',
          'Agenda de varios profesionales con Google Calendar',
          'Sincronización con proveedor o ERP',
          'ChatBot con IA integrado',
          'Área privada de clientes',
          'Entrega según proyecto',
        ],
      },
    ],
    nota:
      'A esto hay que sumarle los gastos que no dependen de mí: el dominio (unos 10-15€ al año) y el alojamiento (desde gratis en proyectos pequeños hasta unos 100-200€ al año si tienes tienda). El mantenimiento es opcional, desde 50€ al mes y sin permanencia, o 70€ si tu web lleva panel de gestión. Todo con factura, deducible como gasto profesional.',
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
        'El dominio, entre 10 y 15€ al año. El alojamiento, que en webs pequeñas puede ser gratuito y en tiendas ronda los 100-200€ anuales. Y opcionalmente el mantenimiento, desde 50€ al mes, o 70€ si tu web lleva panel de gestión. Eso es todo: no hay licencias ocultas ni cuotas por seguir usando tu propia web.',
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
