import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'

import './index.css'
import './App.css'

import { HeaderNav } from './components/layout/HeaderNav'
import { Footer } from './components/layout/Footer'
import { WhatsAppBtn } from './components/layout/WhatsAppBtn'
import { CookieBanner } from './components/CookieBanner'
import ChatBot from './components/ChatBot'
import { construirMeta } from './utils/construirMeta'

const ID_ANALYTICS = 'G-DEQL33LSGS'

/**
 * Datos de negocio comunes a todas las páginas.
 *
 * Sin `addressLocality` ni `addressRegion` a propósito: el posicionamiento es
 * nacional y no queremos que Google asocie el sitio a una provincia concreta.
 * El domicilio fiscal sigue publicado donde la ley lo exige, en el aviso legal
 * y en la política de privacidad.
 */
const NEGOCIO_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', name: 'alexweb', url: 'https://alexweb.es/' },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://alexweb.es/#negocio',
      name: 'alexweb',
      url: 'https://alexweb.es/',
      image: 'https://alexweb.es/assets/og-image.png',
      description:
        'Diseño y desarrollo de páginas web a medida para pymes y autónomos de toda España. Landing pages, tiendas online, mantenimiento y SEO.',
      telephone: '+34722292050',
      email: 'alejandroferrandezjuarez@gmail.com',
      // Coincide con el rango que se publica en /cuanto-cuesta-una-pagina-web:
      // el dato estructurado y la copia visible tienen que decir lo mismo.
      priceRange: '350€ - 3000€',
      founder: { '@id': 'https://alexweb.es/#alejandro' },
      address: { '@type': 'PostalAddress', addressCountry: 'ES' },
      areaServed: { '@type': 'Country', name: 'España' },
      sameAs: [
        'https://www.linkedin.com/in/alejandro-ferrández-juárez-a457a53b4',
        'https://github.com/AlexFerrandezWeb',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de diseño y desarrollo web',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Landing Page',
            description: 'Página única para mostrar tu negocio y captar clientes.',
            price: '350',
            priceCurrency: 'EUR',
          },
          {
            '@type': 'Offer',
            name: 'Sitio Web',
            // El precio del Offer tiene que ser el de entrada real (el nivel
            // Basico) y la descripcion no puede prometer tienda ni blog, que
            // llegan con E-commerce y A Medida. Si no, Google ve discrepancia
            // entre el dato estructurado y lo que dice la pagina.
            description: 'Web de varias páginas para tener presencia profesional y que te encuentren y contacten.',
            price: '699',
            priceCurrency: 'EUR',
          },
          {
            '@type': 'Offer',
            name: 'Mantenimiento y SEO',
            description: 'Actualizaciones, copias de seguridad y posicionamiento mensual.',
            price: '50',
            priceCurrency: 'EUR',
          },
        ],
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://alexweb.es/#alejandro',
      name: 'Alejandro Ferrández',
      url: 'https://alexweb.es/sobreMi',
      jobTitle: 'Diseñador y desarrollador web freelance',
      worksFor: { '@id': 'https://alexweb.es/#negocio' },
      sameAs: [
        'https://www.linkedin.com/in/alejandro-ferrández-juárez-a457a53b4',
        'https://github.com/AlexFerrandezWeb',
      ],
    },
  ],
}

export const links = () => [
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/manifest.json' },
]

// Se usa solo si una ruta no declara su propio meta. Las 13 rutas lo declaran,
// así que esto es una red de seguridad, no el caso habitual.
export const meta = () =>
  construirMeta({
    titulo: 'Diseño web para pymes y autónomos desde 350€ | alexweb',
    descripcion:
      'Diseño web para pymes y autónomos de toda España. Páginas web a medida, rápidas y sin plantillas. Landing pages desde 350€ y sitios web desde 699€. Presupuesto gratis.',
    ruta: '/',
  })

export function Layout({ children }) {
  return (
    <html lang='es'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
        <Meta />
        <Links />

        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(NEGOCIO_JSON_LD) }}
        />

        {/* Consent Mode v2: analítica denegada hasta que el usuario acepte cookies */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', { 'analytics_storage': 'denied', 'ad_storage': 'denied' });`,
          }}
        />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${ID_ANALYTICS}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `gtag('js', new Date());
gtag('config', '${ID_ANALYTICS}');`,
          }}
        />
      </head>
      <body>
        <div className='layout'>{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return (
    <>
      <HeaderNav />
      <Outlet />
      <Footer />
      <WhatsAppBtn />
      <CookieBanner />
      <ChatBot />
    </>
  )
}

export function ErrorBoundary() {
  return (
    <main style={{ maxWidth: '640px', margin: '0 auto', padding: '6rem 1.5rem' }}>
      <h1>Algo ha fallado</h1>
      <p>
        Ha ocurrido un error inesperado. Puedes volver a la{' '}
        <a href='/'>página de inicio</a> o escribirme y lo miro.
      </p>
    </main>
  )
}
