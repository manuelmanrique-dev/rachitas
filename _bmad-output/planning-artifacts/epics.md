---
stepsCompleted: ['step-01', 'step-02', 'step-03', 'step-04']
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
---

# primer-bmad - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for primer-bmad, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: El usuario puede registrarse con email y contraseña
- FR2: El usuario puede registrarse con login social (Google, GitHub)
- FR3: El usuario puede iniciar sesión desde cualquier dispositivo y acceder a sus datos sincronizados
- FR4: El usuario puede cerrar sesión
- FR5: El usuario puede ver sus datos personales en su perfil
- FR6: El usuario puede eliminar su cuenta y todos sus datos de forma permanente, con confirmación explícita
- FR7: El sistema elimina todos los datos del usuario del servidor y del almacenamiento local al confirmar la eliminación
- FR8: El usuario puede iniciar una conversación con el agente IA desde la pantalla principal
- FR9: El agente guía al usuario en un onboarding conversacional para diseñar su primer hábito
- FR10: El agente estructura automáticamente los datos del hábito (señal, rutina, recompensa) a partir de la conversación, sin formularios
- FR11: El agente interactúa con los datos de la aplicación (hábitos, registros, objetivos) mediante un framework agéntico con herramientas definidas como contratos
- FR12: El agente puede crear, modificar y consultar hábitos del usuario como resultado de la conversación
- FR13: El agente nunca usa frases imperativas negativas ("deberías", "tienes que"), nunca menciona días perdidos como fracaso, y siempre ofrece una alternativa antes de señalar un fallo
- FR14: El agente advierte cuando el usuario configura un hábito con frecuencia diaria, intensidad alta y sin historial previo, y sugiere alternativas progresivas
- FR15: El agente da la bienvenida al usuario que vuelve tras una ausencia sin mencionar días sin uso, sin contadores de ausencia visibles, y con tono positivo orientado al futuro
- FR16: El usuario puede invocar al agente bajo demanda en cualquier momento (botón "Inspírame" o similar)
- FR17: El agente utiliza el framework de Hábitos Atómicos como base para guiar la reflexión
- FR18: El usuario puede crear un hábito nuevo (con o sin asistencia del agente)
- FR19: El usuario puede editar los datos de un hábito existente
- FR20: El usuario puede eliminar un hábito
- FR21: El usuario puede configurar la frecuencia de un hábito (diario, semanal X de 7, mensual, personalizada)
- FR22: El usuario puede asignar un modo de dificultad a un hábito: Normal (acumulativo) o Difícil (resta sin resetear)
- FR23: El usuario puede cambiar el modo de dificultad de un hábito en cualquier momento sin penalización
- FR24: El usuario puede ver un resumen de sus hábitos activos con su estado actual
- FR25: El usuario puede registrar el cumplimiento de un hábito de forma binaria (sí/no)
- FR26: El usuario puede registrar el cumplimiento de un hábito con valor cuantificable
- FR27: El usuario puede añadir una nota opcional al registrar un hábito
- FR28: El usuario puede registrar un hábito con un solo tap desde la vista principal
- FR29: El sistema calcula y muestra la racha actual adaptada a la frecuencia configurada del hábito
- FR30: El sistema aplica la lógica del modo de dificultad seleccionado al calcular rachas (Normal: acumulativo; Difícil: resta sin resetear)
- FR31: El usuario puede ver un heatmap estilo GitHub con gradientes de intensidad para cada hábito
- FR32: El sistema muestra las ausencias como espacio vacío en el heatmap, no como fracaso marcado
- FR33: El usuario puede registrar hábitos sin conexión a internet
- FR34: El sistema sincroniza automáticamente los datos locales con el servidor al recuperar conexión
- FR35: El sistema mantiene el servidor como fuente de verdad para resolver conflictos de sincronización
- FR36: El usuario puede acceder a sus datos desde múltiples dispositivos con sincronización automática
- FR37: El usuario puede instalar la aplicación en la pantalla de inicio de su dispositivo
- FR38: La aplicación se ejecuta en pantalla completa (display: standalone), muestra splash screen al iniciar, y tiene iconos en la pantalla de inicio del dispositivo
- FR39: La aplicación carga y es funcional para registro de hábitos cuando no hay conexión
- FR40: El administrador puede acceder a métricas básicas de uso a través del panel de administración del backend
- FR41: El administrador puede gestionar usuarios (visualizar, banear) a través del panel de administración del backend

### NonFunctional Requirements

- NFR1: Las acciones de registro de hábitos (tap) se reflejan en la UI en menos de 100ms, independientemente del estado de conexión
- NFR2: La pantalla principal con hábitos activos carga en menos de 2 segundos en primera visita, menos de 1 segundo en visitas posteriores (cache)
- NFR3: El heatmap renderiza datos de hasta 12 meses sin degradación perceptible de rendimiento
- NFR4: Las respuestas del agente IA comienzan a llegar en menos de 5 segundos (tiempo hasta primer token cuando se implemente streaming)
- NFR5: La sincronización offline-to-online se ejecuta en background y no incrementa la latencia de interacción de la UI en más de 50ms
- NFR6: Todos los datos se transmiten cifrados (HTTPS/TLS en tránsito)
- NFR7: Los datos en el servidor están cifrados en reposo (cifrado nativo de la base de datos)
- NFR8: Las API keys de IA del usuario (BYO-AI, post-MVP) nunca se almacenan en el servidor — solo en el dispositivo del usuario
- NFR9: Las sesiones de autenticación expiran tras inactividad prolongada (configurable, default 30 días)
- NFR10: El backend implementa aislamiento de datos a nivel de fila (Row Level Security) que garantiza que un usuario solo accede a sus propios datos
- NFR11: El flujo de eliminación de cuenta borra irreversiblemente todos los datos del usuario en menos de 24 horas (cumplimiento GDPR derecho al olvido)
- NFR12: Las conversaciones con el agente IA se tratan como datos personales sensibles — misma protección que el resto de datos del usuario
- NFR13: No se comparten datos de usuario con terceros. Los prompts enviados al modelo IA no incluyen datos identificables de otros usuarios
- NFR14: La arquitectura soporta hasta 1,000 usuarios activos mensuales sin cambios de infraestructura ni de tier de servicio
- NFR15: El modelo de datos y la service layer permiten migrar de un proveedor de IA a otro sin reescribir lógica de negocio
- NFR16: El almacenamiento local mantiene tiempos de consulta inferiores a 200ms con hasta 2 años de datos de hábitos por usuario
- NFR17: La aplicación cumple WCAG 2.1 Nivel A en todas las vistas del MVP
- NFR18: Toda la interfaz es navegable por teclado con focus visible
- NFR19: Todo elemento visual informativo tiene texto alternativo o equivalente textual
- NFR20: El contraste mínimo de texto es 3:1 (Nivel A), con preparación para 4.5:1 (Nivel AA) en Growth
- NFR21: La interfaz conversacional usa texto como medio primario de interacción, sin dependencia de elementos exclusivamente visuales para transmitir información
- NFR22: El framework agéntico abstrae la comunicación con modelos IA detrás de una interfaz uniforme, permitiendo cambiar de proveedor de LLM sin modificar lógica de negocio
- NFR23: La integración con el modelo IA gestiona errores de red, timeouts y respuestas malformadas sin crashear la aplicación — el usuario recibe un mensaje de error visible en menos de 2 segundos
- NFR24: Las herramientas del framework agéntico están definidas como contratos explícitos con validación de entrada y salida
- NFR25: La latencia añadida por el framework agéntico (procesamiento de tool calls) no supera los 500ms sobre el tiempo de respuesta del modelo IA
- NFR26: El sistema de autenticación soporta al menos 2 proveedores de identidad (email + 1 social) con flujo unificado
- NFR27: La sincronización almacenamiento local ↔ servidor implementa cola de reintentos para operaciones fallidas, con máximo 3 reintentos y backoff exponencial
- NFR28: El sistema de integración con IA registra métricas de uso (tokens consumidos, latencia, errores) accesibles desde el panel de administración del backend para monitoreo de costes
- NFR29: Si el servicio de IA externo no está disponible, la app sigue siendo funcional para crear hábitos, registrar cumplimiento y consultar el heatmap
- NFR30: Las herramientas del framework agéntico se pueden añadir o modificar sin necesidad de redesplegar la aplicación completa

