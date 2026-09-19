import './css/Contacto.css'

function Contacto() {
    const handleSubmit = (event) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const nombre = form.get('nombre')
        const email = form.get('email')
        const mensaje = form.get('mensaje')
        const subject = encodeURIComponent(`Contacto desde el portfolio - ${nombre}`)
        const body = encodeURIComponent(`Nombre: ${nombre}\nCorreo: ${email}\n\n${mensaje}`)

        window.location.href = `mailto:alan108055@gmail.com?subject=${subject}&body=${body}`
    }

    return (
        <section className="contacto" id="contacto">
            <div className="contacto-intro">
                <p className="eyebrow">Hablemos</p>
                <h2>¿Tienes un proyecto en mente?</h2>
                <p>Cuéntame qué necesitas y responderé a tu correo lo antes posible.</p>
                <div className="contact-socials">
                    <p className="contact-socials-title">También puedes encontrarme en</p>
                    <ul className="contact-social-list">
                        <li>
                            <a href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="Contactarme por WhatsApp">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.3-6.1-3.5-8.3ZM12.1 21.5h-.1c-1.7 0-3.4-.5-4.8-1.4l-.3-.2-3.8 1 1-3.7-.2-.3a9.7 9.7 0 0 1-1.5-5.1C2.4 6.4 6.8 2 12.1 2c2.6 0 5 1 6.8 2.8a9.6 9.6 0 0 1 2.8 6.9c0 5.3-4.3 9.8-9.6 9.8Zm5.3-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.8-1.7.1-.3 0-.5 0-.7l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3c.2.2 2.2 3.4 5.4 4.7 2 .8 2.8.9 3.8.8.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.2-.1-.4-.2-.7-.3Z" /></svg>
                                <span>WhatsApp</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="Visitar mi perfil de LinkedIn">
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
            <form className="contacto-form" onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre</label>
                <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" required />

                <label htmlFor="email">Correo electrónico</label>
                <input id="email" name="email" type="email" placeholder="tu@correo.com" required />

                <label htmlFor="mensaje">Mensaje</label>
                <textarea id="mensaje" name="mensaje" rows="5" placeholder="¿En qué puedo ayudarte?" required />

                <button type="submit">Enviar mensaje</button>
            </form>
        </section>
    )
}

export default Contacto;