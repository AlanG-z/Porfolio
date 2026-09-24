import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// El bot local usa una API compatible con OpenAI (por ejemplo, llama.cpp).
// El proxy mantiene la clave fuera del bundle y permite llamar a /v1 desde el navegador.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_', ''])
  const target = env.VITE_LLM_PROXY_TARGET || 'http://127.0.0.1:8080'
  const proxyKey = env.VITE_LLM_PROXY_KEY || ''

  const llmProxy = {
    target,
    changeOrigin: true,
    configure: (proxy) => {
      proxy.on('proxyReq', (proxyRequest) => {
        if (proxyKey) {
          proxyRequest.setHeader('Authorization', `Bearer ${proxyKey}`)
        }
      })
    },
  }

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: { '/v1': llmProxy },
    },
    preview: {
      proxy: { '/v1': llmProxy },
    },
  }
})
