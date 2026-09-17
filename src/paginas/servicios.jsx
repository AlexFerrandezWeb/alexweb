import { Servicios } from '../components/Servicios'
import { construirMeta } from '../utils/construirMeta'

export const meta = () =>
  construirMeta({
    titulo: 'Servicios y precios de diseño web | alexweb',
    descripcion:
      'Landing pages desde 350€, sitios web desde 699€ y tiendas online desde 999€, con los 3 primeros meses de mantenimiento incluidos. Sin permanencia y con factura.',
    ruta: '/servicios',
  })

export default Servicios
