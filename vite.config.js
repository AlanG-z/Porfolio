import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// El bot local usa una API compatible con OpenAI (por ejemplo, llama.cpp).
// El proxy mantiene la clave fuera del bundle y permite llamar a /v1 desde el navegador.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_', ''])
  const target = env.VITE_LLM_PROXY_TARGET || 'http://127.0.0.1:8080'
  const proxyKey = env.VITE_LLM_PROXY_KEY || ''
  const configuredPromptPath =
    process.env.SYSTEM_PROMPT_FILE || env.SYSTEM_PROMPT_FILE || '/home/alan/sistema-prompt-cpu.txt'
  const fallbackPromptPath = resolve(process.cwd(), 'system_prompt.txt')
  const promptPath = existsSync(configuredPromptPath) ? configuredPromptPath : fallbackPromptPath
  const promptSource = existsSync(promptPath) ? readFileSync(promptPath, 'utf8') : ''

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
    plugins: [react()],
    define: {
      __PORTFOLIO_PROMPT_SOURCE__: JSON.stringify(promptSource),
    },
    server: {
      proxy: { '/v1': llmProxy },
    },
    preview: {
      proxy: { '/v1': llmProxy },
    },
  }
})