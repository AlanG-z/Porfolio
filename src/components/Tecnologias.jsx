import '../styles/Tecnologias.css'
import { herramientas } from '../data/tecnologias'
import Reveal from './Reveal'

function Tecnologias() {
    return (
        <Reveal as="section" className="tecno-logo" id="tecnologias">
            <div className="technology-heading">
                <p className="eyebrow">Stack</p>
                <h2 className="section-head">Herramientas</h2>
                <p>Las tecnologías que uso para construir interfaces y aplicaciones web.</p>
            </div>
            <div className="technology-grid">
                {herramientas.map(({ nombre, logo }, index) => (
                    <Reveal as="article" className="technology-card" delay={index % 3 === 1 ? 'reveal-delay-1' : index % 3 === 2 ? 'reveal-delay-2' : ''} key={nombre}>
                        <img src={logo} alt={nombre} loading="lazy" />
                        <span>{nombre}</span>
                    </Reveal>
                ))}
            </div>
        </Reveal>
    );
}

export default Tecnologias;