import { IndiceBlog, CABECERA } from '../components/blog/IndiceBlog'
import { construirJsonLdIndice } from '../components/blog/jsonLd'
import { articulosPorFecha } from '../contenido/blog.mjs'
import { construirMeta } from '../utils/construirMeta'

const DESCRIPCION =
  'Cómo aplicar la IA a tu negocio sin humo: guías prácticas para autónomos y negocios pequeños. Qué herramientas ayudan de verdad, cuáles son dinero tirado y cómo saberlo antes.'

export const meta = () =>
  construirMeta({
    titulo: 'Cómo aplicar la IA a tu negocio | Blog de alexweb',
    descripcion: DESCRIPCION,
    ruta: '/blog',
    jsonLd: construirJsonLdIndice({
      titulo: CABECERA.titulo,
      descripcion: DESCRIPCION,
      articulos: articulosPorFecha(),
    }),
  })

export default IndiceBlog
