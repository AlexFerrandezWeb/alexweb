import {
  LandingNutricionistas,
  SEO,
  RUTA,
  jsonLdNutricionistas,
} from '../components/landings/LandingNutricionistas'
import { construirMeta } from '../utils/construirMeta'

export const meta = () =>
  construirMeta({
    titulo: SEO.titulo,
    descripcion: SEO.descripcion,
    ruta: RUTA,
    jsonLd: jsonLdNutricionistas,
  })

export default LandingNutricionistas