### Additional Requirements

- La arquitectura especifica un **starter template**: `pnpm dlx shadcn@latest init -t vite` como base del proyecto, con post-instalación de React Router 7, vite-plugin-pwa, Workbox y Vitest
- Configurar **Supabase** como backend: schema PostgreSQL, RLS policies (`auth.uid() = user_id` en todas las tablas), auth providers (email + Google OAuth), CASCADE DELETE para GDPR
- Configurar **Dexie.js** como almacenamiento local: schema local espejo, instancia singleton, `useLiveQuery()` reactivo
- **Service layer** como única puerta de acceso a datos: funciones puras sin estado, transformación snake_case → camelCase en este nivel
- **Estructura feature-based**: `features/{auth,habits,agent,sync}` con componentes, hooks y tipos co-locados, barrel exports por feature
- **TanStack Query** para server state con key convention `[feature, entity, ...params]`, optimistic updates para tap <100ms
- **Zustand** para UI state: stores por dominio (`useAgentStore`, `useUIStore`, `useSyncStore`)
- **LLM Adapter pattern** (Port/Adapter): interfaz uniforme `sendMessage`/`streamMessage`, proxy via Supabase Edge Functions con rate limiting y métricas
- **Tool contracts del agente MVP**: `createHabit`, `getHabits`, `getHabitRecords`, `updateHabit`, `deleteHabit` — schemas Zod con validación entrada/salida
- **Validación con Zod**: schemas compartidos entre tool contracts, formularios y API
- **Tipo de error uniforme**: `AppError` con `code`, `message`, `details`
- **ErrorBoundary por feature**, no global
- **Naming conventions**: snake_case BD, camelCase TS, PascalCase componentes, kebab-case archivos no-componentes, kebab-case rutas URL
- **Tests co-locados** junto a cada archivo que testean
- **CI/CD con GitHub Actions**: lint + type-check + tests en PR, deploy en merge a main
- **Hosting en Cloudflare Pages** (SPA estático, free tier)
- **3 environments**: local (Supabase Docker), preview (Cloudflare preview deploys por PR), production (Cloudflare Pages main)
- **Modelo de datos**: User (Supabase Auth) → Habit, HabitRecord, Conversation → Message, UserProfile
- **Secuencia de implementación** definida: scaffold → Supabase → Dexie.js → service layer → UI features → agent framework → chat UI → PWA polish
- **Boundaries arquitectónicos**: UI↔Services (nunca acceso directo a Supabase/Dexie desde componentes), Agent↔Datos (solo vía tool contracts), Local↔Remoto (sync-engine como único puente), LLM Provider (solo vía adapters)

### UX Design Requirements

- UX-DR1: Implementar **sistema de design tokens semánticos** completo: 20+ tokens de color (surface, text, accent, heatmap, border, state, focus), tokens de tipografía (7 tamaños, 4 pesos, 3 line-heights), tokens de espaciado (base 4px, 10 niveles), tokens de forma (5 radius, 3 shadows), tokens de animación (4 duraciones, 2 easings)
- UX-DR2: Implementar **tema Tierra Cálida** con valores hex específicos para light y dark mode — incluyendo todos los pares de tokens definidos, validación WCAG AA (4.5:1) en todos los pares texto/fondo
- UX-DR3: Implementar **componente HabitHeatmap**: SVG grid estilo GitHub, 3 variantes (completo 12 meses, compacto 8-12 semanas, inline 4 semanas), 5 estados de celda con gradientes, scroll horizontal en mobile, `role="grid"` + ARIA labels por celda, navegación por teclado, tap en celda muestra tooltip con detalle
- UX-DR4: Implementar **componente ChatBubble**: 2 variantes (agent izquierda con avatar, user derecha sin avatar), 3 estados (enviado, streaming, error), backgrounds diferenciados por tokens, esquinas asimétricas, `role="listitem"`, texto seleccionable
- UX-DR5: Implementar **componente ChatInput**: textarea multi-línea auto-expandible (max 4 líneas), 4 estados (vacío, escribiendo, enviando, agente no disponible), Enter envía / Shift+Enter nueva línea, touch target 44x44px en botón, `aria-label` y focus automático
- UX-DR6: Implementar **componente HabitCheckbox**: micro-celebración al marcar (color `--color-accent-celebration` + animación bounce + vibración háptica 50ms), 4 estados (unchecked, checking transición, checked, unchecking), `prefers-reduced-motion` respetado, touch target 44x44px, hereda accesibilidad Radix
- UX-DR7: Implementar **componente HabitCard**: tarjeta resumen inline en chat con campos señal/rutina/recompensa/frecuencia/modo, 3 estados (propuesta con botones, confirmada con celebración, ajustando), 2 variantes (creación en chat, resumen en detalle), `role="region"` + navegación por teclado
- UX-DR8: Implementar **componente AgentTypingIndicator**: avatar + 3 puntos con bounce secuencial (delay 0.2s), transición a ChatBubble al recibir respuesta, `aria-live="polite"` anuncio único, `prefers-reduced-motion` → opacidad pulsante estática
- UX-DR9: Implementar **componente SyncIndicator**: 4 estados (sincronizado nube+tic 2s, sincronizando nube+spinner, offline nube+X persistente, error nube+!), ubicación header derecha, `aria-live="polite"` para cambios
- UX-DR10: Implementar **componente HabitDetailView**: edición inline de todos los campos (tap ✏️ → input → blur guarda → tic confirmación → Escape cancela), heatmap compacto individual, botón "Hablar con Pepito sobre este hábito" que precarga contexto, opción archivar con confirmación, navegación Tab entre campos
- UX-DR11: Implementar **componente HabitCreateForm**: formulario con campos nombre*/señal/rutina*/recompensa/frecuencia/modo, tooltips educativos "?" progresivos (visibles 0-3 hábitos, ocultos 4+), placeholders educativos en español, defaults (diario, Normal), validación al submit, `aria-required` + `aria-describedby`
- UX-DR12: Implementar **componente EducationalTooltip**: icono ⓘ trigger, expansión inline bajo el campo con animación, colapso automático al escribir o tap fuera, lógica de visibilidad progresiva (0-3 hábitos → visible, 4+ → oculto con fallback enlace), `aria-expanded` + `aria-controls`
- UX-DR13: Implementar **navegación plana con tab bar de 3 elementos** (Hábitos, Pepito, Perfil): fija en bottom 56px, icono+label coloreados para activo/inactivo, touch target 1/3 ancho, estado de scroll preservado al cambiar de tab, oculta con teclado virtual, `role="navigation"` + `aria-current="page"`
- UX-DR14: Implementar **layout responsive mobile-first**: 3 breakpoints (base 0-639px single column, sm 640px max-width centrado, lg 1024px dos columnas dashboard/detalle), header fijo 48px, tab bar fija 56px, padding lateral `--space-4`, max-width chat ~600px en desktop
- UX-DR15: Implementar **jerarquía de botones** consistente: Primary (relleno accent, max 1 por vista), Secondary (borde, acciones alternativas), Ghost (sin borde, terciarias). Acciones destructivas nunca Primary. Estados: default, hover, active, focus, disabled, loading
- UX-DR16: Implementar **patrones de feedback**: celebración multi-sensorial al registrar (color+animación+háptica), feedback de estado (skeleton/offline/typing/enviando), feedback de error (warning suave, retry, toast 4s). Nunca feedback por ausencia de registro
- UX-DR17: Implementar **patrones de formulario**: validación al submit (no mientras escribe), errores con borde warning + mensaje neutro debajo, labels encima del campo, "(opcional)" en campos no requeridos, edición inline en detalle de hábito
- UX-DR18: Implementar **empty states como invitaciones**: sin hábitos → "Tu viaje empieza aquí", chat vacío → "Tu Pepito Grillo está listo", heatmap vacío → grid neutral sin texto, sin IA → mensaje informativo + botón configurar
- UX-DR19: Implementar **patrones de interacción human-in-the-loop del agente**: confirmación explícita con botones para crear/modificar/eliminar hábitos, tarjeta visual inline en chat, el agente nunca modifica datos sin confirmación
- UX-DR20: Implementar **accesibilidad WCAG 2.1 AA**: contraste 4.5:1 texto normal, focus visible en todos los interactivos (`--color-focus-ring`), skip link "Saltar al contenido", `prefers-reduced-motion` respetado, HTML semántico primero + ARIA complementario, touch targets 44x44px, `touch-action: manipulation`, `viewport-fit=cover`
- UX-DR21: Implementar **tipografía con fuente redondeada y friendly**: terminaciones redondeadas, soporte completo caracteres latinos con acentos, variable font preferida, escala Major Third (~1.25 ratio), 7 niveles de tamaño, unidades `rem`
- UX-DR22: Implementar **flujo de onboarding** con dos vías: (1) conversacional con agente IA (3-5 intercambios → tarjeta resumen → confirmación) y (2) formulario con educación pasiva si IA no disponible — sin tutoriales, sin slides, sin "paso 1 de 5"
- UX-DR23: Implementar **flujo de eliminación de cuenta GDPR**: pantalla perfil > datos, mensaje de advertencia, lista de lo que se elimina, campo "ELIMINAR" para confirmar, borrado Supabase + Dexie + caches + service worker, mensaje de despedida, redirect a landing

