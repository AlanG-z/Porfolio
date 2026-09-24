import '../styles/Seccion4.css'
import { educacion } from '../data/formacion'
import Reveal from './Reveal'

const delayByIndex = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3']

function Educacion() {
  return (
    <Reveal as="section" className="educacion" id="educacion">
      <div className="formacion-intro">
        <p className="formacion-eyebrow">Formación</p>
        <h2 className="formacion-title">Educación</h2>
        <p>Mi trayectoria académica y los espacios donde sigo aprendiendo.</p>
      </div>

      <ol className="education-timeline">
        {educacion.map((item, index) => (
          <Reveal
            as="li"
            className="education-item"
            delay={delayByIndex[index % delayByIndex.length]}
            key={item.titulo}
          >
            <span className="education-marker" aria-hidden="true" />
            <div className="education-content">
              <span className="education-period">{item.periodo}</span>
              <h3>{item.titulo}</h3>
              <p>{item.institucion}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Reveal>
  )
}

export default Educacion
