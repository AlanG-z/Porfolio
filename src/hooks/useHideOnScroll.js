import { useEffect, useRef, useState } from 'react'

// Por debajo de este scroll el header nunca se oculta (zona de lectura inicial).
const MIN_SCROLL = 140

// Tamaño mínimo de movimiento para considerarlo scroll intencional.
// Evita que el header "tiemble" con el rubber-banding de iOS o trackpads finos.
const DELTA_THRESHOLD = 8

/**
 * Oculta el header al bajar y lo muestra al subir.
 *
 * @param {object}  options
 * @param {boolean} options.enabled - Si es false, deja de escuchar el scroll
 *                                   (por ejemplo, con el menú móvil abierto).
 * @returns {boolean} `true` cuando el header debería estar oculto.
 */
export function useHideOnScroll({ enabled = true } = {}) {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    if (!enabled) return undefined

    lastY.current = window.scrollY

    const onScroll = () => {
      const currentY = Math.max(window.scrollY, 0)
      const delta = currentY - lastY.current

      if (Math.abs(delta) < DELTA_THRESHOLD) return

      setHidden(delta > 0 && currentY > MIN_SCROLL)
      lastY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled])

  return hidden
}
