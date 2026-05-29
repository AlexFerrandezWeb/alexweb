# /alexweb_

Sitio web personal de **Alejandro Ferrández** — desarrollador web freelance especializado en pequeños autónomos y negocios locales. Desarrollado desde cero con React, sin plantillas.

---

## Páginas

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Inicio.js` | Landing principal: hero, servicios, planes de precios, galería de proyectos y formulario de contacto |
| `/servicios` | `Servicios.js` | Detalle de servicios ofrecidos |
| `/sobreMi` | `SobreMi.js` | Presentación del desarrollador |
| `/contacto` | `Contacto.js` | Formulario de contacto independiente |
| `/politica-cookies` | `PoliticaCookies.js` | Política de cookies (RGPD) |
| `/politica-privacidad` | `PoliticaPrivacidad.js` | Política de privacidad (RGPD) |
| `/aviso-legal` | `AvisoLegal.js` | Aviso legal (LSSI-CE) |

---

## Arquitectura

```
alexweb/
├── public/
│   ├── index.html          # Incluye Google tag (gtag.js) con Consent Mode v2
│   ├── favicon.svg
│   └── assets/             # Imágenes de proyectos (capturas escritorio/tablet/móvil)
│
├── src/
│   ├── index.js            # Punto de entrada React
│   ├── App.js              # Componente raíz
│   │
│   ├── router/
│   │   └── MisRutas.js     # BrowserRouter + todas las rutas + ScrollToTop
│   │
│   ├── components/
│   │   ├── Inicio.js / .css          # Página de inicio (landing completa)
│   │   ├── Servicios.js / .css       # Página de servicios
│   │   ├── SobreMi.js / .css         # Página sobre mí
│   │   ├── Contacto.js / .css        # Página de contacto
│   │   ├── FAQ.js / .css             # Componente FAQ (acordeón)
│   │   ├── ChatBot.jsx / .css        # Chatbot con IA (Anthropic)
│   │   ├── CookieBanner.js / .css    # Banner de cookies con Consent Mode v2
│   │   ├── PoliticaCookies.js        # Página política de cookies
│   │   ├── PoliticaPrivacidad.js     # Página política de privacidad
│   │   ├── AvisoLegal.js             # Página aviso legal
│   │   ├── LegalPage.css             # Estilos compartidos de páginas legales
│   │   │
│   │   └── layout/
│   │       ├── HeaderNav.js / .css   # Navegación fija con scroll-hide
│   │       ├── Footer.js / .css      # Footer con redes sociales y links legales
│   │       └── FloatingContactBtn.js / .css  # Botón flotante de contacto
│   │
│   └── utils/
│       └── enviarFormularioContacto.js  # Lógica de envío con EmailJS
│
├── server.js               # Servidor proxy Express para la API de Anthropic (chatbot)
├── .env.example            # Variables de entorno necesarias (sin valores reales)
└── package.json
```

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | React 19 + react-router-dom v7 |
| Estilos | CSS vanilla (sin frameworks), diseño mobile-first |
| Formulario de contacto | EmailJS (`@emailjs/browser`) |
| Chatbot IA | API de Anthropic (Claude) vía servidor proxy Express |
| Analítica | Google Analytics 4 (GA4) con Consent Mode v2 |
| Servidor proxy | Express 5 + cors |

---

## Funcionalidades destacadas

- **Slider de proyectos** — galería con capturas en escritorio, tablet y móvil con navegación por flechas
- **Formulario de contacto** con validación, autoreply al cliente y aviso al desarrollador (EmailJS)
- **Chatbot con IA** — asistente integrado que responde sobre los servicios, conectado a la API de Anthropic mediante un proxy Express (evita exponer la clave en el cliente)
- **Banner de cookies RGPD** — Consent Mode v2 de Google: `analytics_storage` denegado por defecto, se activa solo al aceptar
- **Páginas legales completas** — Aviso Legal (LSSI), Política de Privacidad (RGPD) y Política de Cookies
- **Animaciones de entrada** — secciones que aparecen con `IntersectionObserver` al hacer scroll
- **Header con scroll-hide** — la navegación se oculta al bajar y reaparece al subir

---

## Puesta en marcha local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
# Rellenar .env con tus claves reales
```

### 3. Iniciar el frontend

```bash
npm start
# http://localhost:3000
```

### 4. Iniciar el servidor proxy del chatbot (opcional)

```bash
node server.js
# http://localhost:3001
```

> El chatbot solo funciona si el servidor proxy está corriendo. El frontend sigue funcionando sin él.

---

## Variables de entorno

| Variable | Descripción |
|---|---|
| `ANTHROPIC_API_KEY` | Clave de API de Anthropic para el chatbot |
| `REACT_APP_EMAILJS_SERVICE_ID` | ID del servicio EmailJS |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | ID de la plantilla de aviso a Alex |
| `REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID` | ID de la plantilla de autoreply al cliente |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | Clave pública de EmailJS |

---

## Google Analytics

GA4 está configurado con **Consent Mode v2**. El script se carga siempre (para que Google lo detecte) pero con `analytics_storage: denied` por defecto. Solo pasa a `granted` si el usuario acepta todas las cookies en el banner.

ID de medición: `G-DEQL33LSGS`

---

## Notas legales

Titular: **Alejandro Ferrández** · DNI 48735060S · Murcia, España

Las páginas legales cubren los requisitos de la **LSSI-CE** (Aviso Legal), el **RGPD** (Política de Privacidad) y la **LSSI** en materia de cookies (Política de Cookies).
