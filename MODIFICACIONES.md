# Modificaciones aplicadas — Reporte AlanG-z

Documento generado el **4 de octubre de 2026**.
Parte de la revisión: `reporte_AlanG-z.md` (evaluación del checklist React 2026).
Repositorio: https://github.com/AlanG-z/Porfolio

---

## 1. Resumen

Se aplicaron los hallazgos **críticos**, **importantes** y **deseables** del reporte.
Cada punto incluye el estado final y el archivo afectado.

| Severidad | Hallazgo | Estado |
|---|---|---|
| 🔴 | Landmark `<main>` y `<header>` | ✅ Resuelto (ya estaba en el commit previo; se corrigió el anidamiento) |
| 🟡 | Skip link | ✅ Resuelto |
| 🟡 | Responsive desktop-first con `max-width` | ✅ Resuelto — CSS 100% mobile-first |
| 🟡 | `font-size` en px fijos | ✅ Resuelto — todo en `rem` |
| 🟡 | Tailwind instalado pero inerte | ✅ Resuelto — dependencia eliminada |
| 🟡 | `useEffect` con dependencia incompleta | ✅ Resuelto |
| 🟡 | Enlace de GitHub sin destino real | ✅ Resuelto |
| 🟡 | Manipulación directa del DOM en `Reveal` | ✅ Resuelto — estado declarativo |
| 🟢 | `rel="noopener"` literal | ✅ Resuelto |
| 🟢 | `aria-expanded` estático en el launcher | ✅ Resuelto |
| 🟢 | Retrato sin comprimir (1,45 MB) | ✅ Resuelto — WebP 100 KB (−93%) |
| 🟢 | Assets huérfanos | ⚠️ Parcial — `perfil2.png` borrado, `dart.svg` **se conserva** (sí se usa) |
| 🟢 | README de plantilla | ✅ Resuelto |
| ➕ | **Contacto roto en desktop** (detectado al verificar) | ✅ Resuelto — ver §5.1 |
| ➕ | **Proyectos sin enlaces a código** (sección sugerida #1) | ✅ Implementado — ver §6 |
| ➕ | **Navegación móvil + auto-ocultado del header** | ✅ Implementado — ver §7 |

---

## 2. Hallazgos críticos

### 2.1 Landmarks `<main>` y `<header>`

**Problema:** el contenido no tenía regiones semánticas y la navegación era un `<nav>` suelto.

**Estado previo:** el commit `93c3eff` ya había añadido `<main>` en `App.jsx` y `<header>` en
`Header.jsx`, pero con un anidamiento incorrecto: `<main>` envolvía también al `<header>`.

**Corrección aplicada** (`src/App.jsx`):

```
<div className="app">          ← contenedor raíz
  <Header />                    ← banner (fuera de main)
  <main id="contenido">         ← región principal
    <SobreMi /> <Proyectos /> <Tecnologias />
    <Educacion /> <HabilidadesBlandas /> <Contacto />
  </main>
  <Footer />
  <PortfolioBot />
</div>
```

Se añadió `tabIndex={-1}` al `<main>` para que el skip link deposite el foco correctamente.

Checklist: **H-06, H-07** ✅

---

## 3. Hallazgos importantes

### 3.1 Skip link

**Problema:** un usuario de teclado debía recorrer los 6 enlaces + toggle para llegar al contenido.

**Corrección aplicada** (`src/components/Header.jsx` + `src/index.css`):

- Primer elemento enfocable del `<header>`, antes del `<nav>`:
  `<a className="skip-link" href="#contenido">Saltar al contenido</a>`
- Estilos: `position: fixed`, desplazado fuera de pantalla con
  `transform: translateY(calc(-100% - 1.5rem))` y-visible en `:focus-visible`.
- Color de texto adaptado por tema (`#191714` en oscuro, `#fff` en claro).

Checklist: **H-51** ✅

### 3.2 Responsive mobile-first

**Problema:** los estilos base describían el escritorio y las media queries usaban `max-width`
para "recortar" el móvil (anti-patrón del apunte).

**Corrección aplicada:** los 7 archivos de layout se reescribieron con **base móvil +
`@media (min-width: …)`**. Ahora no queda ningún `@media (max-width)` en el proyecto.

| Archivo | Base (móvil) | Escalones `min-width` |
|---|---|---|
| `Header.css` | 2 filas: logo+toggle / nav 3 cols | 481px → nav en 3 columnas junto al logo; 861px → una fila |
| `SobreMi.css` | 1 columna centrada, foto 292px | 381px → foto 320px; 521px → foto 430px + frame 78%; 901px → 2 columnas desktop |
| `Proyectos.css` | 1 columna, padding 20px | 641px → 2 columnas; 1001px → 3 columnas |
| `Tecnologias.css` | 1 columna, tarjetas 2×, 110px | 381px → tarjetas grandes; 601px → 3 columnas; 821px → layout lateral |
| `Educacion.css` | 1 columna, timeline compacto | 461px → timeline ancho; 761px → 2 columnas; 1024px → intro 360px |
| `Habilidades.css` | 1 columna, tarjetas 1× | 461px → 2 columnas; 761px → 2 columnas de sección; 1024px → intro 360px |
| `Contacto.css` | Email en 2 filas (grid), botón ancho | 481px → email en una línea; 701px → padding y gaps de escritorio |
| `PortfolioBot.css` | Panel a `100vw - 24px`, input `1rem` | 541px → margins de 24px, input `0.78rem` |

Se eliminó el `@media (max-width: 900px)` muerto de `Footer.css`.

> Nota: `input` del chat en `1rem` (16px) en móvil es intencional — por debajo de 16px iOS
> hace zoom automático al enfocar.

Checklist: **C-16** ✅

### 3.3 `font-size` en px fijos → `rem`

Todos los tamaños fijos pasaron a `rem`, respetando la preferencia de tamaño de fuente:

| Archivo | Antes | Ahora |
|---|---|---|
| `SobreMi.css` `.role` | `15px` | `0.84rem` → `0.94rem` |
| `SobreMi.css` `.pitch` | `16.5px` | `1rem` → `1.03rem` |
| `SobreMi.css` `.cv-download` | `13px` | `0.81rem` |
| `SobreMi.css` `.hero-actions-note` | `12px` | `0.75rem` |
| `SobreMi.css` `.contact-row` | `13.5px` | `0.84rem` |
| `Proyectos.css` `.titulo` | `30px` | `clamp(1.5rem, 2.2vw, 1.875rem)` |

Verificado con grep: **0 coincidencias** de `font-size: Npx` en todo `src/`.

Checklist: **C-10, C-21** ✅

### 3.4 Tailwind instalado pero inerte

**Problema:** `@tailwindcss/vite` + `@import "tailwindcss"` estaban configurados pero ningún
componente usaba una utilidad. Se pagaba build por un framework sin uso, y el stack declarado
no correspondía al código real.

**Decisión tomada:** se optó por la segunda vía sugerida en el reporte — **quitar la dependencia
y mantener el CSS propio**, que es consistente y usa variables de tema.

Acciones:
- `npm uninstall @tailwindcss/vite tailwindcss` → 17 paquetes eliminados (25 restantes).
- `vite.config.js`: import y plugin `tailwindcss()` eliminados.
- `src/App.css`: `@import "tailwindcss"` eliminado.
- `src/index.css`: se añadió un **reset propio** equivalente al preflight que se usaba
  (box-sizing, headings sin margen, listas, `img`/`svg` block, `button`/`input` con `font: inherit`).

Resultado: el CSS pasó de **38,08 KB → 32,84 KB** sin pérdida visual.

Checklist: **T-01, T-04, T-07** ✅

### 3.5 `useEffect` con dependencia incompleta (stale closure)

**Problema:** el listener de `keydown` llamaba a `closeBot`, pero el array de dependencias era
solo `[isOpen]`, capturando la función del primer render.

**Corrección aplicada** (`src/components/PortfolioBot.jsx`):

```js
import { useCallback, useEffect, useRef, useState } from 'react'

const closeBot = useCallback(() => {
  requestControllerRef.current?.abort()
  setIsOpen(false)
}, [])

useEffect(() => { /* ... */ }, [isOpen, closeBot])
```

`closeBot` ahora es estable y aparece en las dependencias del efecto.

Checklist: **R-27** ✅

### 3.6 Enlace de GitHub sin destino real

**Problema:** apuntaba a `https://github.com/` (la home) en vez del perfil.

**Corrección aplicada** (`src/components/Contacto.jsx`):

```
href="https://github.com/AlanG-z"
```

Checklist: **H-19** ✅

### 3.7 Manipulación directa del DOM en `Reveal`

**Problema:** el `IntersectionObserver` hacía `entry.target.classList.add('visible')` fuera del
ciclo de render de React.

**Corrección aplicada** (`src/components/Reveal.jsx`): estado declarativo.

```js
const canObserve = typeof IntersectionObserver === 'function'
const [visible, setVisible] = useState(!canObserve)

useEffect(() => {
  if (!el || !canObserve) return
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' })
  // ...
}, [])

const classes = ['reveal', visible && 'visible', delay, className].filter(Boolean).join(' ')
```

Mejoras adicionales:
- El fallback sin `IntersectionObserver` ahora se resuelve en el **inicializador del estado**
  (`useState(!canObserve)`) en lugar de un `setState` dentro del efecto — esto también eliminó
  el warning `react(set-state-in-effect)` del linter.
- `threshold` bajado de `0.15` → `0.05` y `rootMargin` de `-40px` → `-10px`: en viewports
  altos la sección hero (muy alta) podía no alcanzar el 15% y quedaba invisible.
- El `className` se construye con `filter(Boolean).join(' ')` en lugar de interpolaciones
  que generaban espacios sobrantes.

`useTheme.js` se mantiene con el `dataset` (el reporte lo acepta como efecto de lado válido).

Checklist: **J-27, J-28** ✅

---

## 4. Hallazgos deseables

### 4.1 `rel="noopener noreferrer"` y aviso de nueva pestaña

**Corrección aplicada** (`src/components/Contacto.jsx`) — ambos enlaces:

```jsx
rel="noopener noreferrer"
aria-label="Visitar mi perfil de LinkedIn (se abre en una pestaña nueva)"
aria-label="Visitar mi perfil de GitHub (se abre en una pestaña nueva)"
```

Checklist: **H-21, H-22** ✅

### 4.2 `aria-expanded` dinámico en el launcher del bot

**Problema:** el botón declaraba siempre `aria-expanded="false"` y además solo se renderizaba
cuando el panel estaba cerrado, impidiendo que el atributo reflejara el estado real.

**Corrección aplicada** (`src/components/PortfolioBot.jsx`):

1. El panel pasó de ternario a render condicional: `{isOpen && (<section …>)}`.
2. El launcher se renderiza **siempre**, con estado dinámico:

```jsx
<button
  className="portfolio-bot-launcher"
  onClick={() => setIsOpen((open) => !open)}
  aria-expanded={isOpen}
  aria-controls="portfolio-bot-conversation"
  aria-label={isOpen ? 'Cerrar conversación con el asistente' : 'Abrir conversación con el asistente'}
  title={isOpen ? 'Cerrar conversación' : 'Abrir conversación'}
>
```

El launcher ahora hace de botón abrir/cerrar, y su `aria-label` y tooltip cambian con el estado.

Checklist: **H-53** ✅

### 4.3 Retrato sin comprimir

**Problema:** `Perfil.png` pesaba **1,45 MB** (el 90% del peso de assets) para un hero con
`object-fit: cover`.

**Corrección aplicada:**

- Conversión a **WebP con canal alfa preservado** (el PNG original era `RGBA` con fondo
  transparente; una primera conversión a RGB lo rellenó de negro — corregido).
- Redimensionado de 1086×1448 → **1000×1333** (suficiente para el máximo de ~460px CSS a DPR 2).
- Calidad 84, método 6.

| Asset | Antes | Ahora | Ahorro |
|---|---|---|---|
| `Perfil.png` | 1,45 MB | — | — |
| `Perfil.webp` | — | **100 KB** | **−93%** |

Actualizado `src/components/SobreMi.jsx`: import a `Perfil.webp` y atributos
`width="1000" height="1333"` (evita CLS).

Checklist: **C-14** ✅

### 4.4 Assets huérfanos

| Asset | Reporte | Verificación real | Acción |
|---|---|---|---|
| `perfil2.png` (76 KB) | "huérfano" | Confirmado: 0 imports | ✅ Borrado (`git rm`) |
| `dart.svg` (0,7 KB) | "huérfano" | **Falso positivo**: se importa en `src/data/tecnologias.js:9` | ⚠️ **Conservado** |

> El reporte se equivocó con `dart.svg`: sí se usa en la grilla de Herramientas. No se borró.

Checklist: **R-02** ⚠️ parcial

### 4.5 README de plantilla

**Problema:** las primeras 16 líneas eran el README default de `create-vite`.

**Corrección aplicada** — `README.md` reescrito por completo en español con:

- Descripción del proyecto y qué hace.
- Stack real (se eliminó la mención a Tailwind).
- Árbol de estructura de `src/`.
- Comandos (`dev`, `build`, `preview`, `lint`).
- Tabla de secciones con sus anclas.
- Sección del bot local **conservada y ampliada** (`.env.example`, variables, proxy, por qué
  la clave no debe ir en el bundle).
- Sección de accesibilidad y responsive.
- Enlaces a GitHub y LinkedIn.

Checklist: **R-02** ✅

---

## 5. Corrección adicional no listada en el reporte

### Flash de tema en el primer pintado

**Síntoma:** al cargar, el CSS arrancaba en tema oscuro (valor por defecto de `:root`) mientras
el toggle ya mostraba la etiqueta del tema resuelto por preferencia del sistema — producing un
destello y un toggle con texto ilegible sobre el fondo contrario.

**Causa:** `useTheme` sincronizaba `document.documentElement.dataset.theme` en un `useEffect`,
que corre **después** del primer pintado.

**Corrección** (`src/hooks/useTheme.js`): se cambió a `useLayoutEffect`, que corre antes del
pintado, sincronizando el CSS y el toggle desde el primer fotograma.

```js
import { useCallback, useLayoutEffect, useState } from 'react'

useLayoutEffect(() => {
  document.documentElement.dataset.theme = theme
  localStorage.setItem(STORAGE_KEY, theme)
}, [theme])
```

### 5.1 Sección de contacto rota en desktop (≥701 px)

**Síntoma reportado:** en pantallas anchas (1372 px) el bloque "¿Tienes un proyecto en mente?"
quedaba **pegado a la izquierda**, comprimido en ~470 px de ancho, con la mitad derecha de la
sección completamente vacía.

**Reproducción:** confirmada con captura de página completa a 1372 px.

**Causa raíz:** el elemento tiene **dos clases** — `className="contacto contacto-simple"` — y ambas
tienen la misma especificidad (0,1,0):

```css
/* Contacto.css — bloque base (línea ~14) */
.contacto-simple { grid-template-columns: minmax(0, 1fr); }   /* 1 columna */

/* Contacto.css — dentro de @media (min-width: 701px), más ABAJO en el archivo */
.contacto { grid-template-columns: minmax(220px,0.8fr) minmax(280px,1.2fr); }  /* 2 columnas */
```

Las media queries **no añaden especificidad**. Como la regla `.contacto` de 2 columnas estaba
escrita más abajo en el archivo, **ganaba** por orden de cascada a partir de 701 px. La
sección se convertía en un grid de 2 columnas y su único hijo (`.contacto-intro`) solo ocupaba
la primera columna (`0.8fr`), quedando desalineado y con media pantalla vacía.

> El bug existía también en el código original (desktop-first), pero era **invisible por
> casualidad**: las media queries `max-width` se evaluaban en orden inverso, así que la regla
> base `1fr` siempre ganaba. Al migrar a mobile-first el orden se invirtió y el conflicto
> salió a la luz.

**Corrección aplicada** — dos defensas complementarias en `src/styles/Contacto.css`:

1. La regla base pasa a **dos clases** (especificidad 0,2,0), por lo que gana siempre:

```css
.contacto.contacto-simple {
  grid-template-columns: minmax(0, 1fr);
  /* ... */
}
```

2. El layout de 2 columnas se acota con `:not()` para que nunca aplique a la sección simple:

```css
@media (min-width: 701px) {
  .contacto:not(.contacto-simple) {
    grid-template-columns: minmax(220px, 0.8fr) minmax(280px, 1.2fr);
    /* ... */
  }
}
```

**Resultado verificado:** la sección queda centrada y usa todo el ancho en 320, 768, 1372 y 1440 px.

**Auditoría preventiva:** se revisaron todos los componentes en busca del mismo patrón
(elementos con 2+ clases de layout). `Contacto.jsx` era el **único** caso; el resto
(`.perfil`, `.seccion2`, `.tecno-logo`, `.educacion`, `.habilidades-blandas`, `.div-header`)
usa una sola clase de layout por elemento, por lo que no son susceptibles a este conflicto.

---

## 6. Proyectos con enlaces a demo y repositorio

Implementa la **sección sugerida #1** del reporte (`reporte_AlanG-z.md`, "Secciones sugeridas
para agregar"): los proyectos eran títulos + descripción, sin ningún enlace clicable a código
real — el criterio #1 de filtrado en screening.

### 6.1 Nuevo esquema de datos

`src/data/proyectos.js` pasa de 2 campos a 5:

```js
{
  titulo: 'Decisiones Aleatorias',
  descripcion: 'Aplicación web para resolver decisiones al azar de forma rápida: …',
  demo: 'https://desicion-aleatoria-ramdom.netlify.app/',
  repositorio: null,   // pendiente
  stack: [],           // pendiente
}
```

| Campo | Tipo | Descripción |
|---|---|---|
| `titulo` | `string` | Nombre del proyecto |
| `descripcion` | `string` | Texto descriptivo (se muestra en la tarjeta) |
| `demo` | `string \| null` | URL del deploy (Netlify/Vercel) |
| `repositorio` | `string \| null` | URL del código en GitHub |
| `stack` | `string[]` | Mini stack del proyecto (chips) |

### 6.2 Renderizado en `Proyectos.jsx`

- **Mini stack** → `<ul class="proyecto-stack">` con chips monoespaciados.
  Solo se renderiza si `stack.length > 0`.
- **Enlaces** → `<div class="proyecto-links">` con dos botones:
  - **Demo** — primario, fondo `var(--accent)`, icono de link externo.
  - **Código** — secundario, borde, icono de GitHub.
  - Solo se renderiza el botón si el campo correspondiente tiene valor.
- Accesibilidad: cada enlace lleva `target="_blank"`, `rel="noopener noreferrer"` y un
  `aria-label` descriptivo del tipo *"Ver la demo en vivo de {titulo} (se abre en una
  pestaña nueva)"*.
