import { Contacto } from '../components/Contacto'
import { construirMeta } from '../utils/construirMeta'

export const meta = () =>
  construirMeta({
    titulo: 'Contacto — pide presupuesto sin compromiso | alexweb',
    descripcion:
      'Cuéntame tu proyecto y te preparo un presupuesto cerrado sin compromiso. Respuesta en menos de 24 horas por email o WhatsApp.',
    ruta: '/contacto',
  })

export default Contacto
