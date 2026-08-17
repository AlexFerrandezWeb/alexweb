import { PoliticaPrivacidad } from '../components/PoliticaPrivacidad'
import { construirMeta } from '../utils/construirMeta'

export const meta = () =>
  construirMeta({
    titulo: 'Política de privacidad | alexweb',
    descripcion:
      'Cómo se tratan tus datos personales en alexweb.es conforme al RGPD: qué se recoge, para qué y cómo ejercer tus derechos.',
    ruta: '/politica-privacidad',
  })

export default PoliticaPrivacidad
