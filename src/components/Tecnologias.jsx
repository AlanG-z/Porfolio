import './css/Seccion3.css'
import reactLogo from '../assets/react-1.png'
import phpLogo from '../assets/php.png'
import javascriptLogo from '../assets/js.png'
import htmlLogo from '../assets/html.png'
import cssLogo from '../assets/css.png'
import laravelLogo from '../assets/laravel.png'
import vscodeLogo from '../assets/images.png'
import gitLogo from '../assets/Git.jpg'
import jqueryLogo from '../assets/jquery.png'

const herramientas = [
    { nombre: 'React', logo: reactLogo },
    { nombre: 'PHP', logo: phpLogo },
    { nombre: 'JavaScript', logo: javascriptLogo },
    { nombre: 'HTML', logo: htmlLogo },
    { nombre: 'CSS', logo: cssLogo },
    { nombre: 'Laravel', logo: laravelLogo },
    { nombre: 'Visual Studio Code', logo: vscodeLogo },
    { nombre: 'Git', logo: gitLogo },
    { nombre: 'jQuery', logo: jqueryLogo },
]

function Tecnologias() {
    return (
        <section className="tecno-logo" id="tecnologias">
            <div className="technology-heading">
                <p className="eyebrow">Stack</p>
                <h2 className="section-head">Herramientas</h2>
                <p>Las tecnologías que uso para construir interfaces y aplicaciones web.</p>
            </div>
            <div className="technology-grid">
                {herramientas.map(({ nombre, logo }) => (
                    <article className="technology-card" key={nombre}>
                        <img src={logo} alt="" aria-hidden="true" />
                        <span>{nombre}</span>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Tecnologias;