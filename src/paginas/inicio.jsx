import { Inicio } from '../components/Inicio'
import { construirMeta } from '../utils/construirMeta'

export const meta = () =>
  construirMeta({
    titulo: 'Diseño web para pymes y autónomos desde 350€ | alexweb',
    descripcion:
      'Diseño web para pymes y autónomos de toda España. Webs para negocios con mantenimiento y asesoría mes a mes. Webs desde 350€ y mantenimiento desde 30€/mes.',
    ruta: '/',
  })

export default Inicio
