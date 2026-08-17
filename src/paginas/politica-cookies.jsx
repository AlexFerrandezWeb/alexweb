import { PoliticaCookies } from '../components/PoliticaCookies'
import { construirMeta } from '../utils/construirMeta'

export const meta = () =>
  construirMeta({
    titulo: 'Política de cookies | alexweb',
    descripcion:
      'Qué cookies utiliza alexweb.es, para qué sirven y cómo aceptarlas o rechazarlas en cualquier momento.',
    ruta: '/politica-cookies',
  })

export default PoliticaCookies
