import { proyectos } from './proyectos'
import { herramientas } from './tecnologias'
import { educacion, habilidadesBlandas } from './formacion'

export const portfolioContext = {
  nombre: 'Alan Gutierrez',
  rol: 'Desarrollador frontend especializado en React',
  descripcion:
    'Construyo y mantengo aplicaciones web, desde dashboards internos hasta migraciones de infraestructura completas. Me interesa el detalle de cómo se arma algo, no solo que funcione.',
  email: 'alan108055@gmail.com',
  disponibilidad: 'Disponible para proyectos y responde los mensajes en menos de 24 horas.',
  proyectos: proyectos.map(({ titulo, descripcion }) => ({ titulo, descripcion })),
  tecnologias: herramientas.map(({ nombre }) => nombre),
  educacion,
  habilidadesBlandas,
}

const normalize = (value) =>
  value
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const includesAny = (text, words) => words.some((word) => text.includes(word))

const projectList = () =>
  portfolioContext.proyectos
    .map(({ titulo, descripcion }) => `• ${titulo}: ${descripcion}`)
    .join('\n')

const educationList = () =>
  portfolioContext.educacion
    .map(({ titulo, institucion, periodo }) => `• ${titulo} — ${institucion} (${periodo})`)
    .join('\n')

export function getLocalPortfolioAnswer(question) {
  const text = normalize(question.trim())

  if (!text) {
    return 'Escribe una pregunta y con gusto te cuento sobre mi portafolio.'
  }

  if (includesAny(text, ['hola', 'buenas', 'hey', 'que tal'])) {
    return `¡Hola! Soy el asistente de ${portfolioContext.nombre}. Puedes preguntarme sobre sus proyectos, tecnologías, experiencia o cómo contactarle.`
  }

  if (includesAny(text, ['proyecto', 'proyectos', 'portfolio', 'portafolio'])) {
    const project = portfolioContext.proyectos.find(({ titulo }) =>
      text.includes(normalize(titulo)),
    )

    if (project) {
      return `${project.titulo}: ${project.descripcion}`
    }

    return `Estos son los proyectos destacados de ${portfolioContext.nombre}:\n\n${projectList()}`
  }

  if (includesAny(text, ['tecnolog', 'stack', 'herramient', 'framework', 'lenguaje', 'react', 'php', 'javascript', 'laravel', 'git'])) {
    return `Trabaja principalmente con ${portfolioContext.tecnologias.join(', ')}. Su enfoque actual es React y frontend, complemented con PHP, Laravel, JavaScript, Git y otras herramientas.`
  }

  if (includesAny(text, ['educacion', 'estudio', 'estudios', 'universidad', 'tecnicatura', 'secundaria', 'curso', 'ingles'])) {
    return `Su formación incluye:\n\n${educationList()}`
  }

  if (includesAny(text, ['habilidad', 'habilidades', 'blandas', 'comunicacion', 'responsabilidad', 'puntualidad', 'aprendizaje', 'equipo', 'adaptabilidad'])) {
    return `Sus habilidades blandas son: ${portfolioContext.habilidadesBlandas.join(', ')}.`
  }

  if (includesAny(text, ['contact', 'correo', 'email', 'escribir', 'whatsapp', 'linkedin', 'github', 'disponible', 'trabajo'])) {
    return `${portfolioContext.disponibilidad} Puedes escribirle a ${portfolioContext.email} o encontrarlo en sus perfiles de WhatsApp, LinkedIn y GitHub desde la sección Contacto.`
  }

  if (includesAny(text, ['quien', 'queda', 'presenta', 'sobre mi', 'sobre ti', 'experiencia', 'que haces', 'a que te dedicas', 'biografia'])) {
    return `${portfolioContext.nombre} es ${portfolioContext.rol.toLowerCase()}. ${portfolioContext.descripcion}`
  }

  if (includesAny(text, ['gracias', 'genial', 'perfecto'])) {
    return '¡De nada! Si quieres, también puedes preguntarme por un proyecto concreto.'
  }

  return `No tengo una respuesta exacta para eso, pero puedo contarte sobre ${portfolioContext.nombre}, sus proyectos, tecnologías, experiencia o cómo contactarle.`
}