### FR Coverage Map

- FR1: Epic 2 — Registro con email y contraseña
- FR2: Epic 2 — Registro con login social (Google, GitHub)
- FR3: Epic 2 — Login multi-dispositivo con datos sincronizados
- FR4: Epic 2 — Cerrar sesión
- FR5: Epic 2 — Ver datos personales en perfil
- FR6: Epic 2 — Eliminar cuenta con confirmación explícita
- FR7: Epic 2 — Borrado completo de datos servidor + local
- FR8: Epic 6 — Iniciar conversación con agente IA
- FR9: Epic 6 — Onboarding conversacional para primer hábito
- FR10: Epic 6 — Estructurar hábito desde conversación sin formularios
- FR11: Epic 6 — Framework agéntico con tool contracts
- FR12: Epic 6 — Crear, modificar y consultar hábitos vía conversación
- FR13: Epic 6 — Tono empático sin frases imperativas negativas
- FR14: Epic 6 — Advertencia de hábitos poco realistas
- FR15: Epic 6 — Bienvenida tras ausencia sin culpa
- FR16: Epic 6 — Invocar agente bajo demanda
- FR17: Epic 6 — Framework de Hábitos Atómicos como base
- FR18: Epic 3 — Crear hábito nuevo (con o sin agente)
- FR19: Epic 3 — Editar datos de hábito existente
- FR20: Epic 3 — Eliminar hábito
- FR21: Epic 3 — Configurar frecuencia (diario, semanal, mensual, personalizada)
- FR22: Epic 3 — Asignar modo de dificultad (Normal/Difícil)
- FR23: Epic 3 — Cambiar modo de dificultad sin penalización
- FR24: Epic 3 — Ver resumen de hábitos activos
- FR25: Epic 4 — Registro binario de hábito (sí/no)
- FR26: Epic 4 — Registro con valor cuantificable
- FR27: Epic 4 — Nota opcional al registrar
- FR28: Epic 4 — Registro con un solo tap desde vista principal
- FR29: Epic 4 — Racha adaptada a frecuencia configurada
- FR30: Epic 4 — Lógica de rachas por modo de dificultad
- FR31: Epic 4 — Heatmap estilo GitHub con gradientes
- FR32: Epic 4 — Ausencias como espacio vacío, no fracaso
- FR33: Epic 5 — Registrar hábitos sin conexión
- FR34: Epic 5 — Sincronización automática al recuperar conexión
- FR35: Epic 5 — Servidor como fuente de verdad para conflictos
- FR36: Epic 5 — Acceso multi-dispositivo con sync automática
- FR37: Epic 1 — Instalar app en pantalla de inicio
- FR38: Epic 1 — Display standalone, splash screen, iconos
- FR39: Epic 1 — App funcional offline para registro de hábitos
- FR40: Epic 7 — Métricas básicas de uso vía panel backend
- FR41: Epic 7 — Gestión de usuarios (visualizar, banear) vía panel backend

## Epic List

### Epic 1: Fundación del Proyecto y PWA Instalable
El usuario puede instalar la app en su dispositivo y ver una interfaz base funcional con la identidad visual de Primer (tema Tierra Cálida, navegación, layout responsive).
**FRs cubiertos:** FR37, FR38, FR39
**UX-DRs:** UX-DR1, UX-DR2, UX-DR13, UX-DR14, UX-DR15, UX-DR20, UX-DR21

### Epic 2: Identidad de Usuario y Gestión de Cuenta
El usuario puede registrarse, iniciar sesión, ver su perfil y eliminar su cuenta con borrado completo GDPR.
**FRs cubiertos:** FR1, FR2, FR3, FR4, FR5, FR6, FR7
**UX-DRs:** UX-DR17, UX-DR18, UX-DR23
**NFRs clave:** NFR6, NFR7, NFR9, NFR10, NFR11, NFR26

### Epic 3: Gestión de Hábitos
El usuario puede crear, editar y eliminar hábitos con frecuencia configurable y modos de dificultad, viendo un resumen de sus hábitos activos en el dashboard.
**FRs cubiertos:** FR18, FR19, FR20, FR21, FR22, FR23, FR24
**UX-DRs:** UX-DR10, UX-DR11, UX-DR12, UX-DR17, UX-DR18

### Epic 4: Registro de Hábitos y Visualización de Progreso
El usuario puede registrar hábitos con un solo tap, ver rachas calculadas según modo/frecuencia, y visualizar su progreso en un heatmap emocional sin castigo.
**FRs cubiertos:** FR25, FR26, FR27, FR28, FR29, FR30, FR31, FR32
**UX-DRs:** UX-DR3, UX-DR6, UX-DR16

### Epic 5: Sincronización Offline y Multi-dispositivo
El usuario puede registrar hábitos sin conexión y acceder a sus datos desde múltiples dispositivos con sincronización automática transparente.
**FRs cubiertos:** FR33, FR34, FR35, FR36
**UX-DRs:** UX-DR9
**NFRs clave:** NFR5, NFR14, NFR27

### Epic 6: Agente IA — Pepito Grillo
El usuario puede conversar con un agente IA empático que guía el diseño de hábitos mediante conversación, interactúa con datos de la app vía tool contracts, y acompaña sin juzgar.
**FRs cubiertos:** FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17
**UX-DRs:** UX-DR4, UX-DR5, UX-DR7, UX-DR8, UX-DR19, UX-DR22
**NFRs clave:** NFR4, NFR12, NFR13, NFR15, NFR22, NFR23, NFR24, NFR25, NFR28, NFR29, NFR30

### Epic 7: Administración y Monitoreo
El administrador puede acceder a métricas de uso y gestionar usuarios desde el panel de Supabase Dashboard.
**FRs cubiertos:** FR40, FR41
**NFRs clave:** NFR28

---

## Epic 1: Fundación del Proyecto y PWA Instalable

El usuario puede instalar la app en su dispositivo y ver una interfaz base funcional con la identidad visual de Primer (tema Tierra Cálida, navegación, layout responsive).

### Story 1.1: Inicializar Proyecto con Starter Template y Tooling

As a **developer**,
I want to scaffold the project using the architecture-defined starter template with testing, linting and CI/CD configured,
So that I have a reproducible, tested development environment from day one.

**Acceptance Criteria:**

**Given** no existing project directory
**When** I run the initialization commands (`pnpm dlx shadcn@latest init -t vite`)
**Then** a Vite 8 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui project is created
**And** React Router 7 is installed and configured (Framework mode, `ssr: false`)
**And** Vitest + React Testing Library + jest-dom are configured with a passing sample test
**And** the feature-based directory structure is created (`features/{auth,habits,agent,sync}`, `services/`, `lib/`, `stores/`, `app/routes/`)
**And** ESLint + TypeScript strict mode are configured
**And** GitHub Actions CI pipeline runs lint + type-check + tests on PR
**And** `pnpm dev` starts the dev server with HMR
**And** `pnpm test` runs Vitest in watch mode

