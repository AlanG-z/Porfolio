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

## 6. Verificación

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
| 320 px | Header 2 filas, nav 3 columnas, todas las secciones en 1 columna |
| 496 px | Réplica de la referencia: header ~84px, foto centrada, composición intacta |
| 768 px | Header compacto, hero centrado, proyectos 2 col, herramientas 3 col |
| 1024 px | Hero 2 columnas desktop, footer correcto |
| 1372 px | **Contacto centrado** (regresión corregida, ver §5.1); resto de secciones correctas |
| 1440 px | Layout desktop completo, tema oscuro sin destello |
| Página completa (320, 768 y 1372) | Todas las secciones, Reveal, footer y chat flotante |

### Checks estáticos

- `@media (max-width)` en `src/`: **0 coincidencias** (mobile-first completo).
- `font-size: Npx` en `src/`: **0 coincidencias**.
- Referencias a Tailwind en CSS: solo el comentario del reset propio.

---

## 7. Archivos modificados

### Componentes y hooks
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

## 8. Pendiente (requiere decisión o contenido del autor)

Estos puntos del reporte **no se pueden resolver con código** y quedan documentados:

1. **Historial de commits** — 5 commits con mensajes débiles ("Creo que termine", "cv"). El
   reporte lo señala como "no evaluable" por posible squash/force-push. Requiere rehacer el
   historial de forma deliberada; no se tocó ningún commit.
2. **Secciones de contenido sugeridas** (requieren información real del autor):
   - Proyectos con enlaces a repositorio y demo en vivo.
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