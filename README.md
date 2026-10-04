# Portafolio — Alan Gutierrez

Portafolio personal de una página (SPA) construido con React y Vite. Presenta el perfil,
los proyectos destacados, el stack de herramientas, la formación, las habilidades blandas
y una forma de contacto directa. Incluye además un chatbot que responde con un modelo de
lenguaje ejecutado en local.

## Stack

- **React 19** + **Vite 8**
- **CSS propio** con variables de tema claro/oscuro, `clamp()` y breakpoints mobile-first
- **oxlint** para el linting
- Sin router: es una página única con anclas (`#inicio`, `#proyectos`, `#contacto`, …)

## Estructura

```
src/
├── components/   # Componentes de UI (uno por sección)
├── data/         # Contenido desacoplado (proyectos, tecnologías, formación)
├── hooks/        # useTheme
├── services/     # Cliente HTTP del bot (SSE) + normalización de config
├── styles/       # Un CSS por componente + theme.css / effects.css
└── assets/       # Imágenes y logos
```

## Puesta en marcha

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción en dist/
npm run preview  # previsualiza el build
npm run lint     # linting
```

## Secciones

| Sección | Ancla | Contenido |
|---|---|---|
| Sobre mí | `#inicio` | Foto, título, pitch y descarga del CV |
| Proyectos | `#proyectos` | Proyectos destacados |
| Herramientas | `#tecnologias` | Stack y logos |
| Educación | `#educacion` | Formación académica |
| Habilidades | `#habilidades-blandas` | Habilidades blandas |
| Contacto | `#contacto` | Correo (copiar) y redes |

## Bot local del portafolio

El chat flotante (`src/components/PortfolioBot.jsx`) se conecta a una API compatible con
OpenAI servida en local (por ejemplo `llama-server` de llama.cpp). El cliente vive en
`src/services/llmClient.js` y usa **streaming SSE** con cancelación mediante
`AbortController`.

1. Inicia tu servidor local en `127.0.0.1:8080` y comprueba que expone `/v1`.
2. Copia la configuración de ejemplo:

   ```bash
   cp .env.example .env.local
   ```

3. Ajusta `VITE_LLM_PROXY_TARGET`, `VITE_LLM_MODEL` y, si hace falta, `VITE_LLM_PROXY_KEY`.
4. Arranca el portafolio con `npm run dev`.

> El proxy de Vite expone `/v1` en el navegador y añade la clave en el servidor.
> Nunca pongas una clave privada directamente en el componente: no debe llegar al bundle.

Variables disponibles:

| Variable | Descripción |
|---|---|
| `VITE_LLM_PROXY_TARGET` | Dirección del servidor local del modelo (sin `/v1`) |
| `VITE_LLM_PROXY_KEY` | Bearer token opcional; se inyecta solo en el proxy |
| `VITE_LLM_MODEL` | Nombre del modelo servido |

## Accesibilidad y responsive

- Landmarks `<header>` y `<main>`, skip link al contenido y foco visible.
- CSS mobile-first (`min-width`) con layouts de 1, 2 y 3 columnas según el ancho.
- Tema claro/oscuro con `data-theme` y respeto por `prefers-reduced-motion`.
- Enlaces externos con `rel="noopener noreferrer"` y aviso de nueva pestaña.

## Enlaces

- GitHub: https://github.com/AlanG-z
- LinkedIn: https://www.linkedin.com/in/alan-gutierrez-dev