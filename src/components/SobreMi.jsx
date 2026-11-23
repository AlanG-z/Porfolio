import { CodeXml, Download } from 'lucide-react'
import '../styles/SobreMi.css'
import profileImage from '../assets/Perfil.webp'
import Reveal from './Reveal'

function SobreMi() {
    return (
        <Reveal as="section" className="perfil" id="inicio">
            <div className="info">
                <h1 className='Titulo'>Alan Gutierrez</h1>
                <div className="role">Software Engineer · React / frontend</div>
                <p className="pitch">Construyo y mantengo aplicaciones web, desde dashboards internos
                    hasta migraciones de infraestructura completas. Me interesa el
                    detalle de cómo se arma algo, no solo que funcione.</p>

                <div className="hero-actions">
                    <a
                        className="cv-download"
                        href="/Alan_Gutierrez_CV.pdf"
                        download="Alan-Gutierrez-CV.pdf"
                    >
                        <Download size={17} strokeWidth={1.8} aria-hidden="true" />
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
                        width="1000"
                        height="1333"
                    />
                </div>
                <span className="profile-portrait__code" aria-hidden="true">
                    <CodeXml size={20} strokeWidth={1.9} />
                </span>
                <span className="profile-portrait__dot" aria-hidden="true" />
            </div>

        </Reveal>
    );
}

export default SobreMi;