import { Servicios } from '../components/Servicios'
import { construirMeta } from '../utils/construirMeta'

export const meta = () =>
  construirMeta({
    titulo: 'Servicios y precios de diseño web | alexweb',
    descripcion:
      'Tu web desde 350€ más IVA, con los 3 primeros meses de mantenimiento incluidos. Después, desde 30€/mes. Sin permanencia y con factura.',
    ruta: '/servicios',
  })

export default Servicios