### Story 1.2: Design Tokens, Tema Tierra Cálida y Tipografía

As a **user**,
I want the app to have a visual identity cálida y acogedora with consistent colors, typography and spacing,
So that the experience feels like a safe, warm space — not a cold productivity tool.

**Acceptance Criteria:**

**Given** the scaffolded project from Story 1.1
**When** I open the application
**Then** the Tierra Cálida theme is applied with all semantic color tokens defined in CSS custom properties (20+ color tokens for surface, text, accent, heatmap, border, state, focus)
**And** light mode is the default, dark mode activates with `prefers-color-scheme: dark` or `.dark` class
**And** all color token values match the UX spec exactly (light: `#faf6f0` primary surface, `#c8873e` accent; dark: `#1c1712` primary surface, `#daa04d` accent)
**And** typography tokens are defined (7 sizes from 12px to 30px, Major Third ratio ~1.25, 4 weights, 3 line-heights)
**And** a rounded, friendly font is loaded (variable font, latin-ext support for Spanish accents)
**And** spacing tokens are defined (base 4px, 10 levels from 4px to 64px)
**And** shape tokens are defined (5 border-radius, 3 shadows)
**And** animation tokens are defined (4 durations, 2 easings)
**And** all text/background pairs meet WCAG AA contrast (4.5:1 for normal text) in both light and dark mode
**And** shadcn/ui components use the custom tokens instead of defaults

### Story 1.3: Layout Responsive con Navegación Tab Bar

As a **user**,
I want to navigate the app with a clear tab bar (Hábitos, Pepito, Perfil) and see content adapt to my device,
So that I can find everything with one tap on any screen size.

**Acceptance Criteria:**

**Given** the themed project from Story 1.2
**When** I open the app on a mobile device (320-639px)
**Then** I see a fixed header (48px) and a fixed tab bar at the bottom (56px) with 3 tabs: Hábitos, Pepito, Perfil
**And** the active tab shows icon + label in `--color-accent-primary`, inactive tabs in `--color-text-muted`
**And** each tab touch target is 1/3 of screen width × 56px minimum
**And** tapping a tab switches the content view without page reload
**And** scroll position is preserved when switching between tabs and returning
**And** content area uses single column layout with `--space-4` (16px) padding

**Given** the app is open on a tablet (640-1023px)
**When** I view any screen
**Then** content is centered with max-width and `--space-6` (24px) padding

**Given** the app is open on desktop (1024px+)
**When** I view the app
**Then** content is centered with max-width ~960px
**And** the tab bar remains at the bottom (not converted to sidebar)

**Given** keyboard navigation
**When** I press Tab/Shift+Tab
**Then** focus moves between tabs with visible focus ring (`--color-focus-ring`)
**And** Enter/Space activates the focused tab
**And** a skip link "Saltar al contenido" is available on focus

**Given** the tab bar is visible
**When** a virtual keyboard opens on mobile
**Then** the tab bar hides to maximize content area

**And** routes are configured: `/` (Hábitos), `/chat` (Pepito), `/profile` (Perfil)
**And** `role="navigation"` and `aria-current="page"` are set on the active tab

### Story 1.4: PWA Instalable con Service Worker y Offline Shell

As a **user**,
I want to install the app on my homescreen and see it load like a native app even without connection,
So that Primer feels like my own personal space on my device, always available.

**Acceptance Criteria:**

**Given** I visit the app in Chrome on Android or Safari on iOS (16.4+)
**When** I use the browser's "Add to Home Screen" or the PWA install prompt
**Then** the app installs with the correct name, icon (192x192 and 512x512), and splash screen

**Given** the app is installed on my homescreen
**When** I open it
**Then** it launches in standalone mode (no browser chrome) with `display: standalone`
**And** the splash screen shows while the app initializes

**Given** I open the installed app without internet connection
**When** the app loads
**Then** I see the complete app shell (header, tab bar, empty content areas with placeholder messages) cached and functional
**And** the SyncIndicator shows offline state (nube + X in `--color-state-warning`)

**Given** the PWA configuration
**When** I inspect the setup
**Then** `manifest.json` is configured with correct name, icons, theme_color, background_color, display: standalone
**And** vite-plugin-pwa + Workbox are configured with cache-first for static assets and network-first for data
**And** the service worker precaches the app shell (HTML, CSS, JS, fonts)

## Epic 2: Identidad de Usuario y Gestión de Cuenta

El usuario puede registrarse, iniciar sesión, ver su perfil y eliminar su cuenta con borrado completo GDPR.

### Story 2.1: Registro e Inicio de Sesión con Email

As a **new user**,
I want to register with my email and password and then log in from any device,
So that I can access my personal space in Primer securely.

**Acceptance Criteria:**

**Given** I am on the login page without an account
**When** I tap "Crear cuenta" and enter a valid email and password (min 8 characters)
**Then** my account is created in Supabase Auth
**And** a verification email is sent in background (does not block the flow)
**And** I am redirected to the app's main screen immediately

**Given** I have an existing account
**When** I enter my email and password on the login page
**Then** I am authenticated and see the Hábitos tab with my data

**Given** I enter invalid credentials
**When** I submit the login form
**Then** I see a neutral error message in `--color-state-warning` below the field: "Email o contraseña incorrectos"
**And** the form follows UX-DR17 patterns: labels above fields, validation on submit only, "(opcional)" on optional fields

**Given** I am not authenticated
**When** I try to access any app route
**Then** I am redirected to the login page

**And** Supabase project is configured with email auth provider enabled
**And** PostgreSQL schema includes `user_profiles` table with RLS policy `auth.uid() = user_id`
**And** Dexie.js local database is initialized with user-scoped schema
**And** `auth-service.ts` wraps Supabase Auth with `AppError` error handling
**And** all data transmission uses HTTPS/TLS (NFR6)

### Story 2.2: Registro e Inicio de Sesión con Google OAuth

As a **new user**,
I want to register or log in with my Google account in one tap,
So that I can start using Primer without creating yet another password.

**Acceptance Criteria:**

**Given** I am on the login/register page
**When** I tap the "Continuar con Google" button
**Then** the Google OAuth flow opens (popup or redirect)
**And** on success, my account is created (if new) or I am logged in (if existing)
**And** I am redirected to the main app screen

**Given** I previously registered with email and now try Google with the same email
**When** the OAuth flow completes
**Then** the accounts are linked (Supabase handles this) and I can log in with either method

**Given** the Google OAuth flow fails or I cancel it
**When** I return to the app
**Then** I see a neutral message: "No se pudo completar el acceso con Google" and can try again or use email

**And** Supabase Auth has Google OAuth provider configured (NFR26: at least 2 identity providers)
**And** the login page shows both options (email form + Google button) without hierarchy preference

### Story 2.3: Perfil de Usuario y Cierre de Sesión

As a **logged-in user**,
I want to see my profile information and log out when I want,
So that I have control over my account and can switch devices.

**Acceptance Criteria:**

**Given** I am authenticated and on the Perfil tab
**When** the profile view loads
**Then** I see my display name (or email if no name set), email address, and account creation date
**And** I see sections for: "Tu cuenta", "Tus datos", "Configuración" (placeholder for future IA config)

**Given** I am on the profile view
**When** I tap "Cerrar sesión"
**Then** my Supabase session is terminated
**And** I am redirected to the login page
**And** local Dexie.js data is preserved (will re-sync on next login)

**Given** the profile page with no data yet (new user)
**When** I view the page
**Then** empty states show warm invitation text (UX-DR18): sections are present but indicate "Aún no hay datos"

**And** `user-service.ts` provides profile read operations via service layer
**And** session expiry is configured at 30 days of inactivity (NFR9)

### Story 2.4: Eliminación de Cuenta y Datos (GDPR)

As a **user who wants to leave**,
I want to permanently delete my account and all my data with a clear, respectful process,
So that I know my personal information is completely erased — no hidden data, no retention tricks.

**Acceptance Criteria:**

