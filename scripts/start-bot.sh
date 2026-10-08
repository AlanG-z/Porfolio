#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LLAMA_SERVER_SCRIPT="${LLAMA_SERVER_SCRIPT:-/home/alan/llama-cpu-server.sh}"
SYSTEM_PROMPT_FILE="${SYSTEM_PROMPT_FILE:-/home/alan/sistema-prompt-cpu.txt}"

if [[ ! -f "$LLAMA_SERVER_SCRIPT" ]]; then
  echo "No se encontró el servidor llama: $LLAMA_SERVER_SCRIPT" >&2
  exit 1
fi

if [[ ! -f "$SYSTEM_PROMPT_FILE" ]]; then
  echo "No se encontró el system prompt: $SYSTEM_PROMPT_FILE" >&2
  exit 1
fi

export SYSTEM_PROMPT_FILE
export VITE_LLM_PROXY_TARGET="${VITE_LLM_PROXY_TARGET:-http://127.0.0.1:8080}"

cd "$ROOT_DIR"

bash "$LLAMA_SERVER_SCRIPT" &
llama_pid=$!
vite_pid=""

cleanup() {
  if [[ -n "$vite_pid" ]]; then
    kill "$vite_pid" 2>/dev/null || true
  fi
  kill "$llama_pid" 2>/dev/null || true
  wait "$llama_pid" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

npm run dev &
vite_pid=$!

wait -n "$llama_pid" "$vite_pid"