import { useState } from 'react'
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
                        <svg viewBox="0 0 24 24"><path d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Zm2.3.5 7.1 5.6a1 1 0 0 0 1.2 0l7.1-5.6H4.3ZM20 7.3l-7.4 5.8a2.5 2.5 0 0 1-3.2 0L2 7.3V19h18V7.3Z" /></svg>
                    </span>
                    <code className="email-copy-text">{EMAIL}</code>
                    <button type="button" className="email-copy-btn" onClick={copiarCorreo} aria-live="polite">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 9h9v11H9V9Zm-3 0v11a2 2 0 0 0 2 2h9v1.5H9a3.5 3.5 0 0 1-3.5-3.5V9H4V7.5h3V6a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-1v-1.5h1a1.5 1.5 0 0 0 1.5-1.5V6A1.5 1.5 0 0 0 16.5 4.5h-9A1.5 1.5 0 0 0 6 6v3Z" /></svg>
                        {copiado ? '¡Copiado!' : 'Copiar'}
                    </button>
                </div>


                <div className="contact-socials">
                    <p className="contact-socials-title">También puedes encontrarme en</p>
                    <ul className="contact-social-list">
        
                        <li>
                            <a href="https://www.linkedin.com/in/alan-gutierrez-dev" target="_blank" rel="noreferrer" aria-label="Visitar mi perfil de LinkedIn">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.7 3.4A2.4 2.4 0 1 1 0 3.4a2.4 2.4 0 0 1 4.7 0ZM.3 8h4.4v14H.3V8Zm7.1 0h4.2v1.9h.1c.6-1.1 2-2.3 4.1-2.3 4.4 0 5.2 2.9 5.2 6.7V22h-4.4v-6.8c0-1.6 0-3.7-2.3-3.7s-2.7 1.8-2.7 3.6V22H7.4V8Z" /></svg>
                                <span>LinkedIn</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="Visitar mi perfil de GitHub">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.8 1.4 3.5 1.1.1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C16.6 5.7 17.6 6 17.6 6c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" /></svg>
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