# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Bot local del portafolio

El proyecto usa un chat flotante de texto en `src/components/PortfolioBot.jsx`, conectado a una API compatible con OpenAI (por ejemplo, `llama-server`). El modelo se muestra mediante un pequeño botón: al pulsarlo se abre la conversación.

1. Inicia tu servidor local de modelos en `127.0.0.1:8080` y comprueba que expone `/v1`.
2. Copia la configuración de ejemplo:

   ```bash
   cp .env.example .env.local
   ```

3. Ajusta `VITE_LLM_PROXY_TARGET`, `VITE_LLM_MODEL` y, si hace falta, `VITE_LLM_PROXY_KEY`.
4. Arranca el portafolio con `npm run dev`.

El proxy de Vite expone `/v1` en el navegador y añade la clave en el servidor. No pongas una clave privada directamente en el componente.