**Given** I am on Perfil > Tus datos
**When** I tap "Eliminar mi cuenta y datos"
**Then** I see a clear warning: "Esto eliminará permanentemente todos tus datos: hábitos, registros, conversaciones con el agente, y tu cuenta. Esta acción no se puede deshacer."
**And** a list shows exactly what will be deleted (hábitos, registros, conversaciones, perfil, cuenta)

**Given** the elimination warning is displayed
**When** I type "ELIMINAR" in the confirmation field
**Then** the "Eliminar cuenta" button activates (was disabled before)

**Given** I type something other than "ELIMINAR"
**When** I look at the button
**Then** it remains disabled with 50% opacity

**Given** I confirm deletion by typing "ELIMINAR" and tapping the button
**When** the deletion process executes
**Then** all my data is deleted from Supabase (CASCADE DELETE: habits, records, conversations, messages, profile)
**And** my Supabase Auth account is deleted
**And** Dexie.js local database is deleted (`db.delete()`)
**And** service worker cache is cleared (`caches.delete()`)
**And** localStorage is cleared
**And** I see the message: "Gracias por haber estado aquí. Tus datos han sido eliminados."
**And** I am redirected to the login/landing page

**Given** the deletion flow
**When** I review the UX
**Then** the "Eliminar cuenta" button uses Secondary style with `--color-state-warning` text (never Primary, never red CTA)
**And** there are no retention pop-ups, no "Are you sure?" guilt trips, no offers to "pause instead"
**And** deletion completes within 24 hours (NFR11)

## Epic 3: Gestión de Hábitos

El usuario puede crear, editar y eliminar hábitos con frecuencia configurable y modos de dificultad, viendo un resumen de sus hábitos activos en el dashboard.

### Story 3.1: Crear Hábito Manualmente con Formulario Educativo

As a **user**,
I want to create a new habit using a guided form that teaches me the signal-routine-reward framework,
So that I can start tracking even without the AI agent, learning the Atomic Habits structure along the way.

**Acceptance Criteria:**

**Given** I am on the dashboard (Hábitos tab) and tap "+" or "Nuevo hábito"
**When** a creation sheet/modal opens
**Then** I see two options: "Hablar con Pepito" (disabled if no AI) and "Crear manualmente"

**Given** I select "Crear manualmente"
**When** the form loads
**Then** I see fields: Nombre* (required), Señal (optional), Rutina* (required), Recompensa (optional), Frecuencia (default: Diario), Modo (default: Normal)
**And** labels are above each field, optional fields marked with "(opcional)"
**And** placeholders are educational in Spanish: "Ej: Leer antes de dormir", "Ej: Después de meterme en la cama", "Ej: Leer 10 páginas", "Ej: Un té caliente"

**Given** I have created 0-3 habits
**When** I view the form
**Then** ⓘ tooltip icons appear next to Señal, Rutina, and Recompensa
**And** tapping ⓘ expands an inline tooltip below the field with educational text (e.g., Señal: "El momento o situación que dispara tu hábito")
**And** the tooltip collapses when I start typing, tap outside, or tap ⓘ again

**Given** I have created 4+ habits
**When** I view the form
**Then** ⓘ icons are hidden, replaced by a "¿Qué significan estos campos?" Ghost link at the bottom

**Given** I fill in Nombre and Rutina (minimum required) and tap "Crear hábito"
**When** the form validates
**Then** the habit is created in Supabase via `habit-service.ts`
**And** a micro-celebration animation plays
**And** the habit appears in my dashboard list
**And** the form closes

**Given** I submit with required fields empty
**When** validation runs (on submit only, not while typing)
**Then** empty required fields show `--color-state-warning` border with neutral message: "Este campo es obligatorio"

**And** PostgreSQL `habits` table is created with columns: id (UUID), user_id, name, signal, routine, reward, frequency_type, frequency_days, difficulty_mode, is_active, created_at, updated_at
**And** RLS policy ensures `auth.uid() = user_id`
**And** Dexie.js mirrors the habits table schema locally
**And** Zod schema `createHabitSchema` validates input
**And** `habit-service.ts` handles CRUD with snake_case↔camelCase transformation

### Story 3.2: Dashboard con Resumen de Hábitos Activos

As a **user**,
I want to see all my active habits at a glance when I open the app,
So that I know exactly where I stand today without navigating anywhere.

**Acceptance Criteria:**

**Given** I am authenticated and have habits created
**When** the Hábitos tab loads
**Then** I see a list of my active habits with: habit name, current streak count, and a checkbox for today's registration
**And** the list loads in less than 2 seconds on first visit, less than 1 second on subsequent visits (NFR2)

**Given** I have no habits yet
**When** the dashboard loads
**Then** I see an empty state: "Tu viaje empieza aquí. ¿Listo?" with a button "Crear mi primer hábito" (UX-DR18)

**Given** I am on desktop (1024px+)
**When** I view the dashboard
**Then** the layout shows two columns: habit list (left ~55%) and space reserved for heatmap (right ~45%, implemented in Epic 4)

**Given** I am on mobile
**When** I view the dashboard
**Then** the list is single column, full-width, with compact spacing `--space-2` between items for tap efficiency

**And** TanStack Query fetches habits with key `["habits", "list"]`
**And** data comes from Dexie.js (local-first) for instant load, with Supabase sync in background

### Story 3.3: Editar Hábito con Edición Inline

As a **user**,
I want to edit any detail of my habit directly from its detail view without opening a separate form,
So that adjusting my habits feels effortless and instant.

**Acceptance Criteria:**

**Given** I am on the dashboard and tap a habit's name
**When** the detail view opens
**Then** I see all habit fields displayed: nombre, señal, rutina, recompensa, frecuencia, modo — each with a ✏️ edit icon
**And** a compact heatmap placeholder (implemented in Epic 4)
**And** a "Hablar con Pepito sobre este hábito" button (functional in Epic 6, visible but placeholder now)

**Given** I tap ✏️ or the field value
**When** the field enters edit mode
**Then** the text converts to an editable Input with the current value
**And** I can modify the value

**Given** I am editing a field
**When** I press Enter or the field loses focus (blur)
**Then** the value is saved automatically via `habit-service.ts`
**And** a subtle ✓ in `--color-state-success` appears for 1.5 seconds confirming the save

**Given** I am editing a field
**When** I press Escape
**Then** the edit is cancelled and the original value is restored

**Given** I change the frequency selector
**When** I select a new value (diario, semanal X de 7, mensual, personalizada)
**Then** the frequency updates immediately with auto-save

**Given** I change the difficulty mode
**When** I select Normal or Difícil
**Then** the mode changes without penalization to existing streak data (FR23)

**And** navigation shows "← Volver" in header returning to dashboard
**And** Tab key navigates between editable fields
**And** each field has `aria-label="Editar [nombre del campo]"`

### Story 3.4: Eliminar (Archivar) Hábito

As a **user**,
I want to remove a habit I no longer want to track while preserving my historical data,
So that my dashboard stays clean but I never lose the proof of my past effort.

**Acceptance Criteria:**

**Given** I am on the habit detail view
**When** I tap "Archivar hábito"
**Then** a confirmation dialog appears: "Tu historial se conservará. ¿Archivar [nombre del hábito]?"
**And** two buttons: "Sí, archivar" (Secondary) and "Cancelar" (Ghost)

**Given** I confirm archiving
**When** the archive action executes
**Then** the habit's `is_active` field is set to `false` (not deleted from database)
**And** the habit disappears from the active habits dashboard list
**And** historical records (heatmap data) are preserved
**And** I am returned to the dashboard

**Given** I tap "Cancelar"
**When** the dialog closes
**Then** nothing changes, I remain on the detail view

**And** the archive button uses Secondary style with `--color-state-warning` text (never Primary)
**And** the confirmation dialog uses Dialog component from shadcn/ui with `--color-surface-elevated` background and generous padding `--space-6`

## Epic 4: Registro de Hábitos y Visualización de Progreso

El usuario puede registrar hábitos con un solo tap, ver rachas calculadas según modo/frecuencia, y visualizar su progreso en un heatmap emocional sin castigo.

### Story 4.1: Registro Rápido con Un Tap y Micro-celebración

As a **user**,
I want to register my habit completion with a single tap that gives me instant, satisfying feedback,
So that tracking feels effortless and even rewarding — never like a chore.

**Acceptance Criteria:**

