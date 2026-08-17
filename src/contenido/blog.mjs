/**
 * Los artículos del blog, como datos.
 *
 * Mismo criterio que las landings: el texto vive en un objeto y el componente
 * solo lo pinta. Así se escribe un artículo sin tocar JSX y no hay forma de
 * romper la maquetación escribiendo.
 *
 * Es .mjs porque rutas-sitio.mjs lo importa para generar el prerender y el
 * sitemap, y eso lo ejecuta Node "pelado" en el postbuild.
 *
 * Para publicar un artículo: se añade aquí y ya aparece en /blog, se
 * prerenderiza y entra en el sitemap. No hay que tocar nada más.
 *
 * Campos de cada artículo:
 *   slug         Última parte de la URL: /blog/<slug>.
 *   titulo       El h1. Puede ser más largo y humano que el título SEO.
 *   seo          titulo (<=60 car. aprox) y descripcion (<=175, lo valida el test).
 *   resumen      Entradilla. Sale en el índice y bajo el h1.
 *   publicado /
 *   actualizado  ISO corto. `actualizado` solo si se revisa de verdad.
 *   minutos      Tiempo de lectura estimado.
 *   etiqueta     Categoría corta que se muestra en la tarjeta del índice.
 *   secciones    [{ titulo, parrafos: [], lista?: [], video?: {} }]
 *   cierre       Llamada a la acción del final.
 */

/**
 * Vídeos.
 *
 * `tipo: 'youtube'`   -> se incrusta con fachada: se pinta la miniatura y el
 *                        iframe no se carga hasta que el visitante hace clic.
 *                        Evita ~1 MB de JS de Google en cada visita y, sobre
 *                        todo, evita plantar cookies antes del consentimiento.
 *                        `id` es el identificador del vídeo.
 * `tipo: 'instagram'` -> NO se incrusta. El embed de Instagram exige el JS de
 *                        Meta y se rompe si el reel se borra o la cuenta pasa a
 *                        privada. Se pinta una tarjeta que abre el reel allí,
 *                        que además manda tráfico al perfil.
 *                        `url` es el enlace al reel.
 *
 * En ambos casos `titulo` es obligatorio: es lo que lee quien navega con
 * lector de pantalla y lo que se ve si la miniatura no carga.
 */

