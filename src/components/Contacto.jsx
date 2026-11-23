import { useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import '../styles/Contacto.css'
import Reveal from './Reveal'

const EMAIL = 'alan108055@gmail.com'

function Contacto() {
    const [copiado, setCopiado] = useState(false)

    const copiarCorreo = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL)
        } catch {
            const input = document.createElement('input')
            input.value = EMAIL
            document.body.appendChild(input)
            input.select()
            document.execCommand('copy')
            document.body.removeChild(input)
        }
        setCopiado(true)
        setTimeout(() => setCopiado(false), 2000)
    }

    return (
        <Reveal as="section" className="contacto contacto-simple" id="contacto">
            <div className="contacto-glow" aria-hidden="true" />
            <div className="contacto-intro">
                <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Disponible · Hablemos</p>
                <h2>¿Tienes un proyecto en mente?</h2>
                <p className="contact-sub">Escríbeme directamente, respondo en menos de 24h.</p>

                <div className={`email-copy ${copiado ? 'is-copied' : ''}`} role="group" aria-label="Correo electrónico">
                    <span className="email-copy-avatar" aria-hidden="true">
                        <Mail size={22} strokeWidth={2} />
                    </span>
                    <code className="email-copy-text">{EMAIL}</code>
                    <button type="button" className="email-copy-btn" onClick={copiarCorreo} aria-live="polite">
                        {copiado
                            ? <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                            : <Copy size={16} strokeWidth={2} aria-hidden="true" />}
                        {copiado ? '¡Copiado!' : 'Copiar'}
                    </button>
                </div>


                <div className="contact-socials">
                    <p className="contact-socials-title">También puedes encontrarme en</p>
                    <ul className="contact-social-list">
        
                        <li>
                            <a href="https://www.linkedin.com/in/alan-gutierrez-dev" target="_blank" rel="noopener noreferrer" aria-label="Visitar mi perfil de LinkedIn (se abre en una pestaña nueva)">
                                <FaLinkedinIn size={19} aria-hidden="true" />
                                <span>LinkedIn</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/AlanG-z" target="_blank" rel="noopener noreferrer" aria-label="Visitar mi perfil de GitHub (se abre en una pestaña nueva)">
                                <FaGithub size={19} aria-hidden="true" />
                                <span>GitHub</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </Reveal>
    )
}

export default Contacto;