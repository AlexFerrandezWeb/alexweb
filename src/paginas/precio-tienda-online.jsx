import { PrecioTiendaOnline, contenido } from '../components/landings/PrecioTiendaOnline'
import { construirJsonLd } from '../components/landings/LandingSEO'
import { metaDesdeContenido } from '../utils/construirMeta'

export const meta = () =>
  metaDesdeContenido(
    contenido,
    construirJsonLd({
      ruta: contenido.ruta,
      titulo: contenido.seo.titulo,
      descripcion: contenido.seo.descripcion,
      faqs: contenido.faqs,
    })
  )

export default PrecioTiendaOnline