export const ARTICULOS = [
  {
    slug: 'chatbot-en-la-web-de-tu-negocio',
    etiqueta: 'IA aplicada',

    titulo: 'Cómo poner un chatbot en la web de tu negocio (y si te merece la pena)',

    seo: {
      titulo: 'Chatbot para la web de tu negocio: cuándo merece la pena',
      descripcion:
        'Qué hace de verdad un chatbot en la web de un negocio pequeño, cuándo ayuda, cuándo molesta y cuánto cuesta ponerlo. Explicado sin tecnicismos y con ejemplos reales.',
    },

    resumen:
      'Todo el mundo te dice que pongas un chatbot con IA. Casi nadie te dice cuándo es dinero tirado. Te cuento lo que he visto montando webs para negocios pequeños.',

    publicado: '2026-08-16',
    minutos: 6,

    secciones: [
      {
        titulo: 'Qué hace un chatbot en realidad',
        parrafos: [
          'Un chatbot es esa ventanita que se abre abajo a la derecha y te pregunta si necesitas ayuda. Hasta hace poco eran bastante tontos: respondían cuatro cosas preparadas y, si preguntabas otra, te pedían el correo. Los de ahora, con IA detrás, sí entienden lo que les escribes y responden con tus propias palabras si les explicas antes cómo funciona tu negocio.',
          'La parte importante, y la que casi nadie cuenta: un chatbot no vende. Un chatbot quita fricción. La diferencia es enorme. No va a convencer a nadie que no estuviera ya medio interesado, pero sí evita que alguien con una duda tonta se vaya de tu web sin preguntar nada.',
        ],
      },
      {
        titulo: 'Cuándo merece la pena',
        parrafos: [
          'Por mi experiencia, un chatbot rinde cuando se cumple al menos una de estas tres cosas:',
        ],
        lista: [
          'Te llegan siempre las mismas cinco preguntas. Horarios, precios, si te desplazas, si haces presupuesto sin compromiso. Si contestas eso quince veces por semana, el bot te devuelve horas de verdad.',
          'Te escriben fuera de horario. Mucha gente mira webs a las once de la noche. Si a esa hora no hay nadie, el bot al menos recoge la duda y el contacto en vez de perderlos.',
          'Tu servicio necesita explicación antes de pedir precio. Si la gente no sabe si encaja contigo, el bot le ayuda a decidirse sin tener que llamar, que da mucha más pereza de lo que parece.',
        ],
      },
      {
        titulo: 'Cuándo es dinero tirado',
        parrafos: [
          'Y ahora la parte que no te va a contar quien te lo quiere vender. Si tu web recibe veinte visitas al mes, el chatbot no es tu problema: tu problema es que no llega nadie. Ponerlo es como contratar a un camarero para un local vacío. Primero se arregla el tráfico, después la atención.',
          'Tampoco merece la pena si tu negocio se cierra por teléfono en dos minutos. Hay servicios donde el cliente ya sabe lo que quiere y solo necesita el número. Meterle un bot delante es un obstáculo, no una ayuda.',
          'Y un aviso importante: si conectas un chatbot con IA y no le explicas bien lo que haces, se inventará cosas. Se lo inventa con seguridad y buena redacción, que es lo peligroso. He visto bots prometiendo plazos y descuentos que el dueño no daba. Eso no es un fallo técnico, es un cliente enfadado.',
        ],
      },
      {
        titulo: 'Qué cuesta y qué hace falta',
        parrafos: [
          'Hay dos caminos. El de contratar un servicio ya montado (tipo Tidio, Crisp o similares): se instala rápido, se paga todos los meses y el precio sube según las conversaciones. Y el de montarlo dentro de tu propia web, que cuesta más al principio y luego no tiene cuota fija más allá de lo que gaste la IA.',
          'Para un negocio pequeño lo que más pesa no es el precio, es el mantenimiento. Un chatbot hay que revisarlo: leer lo que le preguntan, ver dónde se atasca y corregirlo. Un bot abandonado seis meses acaba dando información caducada, y eso hace más daño que no tenerlo.',
          'Si te lo montas, dedica la primera semana a leer conversaciones. Ahí es donde descubres las preguntas reales de tus clientes, que casi nunca son las que tú imaginabas. Solo por eso ya merece la pena, aunque luego lo quites.',
        ],
      },
      {
        titulo: 'Lo legal, que aquí también cuenta',
        parrafos: [
          'Si el chatbot recoge un nombre, un teléfono o un correo, estás tratando datos personales y aplica el RGPD. En la práctica: hay que avisar de que se están guardando, enlazar tu política de privacidad desde la propia ventana del chat y no dejar esas conversaciones tiradas en un servicio del que no sabes nada.',
          'No es burocracia por gusto. Es la diferencia entre una herramienta que te ayuda y un problema que te puede salir muy caro.',
        ],
      },
    ],

    cierre: {
      titulo: '¿Te encaja o no?',
      texto:
        'Si te reconoces en las tres señales de arriba, un chatbot te va a quitar trabajo. Si no, casi seguro que hay algo más urgente que arreglar antes en tu web. Cuéntame tu caso y te digo con sinceridad cuál de las dos es.',
      mensajeWhatsApp:
        'Hola Alex, he leído el artículo del chatbot y quiero saber si me encaja en mi negocio.',
    },
  },

  {
    slug: 'combinar-ia-con-redes-sociales',
    etiqueta: 'IA aplicada',

    titulo: '¿Puedo combinar la IA con mis redes sociales?',

    seo: {
      titulo: 'IA y redes sociales: cómo combinarlas en tu negocio',
      descripcion:
        'Cómo usar la IA en las redes de tu negocio sin que suene a robot: qué tareas conviene delegarle, cuáles no y un método sencillo para publicar más sin vivir pegado al móvil.',
    },

    resumen:
      'Sí, y probablemente es el sitio donde antes vas a notar el cambio. Pero hay una forma de hacerlo que ahorra horas y otra que te deja un perfil que no se cree nadie.',

    publicado: '2026-08-16',
    minutos: 6,

    secciones: [
      {
        titulo: 'La respuesta corta: sí, pero no para publicar por ti',
        parrafos: [
          'Cuando alguien pregunta si puede juntar la IA con sus redes, casi siempre está pensando en lo mismo: en dejar de tener que publicar. Y esa es justo la parte que peor sale.',
          'Donde la IA se luce de verdad no es publicando, es en todo lo que hay alrededor: pensar de qué hablar, ordenar una idea que tienes en la cabeza, convertir una cosa que ya has escrito en cuatro formatos distintos, o contestar mensajes repetidos. El trabajo aburrido, vamos. La cara que pones ante tu cliente sigue siendo tuya.',
          'Piénsalo como tener a alguien que te prepara el material y te lo deja ordenado encima de la mesa. Quien decide qué se publica y con qué tono sigues siendo tú, y eso no es una limitación: es exactamente lo que hace que tu perfil no parezca el de otros mil.',
        ],
      },
      {
        titulo: 'Lo que sí funciona',
        parrafos: [
          'Estas son las tareas donde, por lo que he visto en negocios pequeños, se nota el cambio desde la primera semana:',
        ],
        lista: [
          'Quitarte el bloqueo de la página en blanco. Le cuentas qué haces y qué te preguntan tus clientes, y te saca veinte ideas de publicación. No las usarás todas, pero se acabó el "hoy no sé qué poner".',
          'Estirar un contenido en varios. Un texto que ya has escrito se convierte en guion de reel, en pie de foto y en historia. Es el mayor ahorro de tiempo con diferencia: una idea, cuatro publicaciones.',
          'Ordenarte lo que ya sabes. Tú le cuentas de viva voz cómo le explicas algo a un cliente, y te lo devuelve estructurado. El fondo es tuyo, la IA solo lo peina.',
          'Contestar lo repetido. Precios, horarios, si haces envíos. Redactas las respuestas una vez y las tienes listas para copiar y pegar cuando toque.',
          'Traducir y adaptar. Si tienes clientes fuera o quieres probar en otro idioma, deja de ser un proyecto y pasa a ser cosa de un rato.',
        ],
      },
      {
        titulo: 'Lo que se nota a la legua',
        parrafos: [
          'Y ahora la otra cara, porque el contenido hecho con IA sin cuidado se reconoce enseguida y hace daño a la marca.',
          'Lo primero que canta es el tono. Hay palabras y giros que la IA repite sin parar y que ningún autónomo usa hablando de su negocio. Si tus publicaciones de repente suenan a folleto corporativo, tus seguidores lo van a notar aunque no sepan explicar por qué.',
          'Lo segundo es publicar sin leer. Programar contenido automático y no revisarlo acaba, antes o después, en una publicación con un dato inventado o un precio que no es el tuyo. Y en redes eso no se corrige: se comenta.',
          'Lo tercero son los comentarios automáticos. Responder a tus seguidores con mensajes generados y sin leerlos es la forma más rápida de que la gente deje de escribirte. La conversación es lo único que las redes te dan gratis; automatizarla es tirarlo.',
          'Mi regla es simple: la IA puede tocar el borrador, nunca el botón de publicar.',
        ],
      },
      {
        titulo: 'Un método que puedes probar esta semana',
        parrafos: [
          'Si quieres algo concreto con lo que empezar, esto funciona y no lleva más de una hora a la semana:',
        ],
        lista: [
          'Elige un solo tema de la semana. Algo que te hayan preguntado clientes de verdad, que esos son los que interesan.',
          'Cuéntaselo hablando, sin cuidar la forma, como si se lo explicaras a un cliente en el mostrador. Puedes dictarlo con el micro del móvil.',
          'Pídele que te lo ordene en tres formatos: un texto para publicación, un guion corto para vídeo y una pregunta para historia.',
          'Reescribe tú las primeras líneas de cada uno. Son las que se leen y las que marcan si suena a ti o a máquina.',
          'Publica repartido en la semana y apunta cuál funcionó mejor. Ese es el que le pasas de ejemplo la semana siguiente para que copie tu tono.',
        ],
      },
      {
        titulo: 'Una cosa que conviene saber: hay que avisar',
        parrafos: [
          'Si publicas imágenes o vídeos generados con IA, las propias redes están etiquetándolos como tal, y algunas lo detectan solas. Ocultarlo no sale a cuenta: si te lo marcan ellas, queda peor que si lo dices tú.',
          'Con el texto nadie te pide que declares nada. Pero ojo con un caso concreto: si enseñas resultados, testimonios o fotos de trabajos que no son reales y los presentas como si lo fueran, eso ya no es usar IA, es publicidad engañosa, y ahí sí hay responsabilidad legal de por medio.',
          'Dicho de otra forma: usa la IA para contar mejor lo que haces, nunca para aparentar lo que no haces.',
        ],
      },
    ],

    cierre: {
      titulo: '¿Por dónde empezarías tú?',
      texto:
        'Si tienes redes pero las tienes paradas porque no te da la vida, esto se arregla en una tarde de organización. Cuéntame qué publicas ahora y te digo qué parte puedes delegarle a la IA sin que se note.',
      mensajeWhatsApp:
        'Hola Alex, he leído el artículo de IA y redes sociales y quiero organizar las de mi negocio.',
    },
  },
]

/** Los artículos, del más reciente al más antiguo. */
export const articulosPorFecha = () =>
  [...ARTICULOS].sort((a, b) => b.publicado.localeCompare(a.publicado))

export const buscarArticulo = (slug) => ARTICULOS.find((a) => a.slug === slug)

export const rutaArticulo = (slug) => `/blog/${slug}`
