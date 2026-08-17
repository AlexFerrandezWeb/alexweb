import { DisenoWebPymes, contenido } from '../components/landings/DisenoWebPymes'
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

export default DisenoWebPymes
