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
system_prompt.txt  # Instrucciones del modelo (editable)
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
`AbortController`. Al iniciar comprueba `/v1/models`, muestra el estado de conexión y reintenta
automáticamente si el servidor aún no está disponible. Cuando detecta una pregunta sobre una
sección, desplaza la página hasta ella y la resalta. Las instrucciones del modelo viven en
`system_prompt.txt`; el contexto y los títulos de sección se inyectan automáticamente.

1. Para iniciar el bot y el portafolio juntos:

   ```bash
   npm run bot
   ```

   El comando usa `/home/alan/llama-cpu-server.sh` y verifica
   `/home/alan/sistema-prompt-cpu.txt`. Si tus rutas son distintas, define
   `LLAMA_SERVER_SCRIPT` y `SYSTEM_PROMPT_FILE`.

   También puedes iniciar todo por separado:

   ```bash
   bash /home/alan/llama-cpu-server.sh
   npm run dev
   ```

2. Copia la configuración de ejemplo:

   ```bash
   cp .env.example .env.local
   ```

3. Ajusta `VITE_LLM_PROXY_TARGET`, `VITE_LLM_MODEL` y, si hace falta, `VITE_LLM_PROXY_KEY`.
4. Si usaste `npm run bot`, no necesitas abrir otra terminal para `npm run dev`.
5. El prompt base se toma de `SYSTEM_PROMPT_FILE` (por defecto
   `/home/alan/sistema-prompt-cpu.txt`) y el contexto del portafolio se inyecta automáticamente.

> El proxy de Vite expone `/v1` en el navegador y añade la clave en el servidor.
> Nunca pongas una clave privada directamente en el componente: no debe llegar al bundle.

Variables disponibles:

| Variable | Descripción |
|---|---|
| `VITE_LLM_PROXY_TARGET` | Dirección del servidor local del modelo (sin `/v1`) |
| `VITE_LLM_PROXY_KEY` | Bearer token opcional; se inyecta solo en el proxy |
| `VITE_LLM_MODEL` | Nombre del modelo servido |
| `SYSTEM_PROMPT_FILE` | Prompt base; por defecto `/home/alan/sistema-prompt-cpu.txt` |

## Accesibilidad y responsive

- Landmarks `<header>` y `<main>`, skip link al contenido y foco visible.
- CSS mobile-first (`min-width`) con layouts de 1, 2 y 3 columnas según el ancho.
- Tema claro/oscuro con `data-theme` y respeto por `prefers-reduced-motion`.
- Enlaces externos con `rel="noopener noreferrer"` y aviso de nueva pestaña.

## Enlaces

- GitHub: https://github.com/AlanG-z
- LinkedIn: https://www.linkedin.com/in/alan-gutierrez-dev