import '../styles/Habilidades.css'
import { habilidadesBlandas } from '../data/formacion'
import Reveal from './Reveal'

const delayByIndex = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3']

function HabilidadesBlandas() {
  return (
    <Reveal as="section" className="habilidades-blandas" id="habilidades-blandas">
      <div className="formacion-intro">
        <p className="formacion-eyebrow">Perfil</p>
        <h2 className="formacion-title">Habilidades blandas</h2>
        <p>Cualidades que me ayudan a trabajar bien con personas y proyectos.</p>
      </div>

      <ul className="soft-skills-list">
        {habilidadesBlandas.map((habilidad, index) => (
          <Reveal
            as="li"
            className="soft-skill-card"
            delay={delayByIndex[index % delayByIndex.length]}
            key={habilidad}
          >
            <span className="soft-skill-check" aria-hidden="true">✓</span>
            <span>{habilidad}</span>
          </Reveal>
        ))}
      </ul>
    </Reveal>
  )
}

export default HabilidadesBlandas
