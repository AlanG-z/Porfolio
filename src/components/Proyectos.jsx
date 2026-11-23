import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import '../styles/Proyectos.css'
import { proyectos } from '../data/proyectos'
import Reveal from './Reveal'

const delayByIndex = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3']

function Proyectos() {
    return (
    <Reveal as="section" className="seccion2" id="proyectos">
        <h2 className="section-title">Proyectos destacados</h2>
        {proyectos.map(({ titulo, descripcion, demo, repositorio, stack = [] }, index) => (
            <Reveal key={titulo} className="seccion" delay={delayByIndex[index % delayByIndex.length]}>
                <h3 className="titulo">{titulo}</h3>
                <p className="tex-seccion">{descripcion}</p>

                {stack.length > 0 && (
                    <ul className="proyecto-stack" aria-label={`Tecnologías de ${titulo}`}>
                        {stack.map((tecnologia) => (
                            <li className="proyecto-stack__chip" key={tecnologia}>{tecnologia}</li>
                        ))}

                    </ul>
                )}

                {(demo || repositorio) && (
                    
                    <div className="proyecto-links">
                        {demo && (
                            <a
                                className="proyecto-link proyecto-link--primary"
                                href={demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Ver la demo en vivo de ${titulo} (se abre en una pestaña nueva)`}
                            >
                                <ExternalLink size={16} strokeWidth={2} aria-hidden="true" />
                                <span>Demo</span>
                            </a>
                        )}

                        {repositorio && (
                            <a
                                className="proyecto-link"
                                href={repositorio}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Ver el código de ${titulo} en GitHub (se abre en una pestaña nueva)`}
                            >
                                <FaGithub size={16} aria-hidden="true" />
                                <span>Código</span>
                            </a>
                        )}
                    </div>
                )}
            </Reveal>
        ))}
    </Reveal>
     );
}

export default Proyectos;