- El `<ul>` del stack lleva `aria-label="Tecnologías de {titulo}"`.

### 6.3 Estilos en `Proyectos.css`

- `.seccion` pasa a `display: flex; flex-direction: column` para que los enlaces se peguen al
  borde inferior con `margin-top: auto` — así quedan alineados entre tarjetas aunque tengan
  descripciones de largo muy distinto.
- `.proyecto-stack` + `.proyecto-stack__chip`: chips redondeados, `white-space: nowrap`.
- `.proyecto-links` + `.proyecto-link`: botones pill, hover con `translateY(-2px)` y
  `:focus-visible` con outline de 2px.

### 6.4 Estado de los datos

| Proyecto | Demo | Repo | Stack |
|---|---|---|---|
| Genesis | — | — | — |
| **Decisiones Aleatorias** | ✅ `desicion-aleatoria-ramdom.netlify.app` | — | — |
| Gestor de Tareas | — | — | — |

> **Pendiente de datos del autor**: URLs de GitHub y stacks reales de los 3 proyectos.
> No se inventaron valores. El componente ya soporta ambos campos: alcanza con completar
> `proyectos.js` y aparecen automáticamente.

**Nota**: el bot (`src/data/portfolioBot.js`) importa `proyectos` y mapea
`{ titulo, descripcion }`, así que la nueva descripción de "Decisiones Aleatorias" ya está
disponible para el asistente sin cambios adicionales.

