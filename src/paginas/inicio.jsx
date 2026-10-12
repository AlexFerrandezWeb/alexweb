import { Inicio } from '../components/Inicio'
import { construirMeta } from '../utils/construirMeta'

export const meta = () =>
  construirMeta({
    titulo: 'Diseño web para pymes y autónomos desde 350€ | alexweb',
    descripcion:
      'Diseño web para pymes y autónomos de toda España. Webs para negocios con mantenimiento y asesoría mes a mes. Landing pages desde 350€ y sitios web desde 699€.',
    ruta: '/',
  })

export default Inicio
