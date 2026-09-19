import './css/Header.css'
function Header() {
    return (
            <nav className="div-header" aria-label="Navegación principal">
                <div className='logo'><img src="" alt="" /><p>{'</>'}Alan</p></div>
                <ul className="Header">
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#proyectos">Proyectos</a></li>
                    <li><a href="#tecnologias">Tecnologías</a></li>
                    <li><a href="#contacto">Contacto</a></li>
                </ul>
            </nav>
        
    );
}

export default Header;  