**Verificado** en 320, 768 y 1372 px, en tema claro y oscuro.

---

## 7. Navegación móvil: hamburguesa + auto-ocultado

### 7.1 Centrado real del nav en desktop

Al meter el toggle de tema dentro del panel móvil, el wrapper `.header-menu` pasó a ser
`display: flex` con `justify-content: space-between` en desktop. Eso dejaba los links
**apelotonados a la izquierda** junto al logo: centrarlos respecto del espacio restante no es
lo mismo que centrarlos respecto del viewport, porque el logo y el toggle tienen anchos distintos.

Corrección — grilla de 3 columnas con el nav en la del medio, flanqueado por dos `1fr`:

```css
@media (min-width: 861px) {
  .div-header { grid-template-columns: 1fr auto 1fr; }

  .logo           { grid-column: 1; justify-self: start; }
  .header-menu    { display: contents; }   /* el wrapper deja de generar caja */
  .Header         { grid-column: 2; justify-self: center; }
  .header-actions { grid-column: 3; justify-self: end; }
}
```

`display: contents` hace que el `<ul>` y el toggle pasen a ser ítems de la grilla del header,
permitiendo que el nav quede en la columna central real. El wrapper es un `<div>` sin semántica,
así que no afecta el árbol de accesibilidad.

**Verificado** en 900, 1100 y 1440 px: el centro del nav coincide con el centro del viewport.