**Given** I am on the dashboard and see my habit list with checkboxes
**When** I tap the checkbox next to a habit
**Then** the checkbox fills with `--color-accent-celebration` color and shows a ✓ in white
**And** a bounce animation plays (duration `--duration-instant` 100ms, easing `--easing-bounce`)
**And** a haptic vibration fires (50ms) on supported devices
**And** the action completes in less than 100ms regardless of connection state (NFR1)

**Given** I have registered a habit today
**When** I tap the checkbox again
**Then** it unchecks with a smooth transition (no haptic, no celebration)
**And** the record is removed

**Given** the user has `prefers-reduced-motion: reduce` enabled
**When** I tap the checkbox
**Then** the color changes instantly without animation and without haptic feedback

**Given** a binary habit (sí/no)
**When** I register via tap
**Then** a `habit_records` entry is created with `completed: true`, `date: today`, `intensity: null`

**Given** a quantifiable habit
**When** I tap the checkbox
**Then** a small inline input appears to enter a numeric value (e.g., minutes, pages)
**And** submitting the value creates the record with the `intensity` field populated
**And** tapping without entering a value defaults to binary completion

**Given** I want to add a note
**When** I long-press or tap a secondary action on a registered habit
**Then** an optional note input appears
**And** the note is saved to the `habit_records.note` field

**And** PostgreSQL `habit_records` table is created: id (UUID), habit_id, user_id, date, completed (boolean), intensity (numeric nullable), note (text nullable), created_at
**And** RLS policy ensures `auth.uid() = user_id`
**And** Dexie.js mirrors habit_records locally
**And** `record-service.ts` handles registration with optimistic updates via TanStack Query
**And** touch target is 44x44px minimum
**And** checkbox states: unchecked (border `--color-border-interactive`), checking (flash `--color-accent-celebration`), checked (filled), unchecking (smooth fade)

### Story 4.2: Cálculo de Rachas por Modo y Frecuencia

As a **user**,
I want to see my current streak calculated correctly based on my habit's frequency and difficulty mode,
So that my progress is measured fairly — daily habits, 3-days-a-week habits, and difficult habits all count differently.

**Acceptance Criteria:**

**Given** a habit with frequency "Diario" and mode "Normal" (acumulativo)
**When** I view the streak
**Then** the streak counts consecutive days with a registration, adding 1 per completed day
**And** a missed day breaks the streak but previous days remain as historical achievements

**Given** a habit with frequency "Semanal 3 de 7" and mode "Normal"
**When** I view the streak
**Then** the streak counts consecutive weeks where I completed at least 3 days
**And** the streak adapts to the configured frequency (FR29)

**Given** a habit with mode "Difícil" (resta sin resetear)
**When** I miss a day
**Then** the streak score decreases by a penalty but does NOT reset to zero
**And** the previous accumulated days remain visible as achievements (FR30)
**And** the heatmap still shows completed days — only the score changes

**Given** a habit with any mode
**When** I view the dashboard list
**Then** I see the current streak count next to each habit name
**And** streak calculation completes in under 200ms even with 2 years of data (NFR16)

**And** `useStreakCalculation.ts` hook encapsulates streak logic per mode
**And** streak logic lives in `record-service.ts` as pure functions (testable without React)
**And** unit tests cover: Normal daily, Normal weekly, Difícil with missed days, edge cases (first day, gap then return)

### Story 4.3: Heatmap de Progreso Emocional

As a **user**,
I want to see my progress as a warm, visual heatmap that celebrates what I've done without punishing what I haven't,
So that looking at my progress feels motivating, never guilt-inducing.

**Acceptance Criteria:**

**Given** I am on the dashboard
**When** the heatmap loads
**Then** I see an SVG grid of cells representing days (GitHub contribution style)
**And** month labels on the horizontal axis, day-of-week labels on the vertical axis
**And** the full variant shows 12 months of data (NFR3: renders without perceptible performance degradation)

**Given** a day where I completed all habits
**When** I look at that cell
**Then** it shows `--color-heatmap-high` (intenso, celebración)

**Given** a day where I completed some habits
**When** I look at that cell
**Then** it shows `--color-heatmap-mid` (medio) or `--color-heatmap-low` (bajo) based on ratio

**Given** a day with no registration
**When** I look at that cell
**Then** it shows `--color-heatmap-empty` — a soft neutral identical to future days
**And** there is NO red, NO X, NO visual indicator of failure (FR32)

**Given** a future day
**When** I look at that cell
**Then** it shows `--color-heatmap-empty` — intentionally identical to missed days

**Given** I am on mobile (320-639px)
**When** the heatmap is wider than the screen
**Then** horizontal scrolling is contained within the heatmap area only

**Given** I tap on a cell (mobile) or hover (desktop)
**When** the interaction occurs
**Then** a tooltip shows the date and detail: "15 de marzo — 3 de 3 hábitos completados" or "15 de marzo — sin registro"

**Given** keyboard navigation
**When** I use arrow keys within the heatmap
**Then** focus moves between cells with visible focus ring
**And** each cell has `role="gridcell"` with descriptive `aria-label`
**And** the grid has `role="grid"` with `aria-label="Mapa de progreso de hábitos"`

**And** the heatmap exists in 3 variants: full (12 months, dashboard), compact (8-12 weeks, habit detail), inline (4 weeks, chat card)
**And** on desktop (1024px+), the heatmap occupies the right column (~45%) of the dashboard layout

### Story 4.4: Feedback de Estado y Patrones de Celebración

As a **user**,
I want consistent visual feedback across the app — celebration when I do something, silence when I don't,
So that the app reinforces my habits without ever making me feel bad about gaps.

**Acceptance Criteria:**

**Given** I register a habit
**When** the registration succeeds
**Then** the checkbox animates with `--color-accent-celebration`
**And** the heatmap cell for today updates with a slow fill animation (`--duration-slow` 400ms)

**Given** I create a new habit (from form or agent)
**When** creation succeeds
**Then** a micro-celebration animation plays on the habit card
**And** haptic vibration 50ms fires
**And** the agent (if active) says a celebratory message

**Given** I edit a field successfully
**When** the save completes
**Then** a ✓ in `--color-state-success` appears next to the field for 1.5 seconds, then fades

**Given** data is loading from Supabase
**When** the fetch is in progress
**Then** Skeleton components with `--color-surface-secondary` pulse animation show in place of content
**And** no full-screen spinner ever appears — loading is local to each component

**Given** a generic app error occurs
**When** the error is caught
**Then** a toast appears at the top with `--color-state-warning` background, brief message, disappearing in 4 seconds
**And** no modal blocks the UI

**Given** I have not registered a habit today
**When** I open the app
**Then** there is ZERO feedback about the missed registration — no banner, no badge, no mention, no count

**And** `prefers-reduced-motion: reduce` disables all animations, replacing them with instant color changes
**And** ErrorBoundary per feature prevents one component failure from crashing the whole app

## Epic 5: Sincronización Offline y Multi-dispositivo

El usuario puede registrar hábitos sin conexión y acceder a sus datos desde múltiples dispositivos con sincronización automática transparente.

### Story 5.1: Registro Offline con Cola de Escritura Local

As a **user**,
I want to register my habits even when I have no internet connection,
So that my daily tracking never depends on being online — the app works for me, not the other way around.

**Acceptance Criteria:**

**Given** I am offline (no internet connection)
**When** I tap a habit checkbox to register
**Then** the registration succeeds instantly (stored in Dexie.js)
**And** the UI updates immediately — checkbox fills, heatmap updates, streak recalculates
**And** the action feels identical to online registration (same <100ms feedback)

**Given** I am offline and make multiple registrations
**When** each action is performed
**Then** each write operation is added to a `sync_queue` table in Dexie.js (FIFO order)
**And** the queue stores: operation type, table, payload, timestamp, retry_count

**Given** I am offline
**When** I create or edit a habit
**Then** the changes are stored locally in Dexie.js and queued for sync
**And** the app remains fully functional for all habit management operations

**And** `sync-engine.ts` implements the sync queue with FIFO processing
**And** the sync queue is a dedicated Dexie.js table (`sync_queue`)
**And** all UI reads come from Dexie.js (local-first), never directly from Supabase during normal operation
**And** `useLiveQuery()` from Dexie provides reactive updates to UI when local data changes

