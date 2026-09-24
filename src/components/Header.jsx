import '../styles/Header.css'
import ThemeToggle from './ThemeToggle'

function Header({ theme = 'dark', onToggleTheme }) {
    return (
            <nav className="div-header" aria-label="Navegación principal">
                <div className='logo'><p>{'</>'}Alan</p></div>
                <ul className="Header">
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#proyectos">Proyectos</a></li>
                    <li><a href="#tecnologias">Tecnologías</a></li>
                    <li><a href="#educacion">Educación</a></li>
                    <li><a href="#habilidades-blandas">Habilidades</a></li>
                    <li><a href="#contacto">Contacto</a></li>
                </ul>
                <div className="header-actions">
                    <ThemeToggle theme={theme} onToggle={onToggleTheme} />
                </div>
            </nav>
        
    );
}

export default Header;  