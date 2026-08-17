import { Servicios } from '../components/Servicios'
import { construirMeta } from '../utils/construirMeta'

export const meta = () =>
  construirMeta({
    titulo: 'Servicios y precios de diseño web | alexweb',
    descripcion:
      'Landing pages desde 350€, sitios web desde 699€, tiendas online desde 999€ y mantenimiento desde 50€/mes. Sin permanencia y con factura.',
    ruta: '/servicios',
  })

export default Servicios
