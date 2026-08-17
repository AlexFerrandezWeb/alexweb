import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [reactRouter()],
  // Conservamos el prefijo REACT_APP_ que venía de Create React App: así el .env
  // local y las variables ya configuradas en Cloudflare Pages siguen valiendo
  // sin renombrar nada. En el código se leen con import.meta.env, no process.env,
  // que en Vite no existe en el navegador.
  envPrefix: ['VITE_', 'REACT_APP_'],
  resolve: {
    // Los imports sin extension ("../components/Inicio") los resuelve Vite
    // probando extensiones en orden. Por defecto .js va antes que .jsx, asi que
    // un .js olvidado de la migracion se cargaba en lugar del .jsx y reventaba
    // el arranque (Vite no parsea JSX dentro de .js). Ponemos .jsx primero.
    extensions: ['.mjs', '.jsx', '.js', '.mts', '.tsx', '.ts', '.json'],
  },
  build: {
    // Cloudflare Pages sirve estáticos; no necesitamos sourcemaps en producción.
    sourcemap: false,
  },
})
