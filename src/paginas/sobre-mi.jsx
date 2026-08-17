import { SobreMi } from '../components/SobreMi'
import { construirMeta } from '../utils/construirMeta'

export const meta = () =>
  construirMeta({
    titulo: 'Sobre mí — Alejandro Ferrández, desarrollador web freelance',
    descripcion:
      'Desarrollador web freelance especializado en pymes y autónomos. Trato directo, sin intermediarios ni comerciales: hablas con quien programa tu web.',
    ruta: '/sobreMi',
  })

export default SobreMi
