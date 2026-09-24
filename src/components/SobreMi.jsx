import '../styles/Seccion1.css'
import profileImage from '../assets/perfil2.png'
import Reveal from './Reveal'

function SobreMi() {
    return (
        <Reveal as="section" className="perfil" id="inicio">
            <div className="info">
                <h1 className='Titulo'>Alan Gutierrez</h1>
                <div className="role">Desarrollador · React / frontend</div>
                <p className="pitch">Construyo y mantengo aplicaciones web, desde dashboards internos
                    hasta migraciones de infraestructura completas. Me interesa el
                    detalle de cómo se arma algo, no solo que funcione.</p>
             
            </div>
            <img src={profileImage} alt="Retrato de Alan Gutierrez" />
            
        </Reveal>
    );
}

export default SobreMi;