### 7.2 Botón hamburguesa

En pantallas de menos de 861 px los 6 links + el toggle de tema colapsan en un panel
desplegable. El toggle de tema **pasa a vivir dentro del menú** (antes estaba siempre visible
al lado del logo), así queda un único control en la fila superior.

`src/components/Header.jsx`:

- Estado `menuOpen` con `useState`.
- Botón `.header-toggle` con 3 barras que rotan a una **X** cuando está abierto
  (transición hecha con `:nth-child` + `transform`).
- El `<ul>` y el `.header-actions` se envuelven en un `.header-menu`, que en desktop vuelve a
  ser una fila (`flex-direction: row`) — por eso el DOM soporta ambas layouts sin duplicar nodos.
- Los links se generan desde un array `NAV_LINKS` (antes estaban escritos a mano en el JSX).
- Cada link hace `setMenuOpen(false)` al pulsarse.

Accesibilidad del botón:

```jsx
<button
  type="button"
  className="header-toggle"
  aria-expanded={menuOpen}
  aria-controls="header-menu"
  aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
>
```

- `aria-expanded` refleja el estado real.
- `aria-controls` apunta al panel.
- `aria-label` alterna entre "Abrir menú" / "Cerrar menú".
- **Escape** cierra el menú y devuelve el foco al botón (`toggleRef.current?.focus()`).
- Al cruzar a desktop (`matchMedia('(min-width: 861px)')`) el menú se cierra solo, para no
  quedar en un estado inconsistente tras un resize.

