import { Moon, Sun } from 'lucide-react'
import '../styles/ThemeToggle.css'

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  const ThemeIcon = isDark ? Sun : Moon

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <ThemeIcon className="theme-toggle-icon" size={16} strokeWidth={2.2} />
      </span>
      <span className="theme-toggle-text">{isDark ? 'Claro' : 'Oscuro'}</span>
    </button>
  )
}

export default ThemeToggle