### Story 5.2: Sincronización Automática con Servidor como Fuente de Verdad

As a **user**,
I want my data to sync automatically when I reconnect, with the server always being the source of truth,
So that I never lose data and can trust that all my devices show the same information.

**Acceptance Criteria:**

**Given** I was offline and have queued operations
**When** internet connection is restored
**Then** the sync engine automatically processes the queue in FIFO order
**And** each operation is sent to Supabase
**And** sync runs in background without blocking UI interaction (NFR5: <50ms added latency)

**Given** a sync operation fails
**When** the retry logic kicks in
**Then** the operation retries up to 3 times with exponential backoff (NFR27)
**And** after 3 failures, the operation is marked as failed and the user sees the SyncIndicator in error state

**Given** a conflict exists (same record modified offline on two devices)
**When** sync processes the conflict
**Then** last-write-wins strategy is applied (server timestamp comparison)
**And** the server version is the source of truth (FR35)
**And** the local Dexie.js cache is updated to match server state

**Given** I log in on a new device
**When** the app loads
**Then** data syncs from Supabase to Dexie.js local cache
**And** I see my complete data (habits, records, conversations) within seconds
**And** a subtle loading skeleton shows while sync completes

**And** sync does not block UI — all reads from Dexie.js continue during sync
**And** architecture supports up to 1,000 MAU without infrastructure changes (NFR14)
**And** `sync-engine.test.ts` covers: queue processing, retry with backoff, conflict resolution, multi-device scenario

### Story 5.3: Indicador de Sincronización Visible

As a **user**,
I want to know at a glance whether my data is synced, syncing, or offline,
So that I trust my data is safe across devices without having to think about it.

**Acceptance Criteria:**

**Given** my data has just finished syncing
**When** I look at the header (top-right)
**Then** I see a cloud + ✓ icon in `--color-state-success` that appears for 2 seconds, then fades

**Given** a sync is in progress
**When** I look at the header
**Then** I see a cloud with a subtle spinner animation

**Given** I am offline
**When** I look at the header
**Then** I see a cloud + X icon in `--color-state-warning` that persists as long as I'm offline

**Given** a sync error occurred (after retries exhausted)
**When** I look at the header
**Then** I see a cloud + ! icon in `--color-state-warning`
**And** tapping it shows a tooltip: "Reintentando sincronización..."

**Given** the sync state changes
**When** the indicator updates
**Then** `aria-live="polite"` announces the change to screen readers
**And** the label is descriptive: "Datos sincronizados", "Sincronizando datos", "Sin conexión — los cambios se guardan localmente"

**And** `useSyncStatus.ts` hook connects to `sync-store.ts` (Zustand) for reactive state
**And** the SyncIndicator component is lightweight and doesn't cause re-renders of sibling components

## Epic 6: Agente IA — Pepito Grillo

El usuario puede conversar con un agente IA empático que guía el diseño de hábitos mediante conversación, interactúa con datos de la app vía tool contracts, y acompaña sin juzgar.

### Story 6.1: Interfaz de Chat con Pepito Grillo

As a **user**,
I want a WhatsApp-like chat interface where I can talk to the Pepito Grillo,
So that the conversation feels natural, familiar, and private — like texting someone who really listens.

**Acceptance Criteria:**

**Given** I tap the "Pepito" tab
**When** the chat view loads
**Then** I see a conversation interface with messages as bubbles

**Given** a message from the agent
**When** it renders
**Then** it appears as a left-aligned bubble with `--color-surface-chat-agent` background
**And** the Pepito Grillo avatar (circular, `--color-accent-agent`) is visible to the left
**And** a timestamp shows below the bubble in `--font-size-xs`
**And** the bubble has asymmetric border-radius (bottom-left corner straight)

**Given** a message from me
**When** it renders
**Then** it appears as a right-aligned bubble with `--color-surface-chat-user` background
**And** no avatar, asymmetric border-radius (bottom-right corner straight)

**Given** I have no previous conversations
**When** the chat loads
**Then** I see the empty state: "Tu Pepito Grillo está listo para escucharte." with the input active and ready (UX-DR18)

**Given** the chat input area
**When** I interact with it
**Then** it is a multi-line textarea that auto-expands up to 4 lines, then scrolls internally
**And** Enter sends the message (mobile: keyboard send button)
**And** Shift+Enter creates a new line (desktop)
**And** the send button (➤) has touch target 44x44px
**And** the send button is disabled (50% opacity) when the input is empty, active with `--color-accent-primary` when there's text

**Given** the chat is on desktop
**When** I view it
**Then** the conversation is centered with max-width ~600px

**And** messages container uses `role="list"`, each bubble `role="listitem"` with `aria-label` including sender + content + time
**And** text is selectable and copiable
**And** chat input has `aria-label="Enviar mensaje al Pepito Grillo"` and auto-focuses on tab open
**And** PostgreSQL tables created: `conversations` (id, user_id, habit_id nullable, started_at) and `messages` (id, conversation_id, role, content, tool_calls nullable, created_at)
**And** RLS policies on both tables
**And** `conversation-service.ts` handles persistence
**And** `useAgentStore` (Zustand) manages chat state (messages, isTyping, activeConversation)

### Story 6.2: LLM Adapter y Edge Function Proxy

As a **developer**,
I want a provider-agnostic LLM integration behind a proxy with rate limiting and metrics,
So that we can change AI providers without touching business logic and monitor costs from day one.

**Acceptance Criteria:**

**Given** the agent framework architecture
**When** a message is sent to the agent
**Then** it goes through `llm-adapter.ts` abstract interface with methods `sendMessage(messages, tools)` returning a response

**Given** the MVP uses a self-hosted or cloud LLM
**When** the adapter makes a request
**Then** it calls the Supabase Edge Function `ai-proxy` (not the LLM directly from the client)

**Given** the Supabase Edge Function `ai-proxy`
**When** it receives a request
**Then** it validates the user's auth token
**And** forwards the request to the configured LLM endpoint
**And** applies rate limiting per user
**And** logs metrics: tokens consumed, latency, errors (NFR28)
**And** returns the LLM response to the client

**Given** the LLM returns an error, timeout, or malformed response
**When** the error is caught
**Then** the adapter returns a structured `AppError` with code `AI_TIMEOUT`, `AI_ERROR`, or `AI_MALFORMED`
**And** the user sees a message in the chat: "No he podido responder. ¿Reintentamos?" with a retry button (NFR23)
**And** the error is visible within 2 seconds

**Given** the AI service is completely unavailable
**When** the user tries to use the chat
**Then** the app degrades gracefully: habit creation, registration, heatmap all work (NFR29)
**And** the chat shows: "Agente IA no disponible. Puedes usar Primer sin IA."

**And** `llm-adapter.ts` defines the Port interface: `sendMessage(messages: Message[], tools: AgentTool[]): Promise<AgentResponse>`
**And** `self-hosted-adapter.ts` implements the interface for the MVP LLM provider
**And** changing provider = creating a new adapter file, no other code changes (NFR15, NFR22)
**And** the adapter adds less than 500ms processing overhead (NFR25)

### Story 6.3: Tool Contracts del Agente con Validación Zod

As a **user**,
I want the agent to be able to read and modify my habits through our conversation,
So that I never have to leave the chat to manage my data — the conversation does everything.

**Acceptance Criteria:**

**Given** I am chatting with the agent and describe a new habit
**When** the agent determines it has enough context to propose a habit
**Then** it invokes the `createHabit` tool with structured parameters (signal, routine, reward, frequency, mode)
**And** the tool validates input with Zod schema before execution
**And** on validation success, the habit is created via `habit-service.ts`
**And** on validation failure, the agent receives an error and rephrases its question

**Given** the agent invokes `getHabits`
**When** the tool executes
**Then** it returns the user's active habits list via `habit-service.ts`
**And** the agent can reference this data in conversation

**Given** the agent invokes `getHabitRecords` with habitId and dateRange
**When** the tool executes
**Then** it returns registration records for context (e.g., "you've completed 5 of the last 7 days")