### 7.3 Ocultar al bajar / mostrar al subir

Nuevo hook **`src/hooks/useHideOnScroll.js`**:

```js
const MIN_SCROLL = 140       // por debajo de esto nunca se oculta
const DELTA_THRESHOLD = 8    // ignora micro-movimientos (rubber-banding / trackpad)

export function useHideOnScroll({ enabled = true } = {}) {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    if (!enabled) return undefined
    lastY.current = window.scrollY

    const onScroll = () => {
      const currentY = Math.max(window.scrollY, 0)
      const delta = currentY - lastY.current
      if (Math.abs(delta) < DELTA_THRESHOLD) return
      setHidden(delta > 0 && currentY > MIN_SCROLL)
      lastY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled])

  return hidden
}
```

Decisiones de diseño:

| Detalle | Motivo |
|---|---|
| `passive: true` | No bloquea el hilo principal mientras se scrollea |
| `DELTA_THRESHOLD = 8px` | Sin esto el header tiembla: el momentum de iOS y los trackpads finos generan eventos de 1-3 px |
| `MIN_SCROLL = 140px` | En la zona de lectura inicial el header nunca se oculta |
| `currentY > 0` con `Math.max` | Evita valores negativos del rubber-banding en iOS |
| `enabled: !menuOpen` | Con el menú abierto el header **nunca** se oculta (sería imposible cerrarlo) |
| `setState` fuera del `useEffect` | El `setHidden` ocurre dentro del listener, no en el cuerpo del efecto → sin warning `react(set-state-in-effect)` de oxlint |

