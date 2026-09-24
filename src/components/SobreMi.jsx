import '../styles/SobreMi.css'
import profileImage from '../assets/Perfil.png'
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

                <div className="hero-actions">
                    <a
                        className="cv-download"
                        href="/Alan_Gutierrez_CV.pdf"
                        download="Alan-Gutierrez-CV.pdf"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 18.5v1A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-1" />
                        </svg>
                        <span>Descargar CV</span>
                    </a>
                    <span className="hero-actions-note">Formato PDF</span>
                </div>
             
            </div>

            <div className="profile-portrait">
                <span className="profile-portrait__orbit" aria-hidden="true" />
                <div className="profile-portrait__frame">
                    <img
                        src={profileImage}
                        alt="Retrato de Alan Gutierrez"
                        width="1086"
                        height="1448"
                    />
                </div>
                <span className="profile-portrait__code" aria-hidden="true">
                    &lt;/&gt;
                </span>
                <span className="profile-portrait__dot" aria-hidden="true" />
            </div>

        </Reveal>
    );
}

export default SobreMi;