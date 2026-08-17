import { Inicio } from '../components/Inicio'
import { construirMeta } from '../utils/construirMeta'

export const meta = () =>
  construirMeta({
    titulo: 'Diseño web para pymes y autónomos desde 350€ | alexweb',
    descripcion:
      'Diseño web para pymes y autónomos de toda España. Páginas web a medida, rápidas y sin plantillas. Landing pages desde 350€ y sitios web desde 699€. Presupuesto gratis.',
    ruta: '/',
  })

export default Inicio