CSS (`src/styles/Header.css`):

```css
.div-header {
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), /* … */
}
.div-header.is-hidden {
  transform: translateY(calc(-100% - 12px));
}
```

Como el header es `position: sticky`, el `transform` lo desliza fuera del viewport **sin
ocupar hueco en el flujo**: el contenido de abajo queda al borde superior.

Con `prefers-reduced-motion: reduce` se desactivan la transición del header y la animación
de apertura del panel.

### 7.4 Corrección del skip link (detectada al verificar)

Al probar con navegación por fragmento (`#proyectos`) apareció el botón "Saltar al contenido"
**flotando en la parte inferior de la pantalla**. El patrón original lo ocultaba con:

```css
transform: translateY(calc(-100% - 1.5rem));   /* ← frágil */
```

El porcentaje dentro de `translateY` se resolvió de forma inconsistente y el elemento quedaba
visible fuera de lugar. Se reemplazó por una técnica determinista, sin porcentajes ni `calc`:

```css
.skip-link {
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  opacity: 0;
  transform: translateY(-6px);
  pointer-events: none;
}

.skip-link:focus,
.skip-link:focus-visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

Se oculta con `opacity` y **no** con `visibility: hidden` ni `display: none`, porque cualquiera
de esos dos lo saca del orden de tabulación y rompería el skip link (que existe justamente para
poder receives focus con Tab).

**Verificado:** invisible con carga normal y con navegación por fragmento; aparece arriba al
recibir foco.

---

## 8. Verificación

### Comandos

| Comando | Resultado |
|---|---|
| `npm run lint` | ✅ 0 errores, 0 warnings (tras eliminar el warning `set-state-in-effect`) |
| `npm run build` | ✅ 56 módulos, sin errores |

### Tamaños del build

| Asset | Antes | Ahora |
|---|---|---|
| `index.css` | 38,08 KB (gzip 8,51 KB) | **32,84 KB** (gzip 7,12 KB) |
| `index.js` | 218,78 KB (gzip 72,85 KB) | 219,19 KB (gzip 72,98 KB) |
| Retrato | 1.452 KB (PNG) | **100,74 KB** (WebP) |
| Paquetes `node_modules` | 42 | **25** |

### Capturas verificadas

Renderizadas con Firefox headless y revisadas visualmente:

| Viewport | Verificación |
|---|---|
| 280 px | Header en 2 filas, sin desbordes; rol de texto envuelve correctamente |
| 320 px | Hamburguesa visible; secciones en 1 columna |
| 390 px | Hamburguesa cerrada; skip link invisible incluso con fragmento `#proyectos` |
| 496 px | Réplica de la referencia: header ~84px, foto centrada, composición intacta |
| 768 px | Hamburguesa ( breakpoint 861px); proyectos 2 col, herramientas 3 col |
| 1024 px | Hero 2 columnas desktop, footer correcto |
| 1372 px | **Contacto centrado** (regresión corregida, ver §5.1); resto de secciones correctas |
| 1440 px | Nav horizontal sin hamburguesa; layout desktop completo, tema oscuro sin destello |
| Estado menú abierto (320px) | X animado, 6 links apilados, toggle de tema a todo el ancho |
| Estado header oculto (390px y 1440px) | Se desliza fuera del viewport sin dejar hueco en el flujo (verificado con scroll programático) |
| Nav desktop (900 / 1100 / 1440 px) | Links centrados respecto del viewport, toggle a la derecha |
| Página completa (320, 768 y 1372) | Todas las secciones, Reveal, footer y chat flotante |