**Given** the agent invokes `updateHabit` with habitId and changes
**When** the tool executes
**Then** the specified fields are updated via `habit-service.ts`

**Given** the agent invokes `deleteHabit` with habitId
**When** the tool executes
**Then** the habit is archived (is_active = false)

**And** all 5 MVP tools are registered in `tool-registry.ts`: `createHabit`, `getHabits`, `getHabitRecords`, `updateHabit`, `deleteHabit`
**And** each tool has a Zod schema for input and output validation (NFR24)
**And** tools are configured separately from core logic — adding/modifying a tool doesn't require redeploying the whole app (NFR30)
**And** tools call service layer functions, never Supabase/Dexie directly (architectural boundary)
**And** `useAgentTools.ts` hook processes tool calls from LLM responses

### Story 6.4: Human-in-the-Loop — Confirmación de Acciones del Agente

As a **user**,
I want to see and confirm every action the agent takes on my data before it happens,
So that I always feel in control — the agent proposes, I decide.

**Acceptance Criteria:**

**Given** the agent wants to create a new habit from our conversation
**When** the tool call is processed
**Then** a HabitCard appears inline in the chat with: habit name, señal, rutina, recompensa, frecuencia, modo
**And** two buttons: "✓ Crear hábito" (Primary) and "Ajustar" (Secondary)
**And** the card has `--color-surface-elevated` background and `role="region"` with `aria-label="Resumen de hábito propuesto"`

**Given** I tap "✓ Crear hábito"
**When** the creation executes
**Then** the buttons are replaced by "✓ Hábito creado" with a micro-celebration
**And** the habit appears in the dashboard
**And** the agent responds with a celebratory message

**Given** I tap "Ajustar"
**When** the agent processes the adjustment request
**Then** the agent asks what I want to change
**And** a new conversation exchange happens
**And** an updated HabitCard appears with the changes

**Given** the agent wants to modify an existing habit
**When** the tool call is processed
**Then** a card appears showing the diff: "Cambiar frecuencia de diario a 3 días/semana" with "Aceptar" / "Rechazar" buttons

**Given** the agent wants to archive a habit
**When** the tool call is processed
**Then** a card appears: "¿Archivar [nombre]? Tu historial se conservará." with "Sí" / "No" buttons

**And** the agent NEVER modifies user data without explicit visual confirmation with buttons (sacred rule)
**And** Tab navigation works between card buttons
**And** HabitCard also exists in "summary" variant (no buttons) for use in habit detail view

### Story 6.5: Onboarding Conversacional para Primer Hábito

As a **new user**,
I want the Pepito Grillo to guide me through creating my first habit through conversation — no forms, no steps,
So that I feel heard and understood, and my first habit is born from reflection, not from filling fields.

**Acceptance Criteria:**

**Given** I am a new user with zero habits and I open the Pepito tab (or am directed there after registration)
**When** the chat loads
**Then** the agent greets me with a powerful, personal opening: "Piensa en tu mejor versión. ¿Qué es lo que te imaginas?"
**And** there is no tutorial, no slides, no "step 1 of 5"

**Given** I describe what I want to change
**When** the agent responds
**Then** it responds with empathy, asks clarifying questions, and never suggests a solution in the first exchange
**And** the conversation takes 3-5 exchanges before proposing a habit (never <2, never >7)

**Given** the agent has gathered enough context (signal, routine, reward)
**When** it structures the habit
**Then** a HabitCard appears inline with the proposed habit (Story 6.4 flow)
**And** the card is generated from the conversation — I never filled a form

**Given** the agent is using the Atomic Habits framework
**When** it guides the conversation
**Then** it naturally structures around signal (señal), routine (rutina), reward (recompensa), and identity
**And** the user learns the framework implicitly through conversation, without being lectured (FR17)

**Given** I configure a habit with daily frequency, high intensity, and no prior history
**When** the agent detects this pattern
**Then** it warns gently: suggests starting smaller and proposes progressive alternatives (FR14)
**And** the suggestion is conversational, not a system alert

**And** system prompts are engineered with anti-patterns: never imperative negatives, never mention missed days as failure, always offer alternatives before pointing out issues (FR13)
**And** conversations and messages are persisted to Supabase (NFR12: treated as sensitive personal data)
**And** no data from other users leaks into prompts (NFR13)

### Story 6.6: Tono Empático, Bienvenida tras Ausencia y Agente Bajo Demanda

As a **returning user**,
I want the Pepito Grillo to welcome me back without guilt if I've been away, and to always be available when I need to reflect,
So that I know Primer is a safe space that waits for me without judgment.

**Acceptance Criteria:**

**Given** I open the chat after >7 days of absence
**When** the agent responds
**Then** its first message is warm and future-oriented: "Me alegra verte. Tu progreso sigue aquí."
**And** it does NOT mention how many days I've been away (FR15)
**And** it does NOT show a counter of missed days
**And** it asks an open question: "¿Quieres seguir con los mismos hábitos o ajustamos algo?"

**Given** I have a recaída (missed days in Difícil mode)
**When** I open the chat afterward
**Then** the agent does NOT mention the failure proactively
**And** if I bring it up, it responds with normalization: "Es parte del proceso. Lo importante es que estás aquí."
**And** for long-streak breaks: "52 días no desaparecen por una noche."
**And** it offers to adjust: "¿Ajustamos algo para que sea más sostenible?"

**Given** I want to talk to the agent at any time
**When** I tap the "Pepito" tab or a contextual button like "Hablar con Pepito sobre este hábito" (from habit detail)
**Then** the chat opens (FR16)
**And** if opened from a habit context, the agent has that habit's data preloaded for the conversation

**Given** the agent is responding
**When** I see the typing indicator
**Then** the AgentTypingIndicator shows: avatar + 3 dots with sequential bounce animation (delay 0.2s each)
**And** it transitions smoothly to the ChatBubble when the response arrives
**And** `aria-live="polite"` with `aria-label="Pepito Grillo está escribiendo"` announces once
**And** with `prefers-reduced-motion`: dots are static with pulsing opacity

**Given** the agent responds with the first token
**When** the response starts arriving
**Then** the AgentTypingIndicator is replaced by the response bubble
**And** response arrives within 5 seconds (NFR4)

**And** tone guidelines are codified in system prompts per context: onboarding (curious/inviting), reflection (empathetic), relapse (normalizing), celebration (shared pride), return after absence (warm/future-oriented)

## Epic 7: Administración y Monitoreo

El administrador puede acceder a métricas de uso y gestionar usuarios desde el panel de Supabase Dashboard.

### Story 7.1: Administración vía Supabase Dashboard

As an **administrator (Manuel)**,
I want to access usage metrics and manage users directly through the Supabase Dashboard,
So that I can monitor the product health, track AI costs, and handle user issues without building a custom admin panel.

**Acceptance Criteria:**

**Given** I am the project admin and access the Supabase Dashboard
**When** I navigate to the tables view
**Then** I can see all users, their habits, records, and conversations
**And** data is queryable with SQL from the SQL Editor

**Given** I need to check usage metrics
**When** I open the Supabase Dashboard and Edge Function logs
**Then** I can see: active users count, API request volume, Edge Function invocation count
**And** AI proxy logs show: tokens consumed per request, latency, errors (NFR28)
**And** I can query cohort data (D7/D30 retention) via SQL on the `habit_records` and `auth.users` tables

**Given** I need to ban a user (e.g., abuse detected)
**When** I access the Supabase Auth dashboard
**Then** I can disable a user account, revoking their access
**And** the user's data is preserved (not deleted) but they cannot log in

**Given** I need to monitor AI costs
**When** I review the Edge Function logs
**Then** I see accumulated token usage, error rates, and average latency
**And** this data is sufficient to make decisions about model selection and rate limiting

**Given** the admin panel requirements for MVP
**When** I evaluate what's needed
**Then** NO custom admin UI is built — Supabase Dashboard serves all admin needs
**And** custom admin panel is deferred to Phase 2 (Growth)

**And** SQL queries for key metrics (MAU, retention, onboarding completion rate, agent usage) are documented in the project's `docs/` or `supabase/` folder for easy reuse
**And** RLS policies do NOT block admin access when using the Supabase service role key
