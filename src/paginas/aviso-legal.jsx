import { AvisoLegal } from '../components/AvisoLegal'
import { construirMeta } from '../utils/construirMeta'

export const meta = () =>
  construirMeta({
    titulo: 'Aviso legal | alexweb',
    descripcion:
      'Datos identificativos del titular de alexweb.es, condiciones de uso del sitio y régimen de responsabilidad.',
    ruta: '/aviso-legal',
  })

export default AvisoLegal
