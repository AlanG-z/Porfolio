import { useEffect, useRef, useState } from 'react'
import { CodeXml, Menu, X } from 'lucide-react'
import '../styles/Header.css'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#tecnologias', label: 'Tecnologías' },
  { href: '#educacion', label: 'Educación' },
  { href: '#habilidades-blandas', label: 'Habilidades' },
  { href: '#contacto', label: 'Contacto' },
]

const DESKTOP_QUERY = '(min-width: 861px)'

function Header({ theme = 'dark', onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)

  // Al pasar a desktop el panel móvil deja de aplicar: lo cerramos.
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY)
    const handleChange = (event) => {
      if (event.matches) setMenuOpen(false)
    }
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  // Escape cierra el menú y devuelve el foco al botón.
  useEffect(() => {
    if (!menuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      toggleRef.current?.focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <header>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <nav
        className="div-header"
        aria-label="Navegación principal"
      >
        <div className="logo">
          <p>
            <CodeXml className="logo-icon" size={18} strokeWidth={2.2} aria-hidden="true" />
            <span>Alan</span>
          </p>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="header-toggle"
          aria-expanded={menuOpen}
          aria-controls="header-menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen
            ? <X size={22} strokeWidth={2} aria-hidden="true" />
            : <Menu size={22} strokeWidth={2} aria-hidden="true" />}
        </button>

        <div
          className={`header-menu${menuOpen ? ' is-open' : ''}`}
          id="header-menu"
        >
          <ul className="Header">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} onClick={() => setMenuOpen(false)}>{label}</a>
              </li>
            ))}
          </ul>

          <div className="header-actions">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