### Checks estáticos

- `@media (max-width)` en `src/`: **0 coincidencias** (mobile-first completo).
- `font-size: Npx` en `src/`: **0 coincidencias**.
- Referencias a Tailwind en CSS: solo el comentario del reset propio.
- `@media (prefers-reduced-motion)`: presente en `Header.css` (transiciones del panel) y en
  `effects.css`.

---

## 9. Archivos modificados

### Componentes y hooks
- `src/hooks/useHideOnScroll.js` — **nuevo**: oculta el header al bajar, muestra al subir
- `src/components/Header.jsx` — hamburguesa, panel desplegable, `Escape`, cierre en resize
- `src/App.jsx` — `<main>` correctamente anidado + `tabIndex`
- `src/components/Header.jsx` — skip link
- `src/components/Contacto.jsx` — GitHub real, `rel`, `aria-label`
- `src/components/PortfolioBot.jsx` — `useCallback`, `aria-expanded` dinámico, launcher siempre montado
- `src/components/Reveal.jsx` — estado declarativo, threshold, className limpio
- `src/components/SobreMi.jsx` — import WebP + dimensiones
- `src/hooks/useTheme.js` — `useLayoutEffect`

### Estilos
- `src/index.css` — reset propio + skip link + scroll-padding
- `src/App.css` — sin Tailwind
- `src/styles/Header.css`, `SobreMi.css`, `Proyectos.css`, `Tecnologias.css`,
  `Educacion.css`, `Habilidades.css`, `Contacto.css`, `PortfolioBot.css`, `Footer.css`

