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
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h5v2H6v11h11v-4h2v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                                </svg>
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
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.8 1.4 3.5 1.1.1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C16.6 5.7 17.6 6 17.6 6c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
                                </svg>
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
