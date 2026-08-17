import React from 'react'
import { LandingSEO } from './LandingSEO'

export const contenido = {
  ruta: '/precio-tienda-online',

  seo: {
    titulo: 'Precio de una tienda online: cuánto cuesta montarla en 2026',
    descripcion:
      'Cuánto cuesta una tienda online a medida: desde 999€ con carrito y pasarela de pago. Comisiones reales, gastos anuales y qué encarece el proyecto. Presupuesto sin compromiso.',
  },

  hero: {
    badge: 'Tiendas online · Toda España',
    h1: 'Cuánto cuesta montar una tienda online',
    subtitulo:
      'Desde 999€ una tienda funcional con carrito y pago seguro. Aquí tienes el desglose completo, incluidas las comisiones y los gastos anuales que casi nadie te cuenta antes de firmar.',
    mensajeWhatsApp:
      'Hola Alex, quiero montar una tienda online. ¿Cuánto me costaría?',
  },

  intro: [
    'Al montar una tienda online hay dos costes: lo que pagas una vez por construirla, y lo que vas a pagar cada mes y cada año mientras la tengas abierta. La mayoría de presupuestos solo te enseñan el primero, y por eso mucha gente se lleva un susto al segundo año.',
    'Aquí tienes los dos. Y una idea que te puede ahorrar bastante dinero: no necesitas la tienda perfecta el primer día. Necesitas una tienda que funcione, que cobre bien y que puedas ampliar. Es mucho mejor empezar con 30 productos bien puestos y crecer que gastarte 4.000€ en un catálogo enorme que todavía no sabes si se va a vender.',
    'Ya he montado tiendas para clientes reales en sectores muy distintos: suplementos para ganado, cosmética profesional, hostelería. Los enlaces están en la página de inicio y puedes entrar a verlas y probarlas.',
  ],

  bloques: {
    titulo: 'De qué depende el precio de una tienda',
    items: [
      {
        titulo: 'Cuántos productos vendes',
        texto:
          'No es lo mismo un catálogo de 20 referencias que uno de 500 con tallas, colores y variantes. Cada variante multiplica la gestión de stock y la complejidad del catálogo. Es lo que más mueve el presupuesto.',
      },
      {
        titulo: 'Cómo cobras',
        texto:
          'Tarjeta, Bizum, PayPal, transferencia, contrarreembolso. Cada método es una integración y una configuración. Trabajo sobre todo con Stripe y PayPal, que cubren tarjeta y Bizum sin complicaciones.',
      },
      {
        titulo: 'Cómo envías',
        texto:
          'Tarifa plana es sencillo. Calcular el precio por peso, por provincia o conectar con la API de una agencia de transporte para generar etiquetas automáticas ya es trabajo aparte.',
      },
      {
        titulo: 'Quién gestiona el catálogo',
        texto:
          'Si quieres subir productos, cambiar precios y ver pedidos tú mismo, necesitas un panel de administración. Es la funcionalidad que más se agradece a los seis meses y la que más gente se salta al principio para ahorrar.',
      },
      {
        titulo: 'Las fotos de producto',
        texto:
          'En una tienda las fotos son el escaparate y venden más que cualquier texto. Si no las tienes, hay que hacerlas o conseguirlas, y optimizarlas para que la web no vaya lenta. Cuéntalo en tu presupuesto.',
      },
      {
        titulo: 'La parte legal',
        texto:
          'Una tienda necesita más que una web normal: condiciones de venta, política de devoluciones, derecho de desistimiento e información precontractual. Va incluido, pero es trabajo real y obligatorio por ley.',
      },
    ],
  },

  precios: {
    titulo: 'Precios de tienda online',
    intro:
      'Presupuesto cerrado antes de empezar. Me dices qué productos tienes y cómo quieres cobrar, y te paso un precio fijo para tu caso — lo que acordemos es lo que pagas, sin añadidos sorpresa.',
    planes: [
      {
        nombre: 'Tienda Online',
        precio: 'desde 999€',
        para: 'Para empezar a vender online con una tienda bien montada.',
        incluye: [
          'Catálogo de productos',
          'Carrito de compras',
          'Pasarela de pago segura',
          'Panel de gestión de productos',
          'Blog integrado',
          'SEO avanzado',
          'Textos legales de comercio electrónico',
          'Entrega en 6-8 semanas',
        ],
      },
      {
        nombre: 'Tienda a Medida',
        precio: 'desde 1.499€',
        destacado: true,
        para: 'Catálogo grande o integraciones con tu gestión, transportistas o proveedores.',
        incluye: [
          'Todo lo anterior',
          'Catálogo sin límite de productos',
          'Integraciones a medida por API',
          'ChatBot con IA integrado',
          'Panel de administración personalizado',
          'Soporte prioritario el primer mes',
          'Entrega según proyecto',
        ],
      },
    ],
    alMargen: {
      texto:
        '¿Solo quieres presencia sin vender online? Entonces no necesitas una tienda — mira el',
      enlaceTexto: 'Sitio Web Básico desde 699€',
      enlaceA: '/servicios',
    },
    nota:
      'Aparte van las comisiones de la pasarela de pago, que cobra el banco y no yo: Stripe está en torno al 1,5% + 0,25€ por operación con tarjetas europeas, y PayPal algo más. También el dominio (10-15€ al año) y el alojamiento, que en una tienda suele ir de 100 a 200€ anuales. Consulta las tarifas vigentes de cada pasarela antes de decidir, porque cambian.',
  },

  faqs: [
    {
      pregunta: '¿No me sale más barato con Shopify o WooCommerce?',
      respuesta:
        'Al principio sí, y si vendes poco puede ser tu mejor opción. Shopify tiene cuota mensual que crece con las funciones que necesites, y WooCommerce es gratis pero acabas pagando plugins de pago y un alojamiento potente porque va pesado. Una tienda a medida cuesta más el primer día y no tiene cuota de plataforma. Si vendes poco, plataforma; si vendes de forma constante, a medida sale rentable.',
    },
    {
      pregunta: '¿Qué comisión te llevas de mis ventas?',
      respuesta:
        'Ninguna. Yo cobro por construir la tienda, no por lo que vendas. Las únicas comisiones que vas a pagar son las de la pasarela de pago, que van directas al proveedor. Lo que vendas es tuyo.',
    },
    {
      pregunta: '¿Puedo subir y cambiar productos yo mismo?',
      respuesta:
        'Sí. Todas mis tiendas incluyen un panel desde el que subes, editas y quitas productos tú mismo, sin tocar código ni depender de mí. Te enseño cómo va en una videollamada corta cuando la entrego.',
    },
    {
      pregunta: '¿Cuánto tarda en estar vendiendo?',
      respuesta:
        'Entre 4 y 8 semanas según el plan, contando desde que tengo tus productos y tus fotos. El retraso más habitual no es técnico: es esperar a que el cliente termine de mandar el material. Si lo tienes listo, vamos rápido.',
    },
    {
      pregunta: '¿Se puede ampliar más adelante?',
      respuesta:
        'Sí, y es lo que recomiendo. Empieza con lo que necesitas ahora y añade funciones cuando el negocio las pida. Como el código es tuyo y a medida, ampliar no obliga a rehacer nada desde cero.',
    },
    {
      pregunta: '¿Te encargas de la parte legal de vender online?',
      respuesta:
        'Dejo montados los textos de condiciones de venta, devoluciones, privacidad y cookies conforme a la normativa española y el RGPD. No soy abogado: si vendes en un sector regulado, como alimentación, sanidad o cosmética, revísalo con uno.',
    },
  ],

  cierre: {
    tituloFaq: 'Preguntas sobre tiendas online',
    titulo: '¿Qué quieres vender?',
    texto:
      'Dime qué productos tienes, más o menos cuántos y cómo quieres cobrar. Te paso un presupuesto cerrado sin compromiso. Si veo que te conviene más una plataforma tipo Shopify que una tienda a medida, te lo diré.',
  },
}

export const PrecioTiendaOnline = () => <LandingSEO contenido={contenido} />