### Configuración y assets
- `vite.config.js` — plugin Tailwind eliminado
- `package.json` / `package-lock.json` — 2 dependencias eliminadas
- `src/assets/Perfil.webp` — nuevo (100 KB)
- `src/assets/Perfil.png` — borrado
- `src/assets/perfil2.png` — borrado
- `README.md` — reescrito

---

## 10. Pendiente (requiere decisión o contenido del autor)

Estos puntos del reporte **no se pueden resolver con código** y quedan documentados:

1. **Historial de commits** — 5 commits con mensajes débiles ("Creo que termine", "cv"). El
   reporte lo señala como "no evaluable" por posible squash/force-push. Requiere rehacer el
   historial de forma deliberada; no se tocó ningún commit.
2. **Secciones de contenido sugeridas** (requieren información real del autor):
   - ~~Proyectos con enlaces a repositorio y demo en vivo.~~ → **implementado** (§6);
     faltan los datos de GitHub y stack de los 3 proyectos.
   - Sección "Proceso" / estudio de caso con métricas.
   - Sección "Escritura" / blog técnico.
   - Testimoniales o "con quién trabajé".
   - Sección "Open source" con badges de impacto.
   - Narrativa "Acerca de mí" de 5–7 líneas.
   - Bloque "Cómo evaluar este trabajo" (meta) apuntando al `llmClient.js` y al patrón de proxy.
3. **Verificaciones en vivo** — React DevTools / Profiler (R-42/R-46) y despliegue (R-47)
   requieren un entorno con las herramientas abiertas; no automatizables desde el repo.

---

*Documento generado aplicando los hallazgos de `reporte_AlanG-z.md`. Verificado con build,
lint y revisión visual en 7 viewports.*

---

## Anexo — estado del repositorio al momento de esta actualización

- Commit `aa63983` "Correcciones del reporte" contiene todo lo documentado en las secciones 1–5.
- Las secciones 6–7 de este documento corresponden a cambios **posteriores**, aún sin commitear.
- El autor tiene trabajo en curso en paralelo sobre el chatbot (`src/data/secciones.js`,
  `scripts/start-bot.sh`, `system_prompt.txt`, `services/llmClient.js`, `vite.config.js`),
  que **no fue modificado** por esta actualización.

### Inconsistencia detectada (no corregida, por ser trabajo en curso del autor)

Al renombrar "SearchMyCar" → "Decisiones Aleatorias" en `src/data/proyectos.js`, quedaron
keywords obsoletas en `src/data/secciones.js` (líneas 59-61), que usa el bot para detectar
intención:

```js
{
  id: 'proyectos',
  keywords: ['proyectos', 'proyecto', 'genesis', 'estacione', 'estacionamiento', 'aplicacion'],
}
```

- `estacione` / `estacionamiento` ya no matchean nada (el proyecto fue reemplazado).
- Falta keyword para el proyecto actual (`decisiones`, `aleatoria`, `azar`, `random`).
- `portfolioBot.js` **no** está afectado: matchea por `titulo` contra el array `proyectos`.