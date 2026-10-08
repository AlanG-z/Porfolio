export const portfolioSections = [
  {
    id: 'educacion',
    title: 'Educación',
    keywords: [
      'educacion',
      'estudios',
      'estudio',
      'formacion',
      'universidad',
      'facultad',
      'tecnicatura',
      'secundaria',
      'curso',
      'ingles',
    ],
  },
  {
    id: 'habilidades-blandas',
    title: 'Habilidades blandas',
    keywords: [
      'habilidades',
      'blandas',
      'comunicacion',
      'responsabilidad',
      'puntualidad',
      'aprendizaje',
      'equipo',
      'adaptabilidad',
      'perfil',
    ],
  },
  {
    id: 'tecnologias',
    title: 'Herramientas',
    keywords: [
      'herramientas',
      'tecnologias',
      'tecnologia',
      'stack',
      'react',
      'dart',
      'php',
      'javascript',
      'html',
      'css',
      'laravel',
      'git',
      'lenguaje',
      'framework',
    ],
  },
  {
    id: 'proyectos',
    title: 'Proyectos destacados',
    keywords: [
      'proyectos',
      'proyecto',
      'genesis',
      'estacione',
      'estacionamiento',
      'aplicacion',
    ],
  },
  {
    id: 'contacto',
    title: 'Contacto',
    keywords: [
      'contacto',
      'contact',
      'correo',
      'email',
      'whatsapp',
      'linkedin',
      'github',
      'escribir',
      'disponible',
    ],
  },
  {
    id: 'inicio',
    title: 'Inicio',
    keywords: ['inicio', 'quien', 'presentacion', 'sobre mi', 'biografia'],
  },
]

const normalize = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

export function findPortfolioSection(text) {
  const normalized = normalize(text)
  if (!normalized) return null

  let match = null
  let firstMatchIndex = Number.POSITIVE_INFINITY

  portfolioSections.forEach((section) => {
    section.keywords.forEach((keyword) => {
      const index = normalized.indexOf(normalize(keyword))
      if (index !== -1 && index < firstMatchIndex) {
        match = section
        firstMatchIndex = index
      }
    })
  })

  return match
}