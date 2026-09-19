import './css/Seccion1.css'
import profileImage from '../assets/perfil2.png'

function SobreMi() {
    return (
        <section className="perfil" id="inicio">
            <div className="info">
                <h1 className='Titulo'>Alan Gutierrez</h1>
                <div className="role">Desarrollador · React / frontend</div>
                <p className="pitch">Construyo y mantengo aplicaciones web, desde dashboards internos
                    hasta migraciones de infraestructura completas. Me interesa el
                    detalle de cómo se arma algo, no solo que funcione.</p>
                <div className="contact-row">
                    <a href="mailto:alan108055@gmail.com">alan108055@gmail.com</a>
                    <a href="https://github.com/AlanG-z" target="_blank" rel="noreferrer">Github</a>
                </div>
            </div>
            <img src={profileImage} alt="Retrato de Alan Gutierrez" />
        </section>
    );
}

export default SobreMi;
/*<p>Soy desarrollador y diseñador web con conocimientos tanto en frontend como en backend, enfocado en crear aplicaciones web modernas, funcionales y orientadas a la experiencia del usuario. Tengo experiencia con tecnologías como React en el desarrollo de interfaces, así como en la implementación de soluciones backend con PHP, Laravel y bases de datos SQL.</p>
*/