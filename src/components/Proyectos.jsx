import '../styles/Seccion2.css'
import { proyectos } from '../data/proyectos'
import Reveal from './Reveal'

const delayByIndex = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3']

function Proyectos() {
    return (
    <Reveal as="section" className="seccion2" id="proyectos">
        <h2 className="section-title">Proyectos destacados</h2>
        {proyectos.map((proyecto, index) => (
            <Reveal key={proyecto.titulo} className="seccion" delay={delayByIndex[index % delayByIndex.length]}>
                <h3 className="titulo">{proyecto.titulo}</h3>
                <p className="tex-seccion">{proyecto.descripcion}</p>
            </Reveal>
        ))}
    </Reveal>
     );
}

export default Proyectos;