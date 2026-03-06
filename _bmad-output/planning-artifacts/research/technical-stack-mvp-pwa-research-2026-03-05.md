---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments: ['_bmad-output/brainstorming/brainstorming-session-2026-02-28.md', '_bmad-output/planning-artifacts/research/market-habit-tracking-ai-research-2026-03-02.md', '_bmad-output/planning-artifacts/research/domain-apps-habitos-bienestar-research-2026-03-03.md']
workflowType: 'research'
lastStep: 1
research_type: 'technical'
research_topic: 'Stack tecnico completo para MVP PWA de app de habitos: arquitectura, base de datos local, frameworks y tendencias de la comunidad'
research_goals: 'Definir el stack tecnico optimo para construir el MVP como PWA (framework frontend, base de datos local, arquitectura de componentes), priorizar tecnologias donde el desarrollo asistido por agentes de IA tiene mas exito (calidad de codigo generado, ecosistema, documentacion), analizar tendencias con mas traccion en la comunidad, y disenar una arquitectura que permita integracion futura con IA agentica via MCP u otros protocolos estandar'
user_name: 'Manuel'
date: '2026-03-05'
web_research_enabled: true
source_verification: true
---

# Technical Research: Stack tecnico completo para MVP PWA de app de habitos

**Date:** 2026-03-05
**Author:** Manuel
**Research Type:** Technical

---

> **IMPORTANTE — Revision Critica Disponible (2026-03-06)**
> Este documento fue sometido a una revision adversarial que identifica riesgos subestimados y propone un cambio arquitectonico significativo: reemplazar el modelo local-first puro (Dexie.js) por un modelo hibrido (Dexie.js como cache local + Supabase como backend y fuente de verdad). Consultar: [`technical-revision-critica-stack-mvp-pwa-2026-03-06.md`](./technical-revision-critica-stack-mvp-pwa-2026-03-06.md)

---

## Research Overview

Esta investigacion tecnica analiza de forma exhaustiva el stack tecnologico optimo para construir un MVP de app de habitos como Progressive Web App (PWA) con arquitectura local-first. El estudio abarca analisis de frameworks frontend, bases de datos locales, patrones arquitectonicos, estrategias de testing, plataformas de despliegue y workflows de desarrollo asistido por IA — todo verificado con fuentes web actuales de 2025-2026.

Los hallazgos principales confirman que el stack **TypeScript + React + Vite + Dexie.js + Tailwind v4 + shadcn/ui** es la combinacion optima para este proyecto, ofreciendo maxima compatibilidad con generacion de codigo por IA, ecosistema maduro, costo de infraestructura cero y una arquitectura que escala naturalmente hacia integracion con IA agentica via MCP. La investigacion cubre 6 areas principales: scope tecnologico, analisis de stack, patrones de integracion, patrones arquitectonicos, enfoques de implementacion y sintesis estrategica.

Para el resumen ejecutivo completo y recomendaciones estrategicas detalladas, ver la seccion **Sintesis de la Investigacion Tecnica** al final de este documento.

---

## Technical Research Scope Confirmation

**Research Topic:** Stack tecnico completo para MVP PWA de app de habitos: arquitectura, base de datos local, frameworks y tendencias de la comunidad
**Research Goals:** Definir el stack tecnico optimo para construir el MVP como PWA (framework frontend, base de datos local, arquitectura de componentes), priorizar tecnologias donde el desarrollo asistido por agentes de IA tiene mas exito, analizar tendencias con mas traccion en la comunidad, y disenar una arquitectura que permita integracion futura con IA agentica via MCP u otros protocolos estandar

**Technical Research Scope:**

- Architecture Analysis - design patterns, frameworks, system architecture
- Implementation Approaches - development methodologies, coding patterns
- Technology Stack - languages, frameworks, tools, platforms
- Integration Patterns - APIs, protocols, interoperability
- Performance Considerations - scalability, optimization, patterns

**Research Methodology:**

- Current web data with rigorous source verification
- Multi-source validation for critical technical claims
- Confidence level framework for uncertain information
- Comprehensive technical coverage with architecture-specific insights

**Scope Confirmed:** 2026-03-05

## Technology Stack Analysis

### Lenguaje: TypeScript como infraestructura esencial

TypeScript no es opcional en 2026 — es la base sobre la que se construye todo el ecosistema moderno de desarrollo web y, crucialmente, es el lenguaje donde los agentes de IA generan codigo de mayor calidad.

**Por que TypeScript para desarrollo con IA:**
- Los tipos dan a las herramientas de IA algo concreto con lo que trabajar, lo que significa menos correcciones tras la generacion de codigo.
- Atrapa errores temprano, hace el refactoring menos doloroso y potencia el autocompletado del IDE.
- Todos los agentes de IA (Claude Code, Cursor, Copilot) producen TypeScript con mayor precision que JavaScript plano porque los tipos actuan como especificacion implicita.

**Adopcion en 2026:**
- Es el estandar de facto para desarrollo frontend y full-stack.
- Todas las plataformas de vibe coding (Lovable, Bolt.new, v0) generan TypeScript por defecto.
- Los frameworks principales (React, Svelte, Vue) tienen soporte de primera clase para TypeScript.

_Nivel de confianza: MUY ALTO. Consenso absoluto en la industria._
_Fuentes: [The Perfect Vibe Coding Tech Stack 2026](https://www.contextstudios.ai/blog/the-perfect-vibe-coding-tech-stack-2026-10-tools-every-app-needs), [Vibe Coding Complete Guide 2026](https://www.gauraw.com/vibe-coding-complete-guide-2026/), [The React + AI Stack for 2026](https://www.builder.io/blog/react-ai-stack-2026)_

---

### Framework Frontend: React + Vite — La eleccion dominante para desarrollo con IA

#### Por que React para desarrollo asistido por IA

React tiene una ventaja estructural para el desarrollo con agentes de IA que va mas alla de preferencias personales — es el "Efecto Matthew" aplicado a la generacion de codigo:

- **Dominio en datos de entrenamiento**: React domina en volumen de codigo en GitHub, preguntas en Stack Overflow y articulos tecnicos. Los LLMs tienen una comprension mas profunda de React y generan codigo de mayor calidad.
- **Plataformas de vibe coding**: Lovable genera exclusivamente TypeScript + React + Vite + Tailwind. Bolt.new soporta multiples frameworks pero React es el default. v0 (Vercel) se especializa en componentes React.
- **Ecosistema de IA**: Mas bibliotecas de IA estan disponibles para React que para cualquier otro framework. Los agentes de IA "alcanzan React casi siempre" cuando les pides construir una UI.
- **Ciclo virtuoso**: Mas datos de entrenamiento -> mejor calidad de generacion -> mas usuarios -> mas datos de entrenamiento.

_Fuentes: [Choosing a Frontend Framework in 2026: When AI Becomes Your Invisible Teammate](https://dev.to/aierastack/choosing-a-frontend-framework-in-2026-when-ai-becomes-your-invisible-teammate-5b8g), [The React + AI Stack for 2026](https://www.builder.io/blog/react-ai-stack-2026), [Best Vibe Coding Tools 2026](https://lovable.dev/guides/best-vibe-coding-tools-2026-build-apps-chatting)_

#### La alternativa: Svelte/SvelteKit

Svelte merece mencion porque tiene ventajas tecnicas reales:
- Compila a JavaScript minimo en build time — bundles 20-40% mas pequenos que React.
- Mejor rendimiento puro (sin virtual DOM).
- Codigo mas limpio y conciso (menos boilerplate).
- SvelteKit tiene soporte nativo de primera clase para service workers y PWAs.
- Ha lanzado un MCP tool oficial para mejorar la experiencia con IA.
- Tiene un [benchmark de LLMs para Svelte 5](https://github.com/khromov/svelte-bench) basado en la metodologia HumanEval de OpenAI.

**Pero la realidad para desarrollo con IA en 2026:**
- Los modelos de IA generan codigo React de mayor calidad por tener mas datos de entrenamiento.
- v0 y Lovable solo soportan React. Bolt.new lo pone como default.
- El ecosistema de componentes (shadcn/ui, bibliotecas de IA) es vastamente mayor en React.
- Svelte esta "activamente alcanzando" pero aun no ha cerrado la brecha.

**Recomendacion para tu proyecto:** React. La ventaja en calidad de codigo generado por IA es el factor decisivo dado que vas a desarrollar principalmente con agentes de IA.

_Nivel de confianza: ALTO. React es la eleccion dominante para IA-assisted development. Svelte es una alternativa legitima pero con menor soporte de IA._
_Fuentes: [Svelte vs React 2026](https://devtrios.com/blog/svelte-vs-react-which-framework-should-you-choose/), [SvelteKit vs Next.js 2026](https://dev.to/paulthedev/sveltekit-vs-nextjs-in-2026-why-the-underdog-is-winning-a-developers-deep-dive-155b), [svelte-bench GitHub](https://github.com/khromov/svelte-bench)_

#### Por que Vite y no Next.js

Tu app es un tracker de habitos con datos locales — es una SPA/PWA, no un sitio con SEO critico ni server-side rendering. Vite es la herramienta correcta:

| Aspecto | Vite | Next.js |
|---------|------|---------|
| **Naturaleza** | Build tool — React rapido y simple | Framework full-stack — React para produccion |
| **Caso de uso ideal** | SPAs, dashboards, PWAs, apps internas | E-commerce, marketing, SEO critico |
| **Complejidad** | Baja — configuracion minima | Alta — Server Components, App Router, middleware |
| **Cold start dev** | 1-2 segundos | Mas lento por compilacion server |
| **Rendimiento** | 30-50% mas rapido en apps medianas | Optimizado para pages con SSR/SSG |
| **Servidor necesario** | No — archivos estaticos | Si — necesita Node.js para SSR |
| **Deploy** | Cualquier CDN/hosting estatico | Vercel (optimo) o Node.js server |
| **PWA** | vite-plugin-pwa: zero-config | Requiere plugins adicionales, mas complejo |
| **Curva aprendizaje** | Suave — JavaScript moderno estandar | Empinada — conceptos propios del framework |
| **Para IA agents** | Menos conceptos = menos errores de generacion | Server Components confunden a los agentes |

**Ventaja clave para tu caso**: Vite genera archivos estaticos que se sirven desde cualquier CDN. No necesitas servidor. Esto simplifica enormemente el deploy y reduce costes a cero (tiers gratuitos de Netlify/Vercel/Cloudflare son suficientes).

_Fuentes: [Vite vs Next.js: Complete Comparison 2026](https://designrevision.com/blog/vite-vs-nextjs), [Vite vs Next.js - TatvaSoft](https://www.tatvasoft.com/outsourcing/2026/01/vite-vs-next-js.html), [Vite vs Next.js - Prismic](https://prismic.io/blog/vite-vs-nextjs)_

---

### Base de Datos Local y Persistencia

Para una PWA offline-first con datos locales, las opciones principales son IndexedDB (directa o via wrapper) y SQLite via WebAssembly. Dado tu caso de uso (registrar habitos, almacenar configuracion, historico de rachas), la decision esta clara.

#### Opciones evaluadas

**1. Dexie.js — Wrapper minimalista sobre IndexedDB (RECOMENDADO)**

Dexie.js es un wrapper ligero sobre IndexedDB que elimina la complejidad de la API nativa y expone una interfaz moderna basada en Promises/async-await con integracion perfecta con React hooks.

Caracteristicas clave:
- **useLiveQuery()**: Hook de React que actualiza automaticamente el componente cuando los datos cambian en IndexedDB. Reactividad nativa sin estado externo.
- **Esquema declarativo**: Defines tu modelo de datos con versionado incluido (migraciones automaticas).
- **Indices y transacciones**: Consultas rapidas y escrituras seguras sin lidiar con la API cruda de IndexedDB.
- **Adopcion masiva**: Usado por mas de 100,000 sitios web y apps.
- **Multi-plataforma**: Funciona en navegadores, Electron, Capacitor (iOS/Android) y PWAs.
- **Dexie Cloud (opcional)**: Sync comercial para multi-dispositivo — no necesario para MVP pero disponible para futuro.
- **Tamano**: ~35KB minificado.

Ejemplo de uso (conceptual):
```typescript
// Definir base de datos
const db = new Dexie('HabitTrackerDB');
db.version(1).stores({
  habits: '++id, name, frequency, difficulty, createdAt',
  records: '++id, habitId, date, completed, intensity, note'
});

// En React: consulta reactiva
const habits = useLiveQuery(() => db.habits.toArray());
const todayRecords = useLiveQuery(() =>
  db.records.where('date').equals(today).toArray()
);
```

**2. RxDB — Base de datos reactiva completa**

RxDB es una solucion mas completa y potente que Dexie, con replicacion, CRDTs, cifrado y soporte para multiples backends. Pero es considerablemente mas compleja.

- Soporte para CRDTs y resolucion de conflictos avanzada.
- Cifrado a nivel de campo.
- Replicacion con GraphQL, CouchDB, WebSocket.
- Esquemas JSON con validacion.
- **Problema**: Overengineering para un MVP. La complejidad de RxDB esta justificada para apps con sync multi-usuario, pero no para un tracker local-first individual.

**3. SQLite via WASM + OPFS**

SQLite compilado a WebAssembly usando OPFS (Origin Private File System) como almacenamiento:
- SQL completo en el navegador — queries complejas, joins, agregaciones.
- OPFS permite almacenar el archivo SQLite directamente en el navegador.
- **Problema**: La abstraccion WASM-SQLite incrementa la latencia de lectura/escritura. Mas complejo de configurar. Menos integracion con el ecosistema React. Mejor para apps data-intensive con queries complejas, no para un tracker de habitos.

**4. IndexedDB directo (sin wrapper)**

La API nativa de IndexedDB es potente pero dolorosa de usar directamente — callbacks, transacciones manuales, sin reactividad. No recomendado cuando existen wrappers maduros.

#### Recomendacion: Dexie.js

Para tu MVP, Dexie.js es el sweet spot perfecto:
- **Simple**: Suficiente para heatmaps, rachas, registros de habitos.
- **Reactivo**: useLiveQuery() = actualizacion automatica de UI.
- **Escalable**: Si en el futuro necesitas sync, Dexie Cloud existe.
- **IA-friendly**: API declarativa y tipada que los agentes de IA generan con precision.
- **Probado**: 100,000+ sitios — no es experimental.

_Nivel de confianza: ALTO. Dexie.js es la opcion estandar para PWAs con datos locales en React._
_Fuentes: [Dexie.js Features](https://dexie.org/product), [Dexie.js GitHub](https://github.com/dexie/Dexie.js), [Using Dexie.js in React - LogRocket](https://blog.logrocket.com/dexie-js-indexeddb-react-apps-offline-data-storage/), [liveQuery() Documentation](https://dexie.org/docs/liveQuery()), [Offline-first frontend apps 2025 - LogRocket](https://blog.logrocket.com/offline-first-frontend-apps-2025-indexeddb-sqlite/), [RxDB Alternatives](https://rxdb.info/alternatives.html)_

---

### UI y Estilos: Tailwind CSS v4 + shadcn/ui

#### Tailwind CSS v4

Tailwind CSS v4 es una reescritura completa del framework optimizada para rendimiento:
- **Rendimiento**: Builds completos hasta 5x mas rapidos. Builds incrementales 100x mas rapidos (microsegundos).
- **Configuracion simplificada**: Una sola linea de CSS (`@import "tailwindcss"`), deteccion automatica de contenido, zero-config con Vite.
- **CSS moderno**: Cascade layers, custom properties registradas con @property, color-mix().
- **Plugin de Vite de primera clase**: Integracion nativa sin configuracion adicional.

#### shadcn/ui

shadcn/ui es la biblioteca de componentes dominante en 2026, especialmente en el ecosistema React + Tailwind:
- **No es una dependencia — es codigo tuyo**: Los componentes se copian a tu proyecto. No hay paquete npm. Control total.
- **Full Tailwind v4 + React 19**: Todos los componentes actualizados.
- **Accesibilidad incluida**: Basado en Radix UI primitives (componentes accesibles por defecto).
- **IA-friendly**: Los agentes de IA conocen shadcn/ui extremadamente bien por su enorme presencia en GitHub. v0 de Vercel genera componentes shadcn/ui nativamente.
- **GitHub stars por encima de competidores** en 2025-2026.

**Alternativa: DaisyUI**
DaisyUI es mas opinionado (componentes pre-estilados) y requiere menos configuracion inicial. Pero para desarrollo con IA, shadcn/ui tiene ventaja por su mayor presencia en datos de entrenamiento.

**Recomendacion**: Tailwind CSS v4 + shadcn/ui. Es el combo dominante, con mejor soporte de IA y control total sobre los componentes.

_Fuentes: [Tailwind CSS v4.0](https://tailwindcss.com/blog/tailwindcss-v4), [Tailwind v4 - shadcn/ui](https://ui.shadcn.com/docs/tailwind-v4), [DaisyUI vs Shadcn/UI 2026](https://windframe.dev/blog/daisyui-vs-shadcn-ui), [Choosing UI Framework 2026](https://lalatenduswain.medium.com/choosing-the-right-ui-framework-in-2026-tailwind-css-vs-bootstrap-vs-material-ui-vs-shadcn-ui-c5842f4c7e91)_

---

### Herramientas PWA: vite-plugin-pwa + Workbox

**vite-plugin-pwa** es la solucion estandar para convertir una app Vite en PWA:

- **Zero-config**: Genera automaticamente web app manifest y service worker.
- **Workbox integrado**: Usa Google Workbox internamente para gestion de cache y estrategias offline.
- **Dos modos**:
  - `generateSW`: Genera automaticamente un service worker completo con defaults de Workbox. Ideal para MVP.
  - `injectManifest`: Permite escribir tu propio service worker con inyeccion de manifest. Para control avanzado.
- **PWA instalable**: Genera los assets necesarios para que la app sea instalable en el dispositivo.

**Workbox 7** es el estandar de la industria para service workers:
- Estrategias de cache predefinidas (Cache First, Network First, Stale While Revalidate).
- Precaching de assets estaticos.
- Integracion nativa con Vite, webpack y Next.js.

**Estado de las PWAs en 2026**: No son un experimento — son una tecnologia madura y lista para produccion. Las APIs core son estables, Safari soporta push notifications desde iOS 16.4, y Workbox hace la implementacion directa.

_Fuentes: [vite-plugin-pwa Getting Started](https://vite-pwa-org.netlify.app/guide/), [vite-plugin-pwa GitHub](https://github.com/vite-pwa/vite-plugin-pwa), [PWA Performance Guide 2026](https://www.digitalapplied.com/blog/progressive-web-apps-2026-pwa-performance-guide), [PWA Frameworks 2026](https://www.alphabold.com/top-frameworks-and-tools-to-build-progressive-web-apps/)_

---

### Herramientas de Desarrollo y Testing

#### IDE y Agentes de IA

Los dos agentes dominantes en 2026 para desarrollo asistido:

**Claude Code (terminal-first, agent-first):**
- Opera como agente autonomo directamente en el terminal. Sin IDE grafico.
- Usa 5.5x menos tokens que Cursor para tareas identicas (test independiente: 33K tokens vs 188K).
- Contexto de 1M tokens con Opus 4.6.
- Ideal para tareas autonomas: "construye este componente", "implementa esta feature".

**Cursor (IDE-first, AI-assisted):**
- Fork de VS Code construido para desarrollo con IA.
- Acceso a multiples modelos (Claude + OpenAI) en una interfaz.
- El desarrollador conduce, la IA asiste con completions y sugerencias inline.
- Ideal para trabajo interactivo y revision de codigo.

**Recomendacion para tu flujo**: Ambos son complementarios. Claude Code para generar bloques de codigo y features completas. Cursor para trabajo interactivo, revision y refinamiento.

#### Build System

- **Vite**: Build tool principal. HMR sub-segundo. TypeScript zero-config.
- **ESLint + Prettier**: Linting y formateo estandar.
- **Vitest**: Framework de testing nativo de Vite. Misma configuracion, mismos plugins.
- **Playwright o Cypress**: Testing E2E para flujos criticos.

_Fuentes: [Claude Code vs Cursor 2026 - Builder.io](https://www.builder.io/blog/cursor-vs-claude-code), [Claude Code vs Cursor - SitePoint](https://www.sitepoint.com/claude-code-vs-cursor-comparison/), [AI Coding Assistants 2026](https://claude5.com/news/ai-coding-assistants-2026-real-developer-workflows-compared)_

---

### Deploy y Hosting

Para una PWA estatica (sin servidor), las tres plataformas principales ofrecen tiers gratuitos mas que suficientes:

| Plataforma | Bandwidth gratuito | Builds | Ventaja clave | Mejor para |
|------------|-------------------|--------|---------------|------------|
| **Cloudflare Pages** | Ilimitado | 500/mes | Bandwidth ilimitado, red edge global | Alto trafico, coste cero |
| **Netlify** | 100 GB/mes | 300 min/mes | Balance features/precio, formularios built-in | Facilidad de uso |
| **Vercel** | 100 GB/mes | 6000 min/mes | Integracion perfecta con React/Next.js | Ecosistema React/Next |
| **Firebase Hosting** | 360 MB/dia | -- | Backend Firebase integrado, excelente para SPAs/PWAs | Si usas Firebase backend |

**Recomendacion para MVP**: Cualquiera de las tres primeras funciona. Cloudflare Pages destaca por bandwidth ilimitado gratuito (sin sorpresas de facturacion). Vercel tiene la mejor integracion con el ecosistema React. Netlify ofrece el mejor balance general.

Para una PWA de habitos personal/early-stage, el tier gratuito de cualquiera de estas plataformas sera mas que suficiente durante mucho tiempo.

_Fuentes: [Cloudflare vs Vercel vs Netlify 2026](https://dev.to/dataformathub/cloudflare-vs-vercel-vs-netlify-the-truth-about-edge-performance-2026-50h0), [Vercel vs Netlify vs Cloudflare 2026 - Codebrand](https://www.codebrand.us/blog/vercel-vs-netlify-vs-cloudflare-2026/), [Awesome Web Hosting 2026](https://github.com/iSoumyaDey/Awesome-Web-Hosting-2026)_

---

### Tendencias de Adopcion y Comunidad

#### El fenomeno del Vibe Coding

El vibe coding ha explotado en 2026 con mas de 150,000 posts mensuales en X con el hashtag #VibeCoding. Miles de desarrolladores y no-desarrolladores estan lanzando productos reales con apps reales, usuarios reales y revenue real usando flujos de trabajo de vibe coding.

**El stack dominante del vibe coding**:
- TypeScript + React + Vite + Tailwind como base
- shadcn/ui para componentes
- Supabase como backend (cuando se necesita)
- Claude Opus o GPT como modelo de IA

**Implicacion para tu proyecto**: Al elegir el stack dominante del vibe coding, maximizas la calidad del codigo que los agentes de IA generaran para ti. Cada componente de este stack tiene la mayor representacion en los datos de entrenamiento de los LLMs.

#### Tendencias tecnologicas con mas traccion en 2026

1. **Local-first como arquitectura dominante**: No es una feature — es una estrategia. Datos en el dispositivo, sync opcional. Motivado por privacidad, rendimiento y coste. FOSDEM 2026 tuvo un track dedicado completo a [local-first, sync engines y CRDTs](https://fosdem.org/2026/schedule/track/local-first/).

2. **PWA como estrategia MVP dominante**: El consenso para startups es "PWA-First, Native-Later". Se proyecta que las PWAs capturen el 60% de proyectos de desarrollo movil empresarial en 2026. Coste 40-60% menor que desarrollo nativo.

3. **Tailwind v4 como estandar de styling**: La v4 con su Oxide Engine y builds en microsegundos ha consolidado Tailwind como el estandar. shadcn/ui como la capa de componentes preferida.

4. **IA agente como co-desarrollador**: La transicion de "IA que sugiere" a "IA que ejecuta" esta completa. Claude Code opera como agente autonomo. El flujo es: describes -> la IA construye -> tu revisas.

5. **WebMCP (emergente)**: Google Chrome ha lanzado WebMCP en early preview (Chrome 146 Canary), convirtiendo cada sitio web en una herramienta estructurada para agentes de IA. Es un W3C Draft Community Report desde febrero 2026. Aunque es temprano, senala la direccion: las apps web seran consumidas directamente por agentes de IA.

_Fuentes: [Vibe Coding Complete Guide 2026](https://www.gauraw.com/vibe-coding-complete-guide-2026/), [Best Vibe Coding Tools 2026](https://manus.im/blog/best-vibe-coding-tools), [FOSDEM 2026 Local-First Track](https://fosdem.org/2026/schedule/track/local-first/), [PWA Frameworks 2026 - WebOsmotic](https://webosmotic.com/blog/pwa-frameworks/), [WebMCP - VentureBeat](https://venturebeat.com/infrastructure/google-chrome-ships-webmcp-in-early-preview-turning-every-website-into-a), [MCP Apps Blog](http://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)_

---

### Preparacion para IA Agentica (MCP y WebMCP)

Un requisito clave de tu proyecto: que una IA agentica pueda interactuar con tu app (como crear eventos en un calendario). Hay dos vias complementarias que estan madurando:

#### MCP (Model Context Protocol) — Backend

MCP es el protocolo estandar para que sistemas de IA integren datos y herramientas externas. Introducido por Anthropic en noviembre 2024, adoptado por OpenAI (marzo 2025), Google DeepMind, y donado a la Linux Foundation (diciembre 2025).

**MCP Apps** (enero 2026) permite que herramientas devuelvan componentes UI interactivos que se renderizan directamente en la conversacion. Clientes como ChatGPT, Claude, Goose y VS Code ya soportan esta capacidad.

**Para tu app**: Podrias exponer un MCP server que permita a agentes de IA:
- Registrar un habito completado ("Marca mi habito de lectura como completado hoy")
- Consultar rachas ("Cuanto llevo sin fumar?")
- Ver el heatmap ("Muestrame mi progreso de este mes")

SDKs disponibles en TypeScript, Python, C# y Java.

#### WebMCP — Browser/Frontend

WebMCP es la implementacion browser-native de MCP, disponible como early preview en Chrome 146 Canary desde febrero 2026. Es un W3C Draft Community Group Report.

**Diferencia clave**: MCP opera como protocolo backend (servidor). WebMCP opera enteramente client-side dentro del navegador. No requiere Node.js ni procesos nativos.

**Para tu app**: WebMCP permitiria que agentes de IA interactuen directamente con tu PWA en el navegador, sin necesidad de un servidor intermediario. Dado que tu app es local-first sin backend, esta es la via mas natural.

**Estado actual**: Early preview, detras de un flag en Chrome Canary. No esta listo para produccion, pero define la direccion del ecosistema. Disenar tu app con una capa de datos bien estructurada (Dexie.js con esquema claro) te prepara automaticamente para exponer esos datos via WebMCP cuando madure.

#### Recomendacion de arquitectura para "agentic-ready"

Para que tu app este preparada para integracion con IA agentica sin sobre-ingenieria:

1. **Capa de datos separada**: Dexie.js con esquema tipado y operaciones CRUD bien definidas en un modulo separado (no acopladas a componentes React).
2. **Service layer**: Funciones puras que encapsulan la logica de negocio (crear habito, registrar dia, calcular racha) independientes de la UI.
3. **API interna clara**: Estas funciones son las que un MCP server o WebMCP expondria a agentes de IA. Si tu logica de negocio esta bien encapsulada, exponer un MCP server despues es trivial.
4. **Esquema de datos documentado**: Un esquema claro permite que los agentes de IA entiendan la estructura sin ambiguedad.

Esta arquitectura no anade complejidad al MVP — es simplemente buena separacion de responsabilidades que, como efecto secundario, hace tu app "agentic-ready".

_Fuentes: [MCP Apps Blog](http://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/), [WebMCP Early Preview](https://dev.to/onsen/webmcp-is-available-for-early-preview-what-you-need-to-know-3b32), [WebMCP - VentureBeat](https://venturebeat.com/infrastructure/google-chrome-ships-webmcp-in-early-preview-turning-every-website-into-a), [MCP Official](https://modelcontextprotocol.io/), [MCP Web](https://mcp-b.ai/)_

<!-- Next steps will be appended here -->

## Integration Patterns Analysis

### Arquitectura de Capas para PWA Local-First

Para una PWA local-first sin backend, los patrones de integracion no son entre microservicios — son entre las capas internas de la aplicacion y con el mundo exterior (agentes de IA, exportacion de datos, futuro sync). La clave es una separacion limpia que haga cada capa independiente y testeable.

#### Patron recomendado: Hooks de dominio sobre Service Layer

La arquitectura moderna en React 2026 usa custom hooks como capa de abstraccion entre la UI y los datos. El patron es:

```
UI (React Components)
    |
    v
Custom Hooks de dominio (useHabits, useRecords, useStreaks)
    |
    v
Service Layer (habitService, recordService, streakCalculator)
    |
    v
Data Layer (Dexie.js / IndexedDB)
```

**Capa 1 — Data Layer (Dexie.js)**
- Define el esquema de la base de datos con tipos TypeScript.
- Expone la instancia de Dexie con tablas tipadas.
- Maneja migraciones de esquema (versionado de Dexie).
- No contiene logica de negocio — solo CRUD y queries.

**Capa 2 — Service Layer (funciones puras)**
- Encapsula la logica de negocio: crear habito, registrar dia, calcular racha, detectar patrones.
- Funciones puras que reciben datos y devuelven resultados.
- No conocen React ni la UI — son independientes del framework.
- **Esta es la capa que un MCP server expondria a agentes de IA.**
- Testeable con unit tests simples (Vitest).

**Capa 3 — Custom Hooks de dominio**
- `useHabits()`, `useRecords()`, `useStreaks()`, `useHeatmapData()`.
- Conectan el Service Layer con React usando `useLiveQuery()` de Dexie.
- Encapsulan estados de carga, errores y logica reactiva.
- Los componentes dependen de hooks abstractos, no de la implementacion.
- Si cambias Dexie por otra DB, solo modificas esta capa — los componentes no cambian.

**Capa 4 — UI (React Components)**
- Componentes puros que consumen hooks de dominio.
- No acceden directamente a Dexie ni al Service Layer.
- Responsabilidad unica: renderizar y capturar interacciones del usuario.

**Por que este patron es ideal para desarrollo con IA:**
- Los agentes de IA generan mejor codigo cuando cada archivo tiene una responsabilidad clara.
- Puedes pedir "crea el hook useHabits" o "implementa streakCalculator" como tareas aisladas.
- Menos acoplamiento = menos errores de generacion = menos correcciones manuales.

_Nivel de confianza: ALTO. Patron estandar en React 2026._
_Fuentes: [React Custom Hooks 2026 - TheLinuxCode](https://thelinuxcode.com/react-custom-hooks-in-2026-a-practical-guide-to-cleaner-components-fewer-bugs-and-faster-product-delivery/), [React Architecture Patterns 2026](https://www.bacancytechnology.com/blog/react-architecture-patterns-and-best-practices), [6 Best React Design Patterns 2026](https://www.designrush.com/best-designs/websites/trends/react-design-patterns), [React Stack Patterns](https://www.patterns.dev/react/react-2026/)_

---

### Integracion con MCP (Model Context Protocol)

#### Como exponer tu app a agentes de IA via MCP

El SDK oficial de MCP en TypeScript (v1.27.1) permite crear un MCP server que expone tres tipos de capacidades:

1. **Tools**: Permiten que los LLMs pidan al servidor ejecutar acciones.
2. **Resources**: Exponen datos de solo lectura que los clientes pueden mostrar a usuarios o modelos.
3. **Prompts**: Plantillas reutilizables para interacciones consistentes.

**Para tu app de habitos, un MCP server expondria:**

| Capacidad | Tipo MCP | Ejemplo |
|-----------|----------|---------|
| Registrar habito completado | Tool | "Marca lectura como completado hoy con intensidad 4" |
| Listar habitos activos | Resource | Devuelve lista de habitos con su configuracion |
| Consultar racha actual | Tool | "Cuantos dias llevo con el habito de correr?" |
| Obtener datos del heatmap | Resource | Devuelve registros del mes para un habito |
| Crear nuevo habito | Tool | "Crea un habito de meditar, frecuencia diaria, dificultad normal" |

**Implementacion practica:**

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { habitService } from "./services/habitService";

const server = new McpServer({ name: "habit-tracker", version: "1.0.0" });

// Tool: registrar habito
server.tool("record_habit", {
  habitId: z.string(),
  date: z.string(),
  completed: z.boolean(),
  intensity: z.number().optional(),
  note: z.string().optional()
}, async ({ habitId, date, completed, intensity, note }) => {
  await habitService.recordDay(habitId, date, completed, intensity, note);
  return { content: [{ type: "text", text: "Habito registrado correctamente" }] };
});

// Resource: listar habitos
server.resource("habits://list", async () => {
  const habits = await habitService.getAllHabits();
  return { contents: [{ uri: "habits://list", text: JSON.stringify(habits) }] };
});
```

**Framework alternativo — FastMCP:**
FastMCP esta construido sobre el SDK oficial y simplifica la creacion de servidores MCP eliminando detalles de implementacion de bajo nivel. Util si quieres un MCP server rapido sin configuracion manual de transportes.

**Momento de implementar MCP**: No en el MVP. Pero si tu Service Layer esta bien encapsulado (funciones puras con entrada/salida clara), crear el MCP server despues es literalmente envolver esas funciones con el SDK. El esfuerzo es minimo si la arquitectura es correcta.

_Fuentes: [MCP TypeScript SDK GitHub](https://github.com/modelcontextprotocol/typescript-sdk), [MCP SDK npm](https://www.npmjs.com/package/@modelcontextprotocol/sdk), [How to build MCP servers - DEV](https://dev.to/shadid12/how-to-build-mcp-servers-with-typescript-sdk-1c28), [FastMCP GitHub](https://github.com/punkpeye/fastmcp), [Build MCP Server - freeCodeCamp](https://www.freecodecamp.org/news/how-to-build-a-custom-mcp-server-with-typescript-a-handbook-for-developers/)_

---

### Portabilidad de Datos: Exportacion e Importacion

Un principio sagrado de tu brainstorming (#27): los datos nunca se borran. Complementado por el requisito GDPR de portabilidad. La exportacion/importacion es critica.

**Formato de exportacion recomendado: JSON**
- Formato nativo de IndexedDB/Dexie.js — la exportacion es trivial.
- Legible por humanos y por maquinas.
- Compatible con cualquier sistema de importacion futuro.
- Incluir metadatos: version del esquema, fecha de exportacion, identificador de la app.

**Estructura de exportacion sugerida:**

```json
{
  "version": "1.0.0",
  "exportedAt": "2026-03-05T10:30:00Z",
  "app": "habit-tracker",
  "data": {
    "habits": [...],
    "records": [...],
    "settings": {...}
  }
}
```

**Funcionalidades de portabilidad para el MVP:**
1. **Exportar todo**: Descarga un archivo JSON con todos los datos.
2. **Importar desde archivo**: Carga un JSON y fusiona/reemplaza datos.
3. **Eliminar todo**: Borra todos los datos locales (requisito GDPR "derecho al olvido").

**Consideraciones tecnicas:**
- IndexedDB en PWA esta ligada al origen (dominio). Si el usuario cambia de navegador o dispositivo, pierde los datos a menos que exporte/importe.
- Esta limitacion se resuelve con Dexie Cloud (sync comercial) o un backend propio en fases futuras.
- Para el MVP, exportacion/importacion manual es suficiente y honesto.

_Fuentes: [PWA Offline Data - web.dev](https://web.dev/learn/pwa/offline-data), [The PWA Data Trap - Medium](https://scottkuhl.medium.com/the-pwa-data-trap-5bd94d546348), [Offline Storage for PWAs - LogRocket](https://blog.logrocket.com/offline-storage-for-pwas/)_

---

### Seguridad de Datos Locales

#### El problema: IndexedDB no cifra datos

IndexedDB almacena datos en texto plano. Cualquier JavaScript ejecutandose en el mismo origen puede acceder a la base de datos. Esto es un riesgo si:
- Se cargan scripts de terceros (analytics, ads) que podrian acceder a la DB.
- El dispositivo es compartido y alguien inspecciona DevTools.
- Se almacenan datos sensibles (notas personales sobre habitos de salud, sobriedad, etc.).

#### Estrategia de seguridad para el MVP

**Nivel 1 — Minimo viable (MVP):**
- HTTPS obligatorio (requisito de PWA — los service workers solo funcionan sobre HTTPS).
- Content Security Policy (CSP) estricta para prevenir XSS y scripts no autorizados.
- No almacenar secretos (tokens, passwords) en IndexedDB.
- Minimizar scripts de terceros.

**Nivel 2 — Cifrado selectivo (post-MVP):**
- Usar la Web Crypto API para cifrar datos sensibles antes de guardarlos en IndexedDB.
- AES-GCM es el algoritmo recomendado — proporciona autenticacion integrada.
- La clave de cifrado se deriva de una password del usuario via PBKDF2.
- IndexedDB puede almacenar objetos CryptoKey directamente sin exponer el material de la clave.

**Flujo de cifrado con Web Crypto API:**
```
Password del usuario
    |
    v (PBKDF2 + salt aleatorio)
CryptoKey AES-GCM
    |
    v (encrypt con IV aleatorio)
Datos cifrados -> IndexedDB
```

- El IV (Initialization Vector) debe ser unico por operacion de cifrado — se almacena junto con los datos cifrados.
- La clave nunca se almacena en texto plano — se regenera desde la password cada sesion.

**Nivel 3 — Modelo BYO-AI (Fase 1):**
- Las conversaciones con el agente de IA van directamente del navegador al proveedor de IA del usuario.
- Tu app nunca ve, almacena ni procesa esas conversaciones.
- Ventaja regulatoria enorme (ya documentada en el domain research).

**Recomendacion para el MVP**: Nivel 1 es suficiente. Los datos de un tracker de habitos (habito: "leer", completado: si, intensidad: 3) no son altamente sensibles. Las notas personales podrian serlo, pero para el MVP la prioridad es funcionalidad. El cifrado selectivo se anade en post-MVP cuando haya funcionalidades mas sensibles (notas de reflexion, conversaciones con IA).

_Fuentes: [IndexedDB Encryption Issue - W3C](https://github.com/w3c/IndexedDB/issues/191), [PWA Security Best Practices](https://blog.pixelfreestudio.com/best-practices-for-pwa-security/), [Web Crypto API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API), [AES-GCM with Web Crypto](https://gist.github.com/junderw/1d41158403978ba0363e5868d4f434d9), [Front-End Security 2026 - CloudSEK](https://www.cloudsek.com/knowledge-base/front-end-security-best-practices), [Offline-First Security - Medium](https://medium.com/offline-camp/offline-first-security-59bf4800e82a)_

<!-- Next steps will be appended here -->

## Architectural Patterns and Design

### Arquitectura del Sistema: SPA + App Shell + Local-First

Tu app combina tres patrones arquitectonicos complementarios:

**1. Single Page Application (SPA)**
React + Vite genera una SPA que se ejecuta enteramente en el navegador. Toda la logica, navegacion y renderizado ocurren en el cliente. No hay servidor — solo archivos estaticos (HTML, JS, CSS) servidos desde un CDN.

**2. App Shell Pattern**
El patron App Shell separa la "carcasa" de la app (header, navegacion, layout) del contenido dinamico. El service worker cachea agresivamente el shell para que la app cargue instantaneamente en visitas repetidas, independientemente de la red. El contenido (datos de habitos) se carga desde IndexedDB local.

- Beneficio: tiempo de carga sub-1-segundo en visitas repetidas.
- Implementacion: vite-plugin-pwa con estrategia `generateSW` cachea automaticamente todos los assets del build.

**3. Local-First**
Los datos viven en el dispositivo del usuario (IndexedDB via Dexie.js). No hay llamadas a API, no hay latencia de red, no hay dependencia de un backend. La app funciona al 100% offline desde el primer uso.

- Los datos son la "fuente de verdad" local, no una cache de un servidor.
- Sync con cloud es una capa opcional futura, no un requisito.
- Alineado con privacy by design: los datos no salen del dispositivo.

_Fuentes: [PWA Architecture - web.dev](https://web.dev/learn/pwa/architecture), [PWA Performance Guide 2026](https://www.digitalapplied.com/blog/progressive-web-apps-2026-pwa-performance-guide), [Offline-First PWA Caching Strategies](https://www.magicbell.com/blog/offline-first-pwas-service-worker-caching-strategies), [PWA Best Practices 2026](https://wirefuture.com/post/progressive-web-apps-pwa-best-practices-for-2026)_

---

### Estructura de Proyecto: Feature-Based Architecture

La estructura feature-based es el estandar para React en 2026. Organiza el codigo por capacidad de negocio, no por tipo tecnico.

**Estructura recomendada para tu MVP:**

```
src/
├── app/                    # Configuracion global de la app
│   ├── App.tsx             # Componente raiz
│   ├── router.tsx          # Configuracion de rutas
│   └── providers.tsx       # Context providers globales
│
├── features/               # Modulos de negocio autocontenidos
│   ├── habits/             # Todo sobre habitos
│   │   ├── components/     # Componentes UI del feature
│   │   ├── hooks/          # useHabits(), useHabitForm()
│   │   ├── services/       # habitService (logica de negocio)
│   │   ├── types.ts        # Tipos TypeScript del feature
│   │   └── index.ts        # Barrel export
│   │
│   ├── records/            # Registro diario de habitos
│   │   ├── components/
│   │   ├── hooks/          # useRecords(), useTodayRecords()
│   │   ├── services/       # recordService
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   ├── heatmap/            # Visualizacion heatmap
│   │   ├── components/     # HeatmapGrid, HeatmapCell
│   │   ├── hooks/          # useHeatmapData()
│   │   ├── services/       # heatmapCalculator
│   │   └── index.ts
│   │
│   ├── streaks/            # Calculo y display de rachas
│   │   ├── components/
│   │   ├── hooks/          # useStreaks()
│   │   ├── services/       # streakCalculator
│   │   └── index.ts
│   │
│   └── settings/           # Configuracion y datos del usuario
│       ├── components/
│       ├── hooks/
│       ├── services/       # exportService, importService
│       └── index.ts
│
├── shared/                 # Utilidades compartidas entre features
│   ├── components/         # Button, Card, Modal (shadcn/ui)
│   ├── hooks/              # useLocalStorage, useMediaQuery
│   ├── utils/              # formatDate, generateId
│   └── types.ts            # Tipos compartidos
│
├── db/                     # Capa de datos (Dexie.js)
│   ├── database.ts         # Instancia y esquema de Dexie
│   ├── migrations.ts       # Versionado de esquema
│   └── types.ts            # Tipos del modelo de datos
│
└── styles/                 # Estilos globales y tema
    └── globals.css         # Tailwind imports y variables CSS
```

**Principios clave:**
- Cada feature es autocontenido — tiene sus propios componentes, hooks, servicios y tipos.
- Los features no importan directamente de otros features — usan `shared/` o `db/` como intermediarios.
- La carpeta `db/` es la unica que conoce Dexie.js — todos los demas acceden a datos via services/hooks.
- Los barrel exports (`index.ts`) controlan que se expone de cada feature.

**Por que funciona bien con desarrollo por IA:**
- Puedes pedir "crea el feature de heatmap" como una tarea aislada.
- Cada feature tiene limites claros — la IA no necesita entender toda la app para trabajar en un feature.
- Las dependencias estan explicitas (imports) — menos errores de la IA por desconocer el contexto.

_Fuentes: [React Folder Structure - Robin Wieruch](https://www.robinwieruch.de/react-folder-structure/), [bulletproof-react Project Structure](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md), [React Project Structure for Scale](https://www.developerway.com/posts/react-project-structure), [Scalable React UIs 2026](https://createbytes.com/insights/frontend-components-react-scalable-ui)_

---

### Gestion de Estado

Para tu app, la gestion de estado es inusualmente simple porque Dexie.js + `useLiveQuery()` ya proporciona reactividad sobre los datos persistidos. No necesitas un store global para la mayor parte de la app.

**Estrategia de estado por tipo:**

| Tipo de estado | Solucion | Ejemplo |
|---------------|----------|---------|
| **Datos persistidos** (habitos, registros) | Dexie.js + useLiveQuery() | Lista de habitos, historial de registros |
| **Estado de UI local** | useState de React | Modal abierto/cerrado, tab activo |
| **Estado compartido global** | React Context | Tema (claro/oscuro), idioma, preferencias |
| **Estado complejo de formulario** | useState o React Hook Form | Formulario de creacion de habito |

**Por que NO necesitas Zustand/Redux para el MVP:**
- Zustand (~3KB) es excelente para estado global complejo, pero tus datos reactivos ya estan en Dexie.
- Redux Toolkit (~15KB) es overengineering para una app local-first sin API calls.
- React Context es suficiente para lo global (tema, settings) — solo son valores estables que cambian raramente, exactamente lo que Context hace bien.

**Si en el futuro necesitas mas:**
- Zustand se anade facilmente sin cambiar nada existente (no es invasivo).
- Para la Fase 1 (agente IA), podrias necesitar Zustand para estado de la conversacion en curso.
- Pero para el MVP, Dexie + Context es todo lo que necesitas.

_Nivel de confianza: ALTO. Consenso claro en la comunidad React 2026._
_Fuentes: [State Management 2026 - Veduis](https://veduis.com/blog/state-management-comparing-zustand-signals-redux/), [Zustand vs Jotai vs Redux vs Signals 2026](https://dev.to/jsgurujobs/state-management-in-2026-zustand-vs-jotai-vs-redux-toolkit-vs-signals-2gge), [Zustand and React Context - TkDodo](https://tkdodo.eu/blog/zustand-and-react-context)_

---

### Routing: React Router v7 en modo SPA

React Router v7 es la fusion de React Router + Remix. Para tu caso, se usa en **modo libreria SPA** (no modo framework):

- Configurar `ssr: false` en `react-router.config.ts` para generar una SPA pura.
- File-based routing opcional — define rutas desde el sistema de archivos.
- Type-safe routing con generacion automatica de tipos.
- Loaders y actions disponibles incluso en modo SPA (utiles para cargar datos de Dexie).

**Rutas del MVP (estimadas):**

```
/                     # Dashboard principal (heatmap + resumen)
/habits               # Lista de habitos
/habits/new           # Crear nuevo habito
/habits/:id           # Detalle de un habito
/habits/:id/edit      # Editar habito
/settings             # Configuracion, export/import
```

_Fuentes: [React Router SPA Mode](https://reactrouter.com/how-to/spa), [React Router v7 Guide - Medium](https://medium.com/@nomannayeem/react-router-7-the-ultimate-guide-to-the-new-features-and-framework-capabilities-06e7f06981f6), [React Router v7 Modes - LogRocket](https://blog.logrocket.com/react-router-v7-modes/)_

---

### Componente Heatmap: Opciones de Visualizacion

El heatmap estilo GitHub es el componente visual central de tu app. Opciones disponibles:

**1. @uiw/react-heat-map (RECOMENDADO)**
- Ligero, basado en SVG, personalizable.
- Customizable version del contribution graph de GitHub.
- Activamente mantenido.
- npm: `@uiw/react-heat-map`

**2. react-calendar-heatmap**
- SVG, configurable, se expande al tamano del contenedor.
- Usa clases CSS para colores — facil de integrar con Tailwind.
- npm: `react-calendar-heatmap`

**3. shadcn Calendar Heatmap**
- Construido con Next.js, TypeScript, Tailwind y React-Day-Picker.
- Integra con shadcn/ui nativamente — styling por variantes.
- Mejor accesibilidad que las opciones SVG puras.
- Moderno pero menos maduro.

**4. Implementacion propia**
- Un grid de divs con Tailwind CSS (como hace GitHub).
- Control total, zero dependencias.
- Factible dado que es un grid de cuadrados con colores.
- Los agentes de IA pueden generar esto facilmente.

**Recomendacion**: Empezar con `@uiw/react-heat-map` para el MVP (rapido, probado). Si necesitas mas control o quieres eliminar la dependencia, una implementacion propia con Tailwind CSS grid es viable y los agentes de IA la generan bien.

_Fuentes: [react-heat-map](https://uiwjs.github.io/react-heat-map/), [react-heat-map GitHub](https://github.com/uiwjs/react-heat-map), [react-calendar-heatmap npm](https://www.npmjs.com/package/react-calendar-heatmap), [shadcn Calendar Heatmap](https://www.shadcn.io/template/gurbaaz27-shadcn-calendar-heatmap)_

---

### Estrategia de Testing

Testing en React 2026 funciona mejor como estrategia por capas:

**Capa 1 — Unit tests (Service Layer)**
- **Vitest** como runner (10-20x mas rapido que Jest en codebases grandes).
- Testear funciones puras del Service Layer: streakCalculator, habitService, heatmapCalculator.
- Misma configuracion que la app (plugins Vite, TypeScript) — zero config adicional.
- Prioridad ALTA: esta logica es el core de tu app.

**Capa 2 — Component tests (Hooks + Components)**
- **Vitest + React Testing Library** para testing de componentes.
- Testear comportamiento del usuario, no detalles de implementacion.
- Un test por componente para la accion principal del usuario.
- Prioridad MEDIA: importante pero la logica critica esta en la capa de servicios.

**Capa 3 — E2E tests (flujos criticos)**
- **Playwright** para 3-5 flujos criticos: crear habito, registrar dia, ver heatmap, exportar datos.
- No testear todo E2E — solo los caminos que, si fallan, la app no sirve.
- Prioridad BAJA para MVP: los unit tests del Service Layer cubren la mayor parte del riesgo.

**IA en testing (2026):**
- El 84% de desarrolladores usa IA para testing — puede acelerar la creacion de tests hasta un 60%.
- Pero la IA es asistente, no la estrategia. Los humanos disenan que testear; la IA genera el codigo del test.
- Los agentes de IA generan excelentes tests para funciones puras (Service Layer) — es su punto fuerte.

_Fuentes: [Testing 2026 - Nucamp](https://www.nucamp.co/blog/testing-in-2026-jest-react-testing-library-and-full-stack-testing-strategies), [Vitest Component Testing](https://vitest.dev/guide/browser/component-testing), [Unit Test React with Vitest](https://oneuptime.com/blog/post/2026-01-15-unit-test-react-vitest-testing-library/view), [React Testing with Vitest - Medium](https://vaskort.medium.com/bulletproof-react-testing-with-vitest-rtl-deeaabce9fef)_

---

### Estrategias de Cache del Service Worker

Para tu PWA offline-first, la estrategia de cache define como se comporta la app con y sin red:

**Assets estaticos (JS, CSS, imagenes): Cache-First**
- El service worker sirve desde cache siempre. Solo actualiza cuando hay nueva version.
- Workbox precaching maneja esto automaticamente con vite-plugin-pwa.
- Resultado: la app carga instantaneamente tras la primera visita.

**App Shell (index.html, layout): Cache-First con actualizacion**
- El shell se sirve desde cache para carga inmediata.
- En background, el service worker comprueba si hay nueva version.
- Si hay actualizacion, muestra un prompt "Nueva version disponible" para que el usuario recargue.

**Datos de habitos (IndexedDB): No requiere cache**
- Los datos ya estan en IndexedDB local — no pasan por el service worker.
- Dexie.js accede directamente a IndexedDB sin red.
- Esta es la ventaja fundamental de local-first: los datos no necesitan estrategia de cache porque nunca salen del dispositivo.

**Configuracion de vite-plugin-pwa para tu caso:**
```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt', // Muestra prompt de actualizacion
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // Cache-first para todos los assets estaticos
      },
      manifest: {
        name: 'Habit Tracker',
        short_name: 'Habits',
        theme_color: '#10b981',
        // ... manifest PWA
      }
    })
  ]
});
```

_Fuentes: [Offline-First PWA Caching - MagicBell](https://www.magicbell.com/blog/offline-first-pwas-service-worker-caching-strategies), [PWA Caching - MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching), [PWA Offline Caching Best Practices](https://blog.pixelfreestudio.com/best-practices-for-pwa-offline-caching-strategies/)_

## Enfoques de Implementacion y Adopcion Tecnologica

### Estrategias de Adopcion Tecnologica

Para el stack seleccionado (React + Vite + TypeScript + Dexie.js + Tailwind v4 + shadcn/ui), la estrategia optima es **adopcion incremental por capas**:

1. **Scaffold base**: `npm create vite@latest` con template `react-ts`, luego agregar `vite-plugin-pwa` con `registerType: 'autoUpdate'` — esto da PWA funcional desde el dia 1
2. **UI layer**: shadcn/ui ya soporta Tailwind v4 nativamente con la nueva directiva `@theme` y colores OKLCH. La CLI (`npx shadcn-ui@latest init`) configura todo automaticamente para Vite. Todos los componentes actualizados para Tailwind v4 y React 19. La animacion ahora usa `tw-animate-css` en lugar del deprecado `tailwindcss-animate`
3. **Data layer**: Dexie.js como unica capa de datos — sin backend, sin complejidad de sync. Para el MVP, el patron es single-user local-first, donde Dexie brilla especialmente. Las operaciones corren contra IndexedDB local primero, garantizando responsividad sin conexion
4. **PWA hardening**: Configurar Workbox con `generateSW` (default) para pre-cachear el app shell, y `StaleWhileRevalidate` para assets dinamicos. El hook `useRegisterSW` de `virtual:pwa-register/react` permite recibir notificaciones de actualizacion directamente en React

**Patron de migracion futura**: Si eventualmente se necesita sync multi-dispositivo, Dexie Cloud ofrece sincronizacion como add-on sin cambiar la capa de datos del frontend.

_Fuentes: [vite-plugin-pwa Guide](https://vite-pwa-org.netlify.app/guide/), [shadcn/ui Tailwind v4](https://ui.shadcn.com/docs/tailwind-v4), [Dexie.js](https://dexie.org/), [Service Worker Precache - Vite PWA](https://vite-pwa-org.netlify.app/guide/service-worker-precache)_

### Workflows de Desarrollo con IA

En 2026, el workflow optimo para solo-dev + IA se estructura asi:

**Herramientas complementarias:**
- **Claude Code** para tareas complejas multi-archivo, refactors grandes y scaffolding greenfield — ejecuta workflows completos y entrega diffs para revisar. Agent Teams (lanzado con Opus 4.6, febrero 2026) permite agentes que se comunican entre si y coordinan mediante task list compartida
- **Cursor** para coding diario en flow-state, completions inline y ediciones rapidas. Los cloud agents ahora corren en VMs aisladas, permitiendo hasta 10-20 agentes trabajando en paralelo

**Metodologia recomendada:**
- **"Prompt Plan" file**: Generar un archivo spec con requisitos, arquitectura, modelos de datos y estrategia de testing. Alimentar al modelo para generar un plan de implementacion en tareas bite-sized
- **Roles especializados**: Separar el trabajo en comandos (Plan, Build, Review, Fix, Test) con reglas compartidas de calidad y seguridad
- **Iteraciones pequenas**: Cada tarea completable en una sesion — los LLMs son mejores en tareas contenidas y dirigidas
- **Quality gates**: Tests + monitoring + AI-on-AI code reviews para mantener la calidad del codigo generado

El proyecto ya utiliza BMAD Method, lo cual alinea perfectamente con este enfoque de "roles claros, limites claros, criterios de completitud claros".

_Fuentes: [Addy Osmani - LLM Coding Workflow 2026](https://addyosmani.com/blog/ai-coding-workflow/), [Cursor vs Claude Code 2026](https://www.builder.io/blog/cursor-vs-claude-code), [Solo Dev AI Tools 2026](https://www.builtthisweek.com/blog/solo-developer-ai-tools), [AI-Powered Dev Workflow 2026](https://dev.to/devactivity/the-ai-powered-dev-workflow-reshaping-software-engineering-in-2026-1mk4)_

### Testing y Aseguramiento de Calidad

Estrategia de testing en **3 capas** optimizada para desarrollo con IA:

| Capa | Herramienta | Proposito | Cobertura Target |
|------|-------------|-----------|------------------|
| **Unit** | Vitest | Logica de negocio, servicios, utils | 80%+ |
| **Component** | Vitest + React Testing Library | Componentes UI, interacciones usuario | Componentes criticos |
| **E2E** | Playwright | 3-5 flujos criticos (crear habito, check-in, ver progreso) | Happy paths |

**Claves de implementacion:**

- **Vitest** da 10-20x mas velocidad que Jest en proyectos Vite — feedback loop instantaneo. ~62% de empresas usan herramientas como Jest/Vitest/Playwright/Cypress
- **React Testing Library** para tests centrados en comportamiento del usuario, no implementacion interna
- **Playwright** para E2E en navegador real — critico para validar PWA offline y service worker
- **MSW (Mock Service Worker)** para mockear APIs futuras sin cambiar codigo de produccion
- **Vitest Browser Mode** permite component testing en navegador real con Playwright como provider, dando acceso a DOM real, CSS rendering y browser APIs
- **IA como asistente de testing**: ~84% de developers usan IA que puede acelerar creacion de tests hasta 60%, pero los humanos deben ser responsables del diseno y mantenimiento de tests

**Configuracion recomendada para el proyecto:**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
});
```

```typescript
// playwright.config.ts (E2E - solo flujos criticos)
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:5173',
  },
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true,
  },
});
```

_Fuentes: [Testing in 2026 - Nucamp](https://www.nucamp.co/blog/testing-in-2026-jest-react-testing-library-and-full-stack-testing-strategies), [Vitest Browser Mode](https://vitest.dev/guide/browser/), [Vitest + MSW + Playwright setup](https://dev.to/juan_deto/configure-vitest-msw-and-playwright-in-a-react-project-with-vite-and-ts-1d92), [React Component Testing with Vitest + Playwright](https://akoskm.com/react-component-testing-with-vitests-browser-mode-and-playwright/)_

### Despliegue y Practicas Operacionales

**Recomendacion principal: Cloudflare Pages** como plataforma de deploy.

| Plataforma | Free Tier | Bandwidth | Builds | Ventaja Principal |
|-----------|-----------|-----------|--------|-------------------|
| **Cloudflare Pages** | Permanente | Ilimitado | 500/mes | Costo cero, red edge mas grande (300+ ciudades) |
| Vercel | Hobby | 100GB/mes | Ilimitados | DX superior para Next.js |
| Netlify | Starter | 100GB/mes | 300 min/mes | Facil de usar |

**Para una PWA React+Vite sin SSR, Cloudflare Pages es la opcion clara:**
- Bandwidth ilimitado en free tier (las otras tienen limite)
- Red edge de 300+ ciudades = menor latencia global, especialmente fuera de Norteamerica
- Deploy automatico desde GitHub con `npm run build`
- Sin vendor lock-in — es un static site, migrar es trivial
- Preview deployments automaticos para PRs

**Pipeline CI/CD minimo:**

```yaml
# .github/workflows/ci.yml (GitHub Actions free tier: 2000 min/mes)
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      - run: npm ci
      - run: npx tsc --noEmit          # Type check
      - run: npx vitest run             # Unit + component tests
      - run: npx playwright install --with-deps
      - run: npx playwright test        # E2E tests
```

**Flujo de deploy:**
1. Push a `main` -> build automatico en Cloudflare Pages
2. PRs -> preview deployments automaticos
3. Pre-commit local: `vitest run` + `tsc --noEmit`
4. CI: suite completa incluyendo Playwright E2E

_Fuentes: [Cloudflare Pages Pricing](https://www.cloudflare.com/plans/developer-platform/), [Vercel vs Netlify vs Cloudflare 2026](https://www.codebrand.us/blog/vercel-vs-netlify-vs-cloudflare-2026/), [Cloudflare Pages Free Tier](https://www.freetiers.com/directory/cloudflare-pages)_

### Organizacion del Equipo y Habilidades

**Modelo: Solo Developer + AI Agents**

Para un perfil intermedio desarrollando principalmente con agentes IA:

**Estructura de trabajo:**
- **CLAUDE.md como "cerebro del proyecto"**: Definir convenciones, patrones arquitectonicos y reglas de calidad que los agentes IA deben seguir
- **Feature-based architecture**: Cada feature en su carpeta con componentes, hooks, servicios y tests — ideal para que los agentes IA tengan contexto aislado
- **Definition of Done clara**: Tests pasan, TypeScript compila sin errores, componente funciona offline
- **Iteraciones pequenas**: Cada tarea completable en una sesion de coding — los LLMs son mejores en tareas contenidas

**Habilidades a desarrollar:**
- TypeScript avanzado (generics, utility types) — los agentes generan mejor codigo con types fuertes
- React patterns (custom hooks, composition) — fundamentales para el feature-based approach
- Dexie.js queries y schema migrations
- Prompt engineering para coding agents — contexto claro = mejor output
- PWA lifecycle y service worker debugging

**Herramientas de productividad:**
- Un "main driver" (Cursor como IDE copilot) + un "strategy brain" (Claude Code para tareas complejas)
- BMAD Method para planificacion y gestion del proyecto
- GitHub para versionado y CI/CD

_Fuentes: [Solo Dev AI Workflow](https://medium.com/@giiannmichael/in-the-first-article-i-wrote-about-how-i-use-ai-as-a-solo-developer-and-why-i-stopped-treating-it-b34bc8600ac6), [AI Coding Assistants 2026](https://claude5.com/news/ai-coding-assistants-2026-developer-workflows-compared)_

### Optimizacion de Costos y Gestion de Recursos

**Costo total del MVP: $0** (excluyendo herramientas de desarrollo opcionales)

| Recurso | Costo | Notas |
|---------|-------|-------|
| Hosting (Cloudflare Pages) | $0 | Free tier permanente, bandwidth ilimitado |
| Base de datos | $0 | IndexedDB local via Dexie.js, sin servidor |
| CI/CD (GitHub Actions) | $0 | Free tier: 2000 min/mes |
| Dominio personalizado | ~$10/ano | Opcional para MVP |
| AI coding tools | Variable | Claude Code / Cursor subscriptions |

**Escalabilidad futura sin costo adicional inmediato:**
- Dexie Cloud ($) solo cuando se necesite sync multi-dispositivo
- Backend solo cuando se integre IA conversacional (modelo BYO-AI)
- El modelo local-first elimina costos de servidor durante todo el MVP
- Cloudflare Workers (free tier: 100K requests/dia) disponible si se necesita logica server-side

**Optimizacion del presupuesto de desarrollo:**
- Maximizar uso de componentes shadcn/ui pre-construidos para reducir tiempo de UI
- TypeScript strict mode previene bugs caros de debugging
- Tests automatizados reducen tiempo de QA manual
- Deploy automatico elimina overhead operacional

### Evaluacion de Riesgos y Mitigacion

| Riesgo | Probabilidad | Impacto | Mitigacion |
|--------|-------------|---------|------------|
| IndexedDB storage limits en movil | Media | Alto | Implementar limpieza de datos antiguos, monitorear usage con `navigator.storage.estimate()` |
| Tailwind v4 breaking changes | Baja | Medio | shadcn/ui abstrae la mayoria de cambios, usar versiones pinned |
| Service worker cache stale | Media | Medio | `registerType: 'autoUpdate'` + prompt de actualizacion al usuario |
| Dexie.js schema migrations | Media | Alto | Versionar schema desde el inicio, tests de migracion |
| PWA install prompt inconsistente | Alta | Bajo | Fallback con instruccion manual, detectar `beforeinstallprompt` |
| Perdida de datos del usuario | Baja | Critico | Export/import JSON desde dia 1, backup manual |
| Codigo generado por IA con bugs sutiles | Media | Medio | Tests obligatorios, TypeScript strict, code review pre-merge |
| Browser compatibility (features nuevos) | Baja | Medio | Consultar caniuse.com, polyfills cuando necesario |

---

## Recomendaciones de la Investigacion Tecnica

### Roadmap de Implementacion

1. **Sprint 0 - Fundacion**: Scaffold proyecto (Vite + React + TS + PWA + Tailwind v4 + shadcn/ui + Dexie.js), pipeline CI/CD en Cloudflare Pages, estructura feature-based, CLAUDE.md con convenciones
2. **Sprint 1 - Core**: Modelo de datos de habitos en Dexie, CRUD basico, UI core con shadcn/ui
3. **Sprint 2 - Engagement**: Sistema de check-in diario, racha (streak), vista de progreso visual
4. **Sprint 3 - Gamificacion**: Gamificacion etica basica (puntos, niveles, basada en Habitos Atomicos)
5. **Sprint 4 - IA**: Integracion IA conversacional (BYO-AI), pulido UX, export/import datos

### Recomendaciones del Stack Tecnologico

El stack decidido es **solido y validado** por la investigacion:

- **TypeScript + React + Vite**: Maxima compatibilidad con AI code generation, ecosistema maduro, documentacion abundante
- **Dexie.js**: La mejor opcion para local-first sin backend, API elegante, path claro a sync futuro
- **Tailwind v4 + shadcn/ui**: Componentes accesibles y personalizables, excelente DX, soporte actualizado
- **vite-plugin-pwa + Workbox**: Solucion zero-config para PWA, offline robusto
- **React Router v7**: SPA mode para routing sin servidor
- **Vitest + RTL + Playwright**: Stack de testing completo y rapido
- **Cloudflare Pages**: Deploy gratuito con performance global

**No se identificaron riesgos bloqueantes** con ninguna tecnologia del stack.

### Habilidades de Desarrollo Requeridas

| Habilidad | Nivel Actual | Nivel Necesario | Como Desarrollar |
|-----------|-------------|-----------------|------------------|
| TypeScript | Intermedio | Intermedio-Avanzado | Generics, utility types, strict mode |
| React Patterns | Intermedio | Intermedio | Custom hooks, composition, context |
| Dexie.js | Nuevo | Intermedio | Documentacion oficial + practica |
| Tailwind CSS v4 | Familiar | Intermedio | Practica con shadcn/ui |
| PWA/Service Workers | Basico | Intermedio | vite-plugin-pwa docs + Workbox guides |
| Testing (Vitest/Playwright) | Basico | Intermedio | Aprender en paralelo con desarrollo |

### Metricas de Exito y KPIs

**Performance:**
- Lighthouse PWA score >= 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- App funcional 100% offline tras primera carga

**Calidad:**
- 80%+ code coverage en logica de negocio
- 0 errores TypeScript (strict mode)
- 3-5 E2E tests cubriendo flujos criticos
- Build exitoso en CI para cada PR

**Desarrollo:**
- Build time < 5s
- Test suite completa < 30s
- Deploy automatico en < 2 min
- Cada story implementable en 1-2 sesiones de coding

---

# Sintesis de la Investigacion Tecnica: Stack Completo para MVP PWA de App de Habitos

## Resumen Ejecutivo

La presente investigacion tecnica analiza de forma exhaustiva las opciones tecnologicas para construir un MVP de app de habitos como Progressive Web App con arquitectura local-first. Tras evaluar multiples frameworks, bases de datos, patrones arquitectonicos y estrategias de implementacion — todos verificados contra fuentes actuales de 2025-2026 — el estudio concluye que el stack seleccionado es solido, validado por la industria y optimamente alineado con los objetivos del proyecto.

El movimiento local-first ha ganado traccion significativa en 2025-2026, impulsado por la demanda de usuarios que buscan privacidad, propiedad de datos y funcionamiento offline confiable. Las PWAs han pasado de tecnologia experimental a estandar de produccion, con todos los navegadores principales soportando completamente las APIs core (service workers, Web App Manifest, Web Push). Esta convergencia crea una oportunidad unica: construir una app de habitos que combina la experiencia nativa de una app movil con la privacidad inherente del almacenamiento local, a costo de infraestructura cero.

El desarrollo asistido por agentes de IA (Claude Code, Cursor) ha madurado significativamente, con Agent Teams y cloud agents habilitando workflows donde multiples agentes coordinan tareas complejas. El stack seleccionado maximiza la calidad del codigo generado por IA gracias a TypeScript strict mode, React como framework con mayor cobertura de entrenamiento, y una arquitectura feature-based que proporciona contexto aislado a cada agente.

**Hallazgos Tecnicos Clave:**

- **TypeScript + React + Vite** es la combinacion con mayor exito en generacion de codigo por IA, ecosistema mas maduro y documentacion mas abundante
- **Dexie.js** es la mejor opcion para local-first sin backend: API elegante sobre IndexedDB, path claro a sync futuro via Dexie Cloud
- **Tailwind v4 + shadcn/ui** proporciona componentes accesibles y personalizables con soporte nativo para las ultimas APIs CSS
- **Cloudflare Pages** ofrece hosting gratuito permanente con bandwidth ilimitado — la opcion clara para PWAs estaticas
- **Vitest + React Testing Library + Playwright** proporciona testing rapido (10-20x vs Jest) con cobertura completa
- El costo total de infraestructura del MVP es **$0**

**Recomendaciones Tecnicas:**

1. Adoptar el stack completo tal como se define — no se identificaron riesgos bloqueantes
2. Implementar arquitectura feature-based con Service Layer pattern para maxima compatibilidad con agentes IA
3. Priorizar offline-first desde Sprint 0 con vite-plugin-pwa y Workbox
4. Establecer pipeline CI/CD en Cloudflare Pages desde el inicio
5. Incluir export/import JSON desde dia 1 como salvaguarda contra perdida de datos

_Fuentes: [Local-First Software - Ink & Switch](https://www.inkandswitch.com/essay/local-first/), [PWA Best Practices 2026](https://wirefuture.com/post/progressive-web-apps-pwa-best-practices-for-2026), [Local-First Future - RxDB](https://rxdb.info/articles/local-first-future.html)_

## Tabla de Contenidos

1. Introduccion y Metodologia de la Investigacion
2. Landscape Tecnico y Analisis de Arquitectura
3. Enfoques de Implementacion y Mejores Practicas
4. Evolucion del Stack Tecnologico y Tendencias Actuales
5. Patrones de Integracion e Interoperabilidad
6. Analisis de Rendimiento y Escalabilidad
7. Consideraciones de Seguridad y Privacidad
8. Recomendaciones Tecnicas Estrategicas
9. Roadmap de Implementacion y Evaluacion de Riesgos
10. Perspectiva Tecnica Futura y Oportunidades de Innovacion
11. Metodologia de Investigacion y Documentacion de Fuentes
12. Apendices Tecnicos y Materiales de Referencia

## 1. Introduccion y Metodologia de la Investigacion

### Significado Tecnico de la Investigacion

En 2026, la convergencia de tres fuerzas tecnologicas ha creado un momento unico para construir aplicaciones de habitos: el movimiento local-first que devuelve la propiedad de datos al usuario, las PWAs que igualan la experiencia nativa con 68% menos costo de desarrollo, y los agentes de IA de coding que transforman la productividad del desarrollador individual. Esta investigacion mapea estas fuerzas hacia decisiones tecnicas concretas.

El software local-first representa un cambio de paradigma donde las interacciones del usuario son efectivamente instantaneas (zero-latency UX) porque los datos residen localmente. Los usuarios retienen propiedad total de sus datos con capacidad de moverlos o eliminarlos como deseen. Para una app de habitos — donde la privacidad del comportamiento personal es critica — la arquitectura local-first no es solo una optimizacion tecnica, es un diferenciador de producto.

_Fuentes: [Local-First Software - Ink & Switch](https://www.inkandswitch.com/essay/local-first/), [Why Local-First Is Making a Comeback](https://tech.grahammiranda.com/why-local-first-software-is-making-a-comeback-and-what-it-means-for-privacy), [PWA Performance Guide 2026](https://www.digitalapplied.com/blog/progressive-web-apps-2026-pwa-performance-guide)_

### Metodologia de Investigacion

- **Scope Tecnico**: Framework frontend, base de datos local, arquitectura de componentes, PWA tooling, testing, despliegue, workflows de desarrollo con IA
- **Fuentes de Datos**: Documentacion oficial de cada tecnologia, articulos tecnicos verificados, benchmarks de rendimiento, comparativas actualizadas a 2025-2026, repositorios GitHub
- **Framework de Analisis**: Evaluacion multi-criterio (madurez del ecosistema, calidad de documentacion, compatibilidad con AI code generation, costo, curva de aprendizaje, comunidad activa)
- **Periodo**: Enfoque en datos actuales 2025-2026 con contexto de evolucion historica
- **Profundidad Tecnica**: Analisis de implementacion con ejemplos de codigo, configuraciones y patrones arquitectonicos

### Objetivos de Investigacion Alcanzados

**Objetivos Originales:**
- Definir el stack tecnico optimo para MVP como PWA
- Priorizar tecnologias con mayor exito en desarrollo asistido por IA
- Analizar tendencias con mas traccion en la comunidad
- Disenar arquitectura que permita integracion futura con IA agentica via MCP

**Objetivos Logrados:**

- Stack completo definido y validado: TypeScript + React + Vite + Dexie.js + Tailwind v4 + shadcn/ui + vite-plugin-pwa
- Analisis de compatibilidad con AI code generation confirmando React + TypeScript como combinacion optima
- Tendencias mapeadas: local-first, PWA como estandar, Agent Teams, Tailwind v4 + OKLCH
- Arquitectura feature-based con Service Layer pattern y preparacion MCP-ready documentada
- Hallazgo adicional: costo de infraestructura $0 con Cloudflare Pages free tier

## 2. Landscape Tecnico y Analisis de Arquitectura

### Patrones Arquitectonicos Actuales

La investigacion identifico la **arquitectura feature-based con Service Layer pattern** como la opcion optima para este proyecto:

```
src/
  features/
    habits/
      components/    # UI components
      hooks/         # Custom React hooks
      services/      # Business logic + Dexie queries
      types/         # TypeScript interfaces
      tests/         # Unit + component tests
    checkins/
    gamification/
  shared/
    components/      # shadcn/ui wrappers
    hooks/           # Shared hooks
    services/        # Database service, utils
    types/           # Shared types
```

Este patron ofrece:
- **Contexto aislado** para agentes IA (cada feature es autocontenida)
- **Separacion clara** entre UI, logica de negocio y datos
- **Escalabilidad horizontal** (agregar features sin tocar las existentes)
- **Testing natural** (cada capa testeable de forma independiente)

### Principios de Diseno del Sistema

- **Local-first**: Datos en IndexedDB via Dexie.js, operaciones instantaneas sin red
- **Offline-capable**: Service worker pre-cachea app shell, funcional 100% sin conexion
- **Privacy by architecture**: Sin servidor = sin datos centralizados = privacidad inherente
- **Type-safe**: TypeScript strict mode en toda la codebase
- **Component-driven**: shadcn/ui como base, composicion sobre herencia

_Fuentes: [Addy Osmani - AI Coding Workflow](https://addyosmani.com/blog/ai-coding-workflow/), [BeaverHabits Architecture - DeepWiki](https://deepwiki.com/daya0576/beaverhabits)_

## 3. Enfoques de Implementacion y Mejores Practicas

### Metodologias de Implementacion

El enfoque recomendado es **adopcion incremental por capas** con iteraciones pequenas:

1. **Scaffold** -> Vite + React + TS + PWA (funcional desde dia 1)
2. **UI** -> Tailwind v4 + shadcn/ui (CLI automatica)
3. **Data** -> Dexie.js (single-user local-first)
4. **Quality** -> Vitest + RTL + Playwright (3 capas de testing)
5. **Deploy** -> Cloudflare Pages (automatico desde GitHub)

Cada capa se integra de forma independiente, permitiendo validar antes de agregar la siguiente.

### Framework de Implementacion y Tooling

- **Vite** como build tool: HMR instantaneo, build optimizado con Rollup, soporte nativo ESM
- **vite-plugin-pwa**: Zero-config para service worker, manifest y offline caching
- **shadcn/ui CLI**: `npx shadcn-ui@latest init` configura todo el sistema de componentes
- **Dexie.js**: API promise-based sobre IndexedDB, versionado de schema integrado
- **GitHub Actions**: CI/CD gratuito con 2000 min/mes

_Fuentes: [vite-plugin-pwa Getting Started](https://vite-pwa-org.netlify.app/guide/), [shadcn/ui Installation](https://ui.shadcn.com/docs/installation/manual), [Dexie.js GitHub](https://github.com/dexie/Dexie.js/)_

## 4. Evolucion del Stack Tecnologico y Tendencias Actuales

### Landscape Actual del Stack

**Tendencias confirmadas por la investigacion:**

| Tecnologia | Tendencia 2026 | Relevancia para el Proyecto |
|-----------|---------------|---------------------------|
| React 19 | Dominante, RC features en produccion | Framework con mayor cobertura AI |
| TypeScript 5.x | Estandar de facto | Type safety + mejor AI code gen |
| Vite 6 | Build tool predominante | HMR instantaneo, ecosistema PWA |
| Tailwind v4 | Adopcion masiva de v4 | OKLCH, @theme, performance CSS |
| IndexedDB | APIs expandidas, quotas GB-level | Base para local-first |
| Service Workers | Soporte universal en navegadores | Core de PWA offline |

### Patrones de Adopcion Tecnologica

- **React** mantiene la mayor base de desarrolladores y contenido de entrenamiento para LLMs
- **Vite** ha superado a Create React App y Next.js para SPAs/PWAs puras
- **Tailwind CSS** evoluciono de utilidad a sistema de diseno completo con v4
- **Local-first** paso de nicho academico a movimiento mainstream impulsado por privacidad y resiliencia
- **AI-assisted development** es la norma: 84% de developers usan herramientas de IA

_Fuentes: [PWA Trends 2026](https://www.appstory.org/blog/7-pwa-trends-that-will-define-mobile-and-web-development-in-2026/), [Tailwind v4 - shadcn/ui](https://ui.shadcn.com/docs/tailwind-v4), [AI Coding Assistants 2026](https://claude5.com/news/ai-coding-assistants-2026-developer-workflows-compared)_

## 5. Patrones de Integracion e Interoperabilidad

### Enfoques de Integracion Actuales

La arquitectura del proyecto contempla dos fases de integracion:

**Fase MVP (sin backend):**
- Dexie.js como unica fuente de datos
- Service Layer como abstraccion — los componentes nunca acceden a Dexie directamente
- Export/import JSON para portabilidad de datos
- Web Share API para compartir logros

**Fase Futura (integracion IA):**
- Service Layer se extiende para comunicar con AI providers (modelo BYO-AI)
- MCP (Model Context Protocol) o WebMCP para integracion estandarizada con agentes IA
- Dexie Cloud como opcion para sync multi-dispositivo
- APIs del navegador: Notification API, Background Sync, Web Push

### Estandares de Interoperabilidad

- **Web App Manifest** para instalabilidad cross-platform
- **Service Worker API** para offline y background processing
- **IndexedDB API** como almacenamiento estandar del navegador
- **MCP** como protocolo emergente para integracion con IA agentica
- **JSON** como formato de intercambio para export/import

_Fuentes: [Dexie.js Synchronization Patterns](https://app.studyraid.com/en/read/11356/355148/synchronization-patterns), [PWA APIs - MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)_

## 6. Analisis de Rendimiento y Escalabilidad

### Caracteristicas de Rendimiento y Optimizacion

**Benchmarks objetivo:**

| Metrica | Objetivo | Como Lograrlo |
|---------|----------|--------------|
| Lighthouse PWA Score | >= 90 | vite-plugin-pwa + Workbox defaults |
| First Contentful Paint | < 1.5s | Vite code splitting + precache |
| Time to Interactive | < 3s | Lazy loading de features no-criticas |
| Operaciones Dexie.js | < 10ms | Indices optimizados, batch operations |
| Bundle Size | < 200KB gzipped | Tree shaking + dynamic imports |

**Estrategias de optimizacion:**
- Vite tree shaking elimina codigo muerto automaticamente
- React.lazy + Suspense para code splitting por feature
- Dexie.js batch operations para escrituras multiples
- Workbox CacheFirst para assets estaticos, StaleWhileRevalidate para dinamicos

### Patrones de Escalabilidad

Para una app local-first single-user, la escalabilidad se mide diferente:

- **Datos**: IndexedDB soporta GB de almacenamiento; limpieza de datos antiguos como mitigacion
- **Features**: Arquitectura feature-based permite agregar modulos sin afectar los existentes
- **Usuarios**: Sin servidor = sin preocupacion por concurrencia (cada usuario es independiente)
- **Futuro multi-dispositivo**: Dexie Cloud como path de escalamiento cuando se necesite

_Fuentes: [Dexie.js Performance](https://dexie.org/), [Vite PWA Precache](https://vite-pwa-org.netlify.app/guide/service-worker-precache), [Offline-First PWA Caching](https://www.magicbell.com/blog/offline-first-pwas-service-worker-caching-strategies)_

## 7. Consideraciones de Seguridad y Privacidad

### Mejores Practicas de Seguridad

**Seguridad inherente de la arquitectura local-first:**
- Sin backend = sin superficie de ataque del servidor
- Sin base de datos centralizada = sin riesgo de brecha masiva de datos
- Sin autenticacion (MVP) = sin credenciales que proteger
- HTTPS obligatorio para service workers = transporte cifrado

**Practicas de desarrollo seguro:**
- TypeScript strict mode previene errores de tipo en runtime
- Content Security Policy (CSP) para prevenir XSS
- Sanitizacion de inputs del usuario antes de almacenar en Dexie
- Dependencias auditadas con `npm audit` en CI

### Privacidad por Diseno

La arquitectura local-first proporciona "privacidad por defecto, no como una ocurrencia tardia":

- Los datos de habitos permanecen exclusivamente en el dispositivo del usuario
- No hay telemetria ni analytics que envien datos a servidores
- Export/import JSON permite al usuario controlar completamente sus datos
- El modelo BYO-AI futuro mantiene el control de datos en el usuario (sus propias API keys)

_Fuentes: [Local-First Privacy - Ink & Switch](https://www.inkandswitch.com/essay/local-first/), [Why Local-First Is Making a Comeback](https://tech.grahammiranda.com/why-local-first-software-is-making-a-comeback-and-what-it-means-for-privacy)_

## 8. Recomendaciones Tecnicas Estrategicas

### Estrategia Tecnica y Marco de Decision

**Stack tecnologico recomendado (confirmado):**

| Capa | Tecnologia | Justificacion |
|------|-----------|--------------|
| Lenguaje | TypeScript 5.x | Type safety, mejor AI code gen, ecosistema |
| Framework | React 19 + Vite 6 | Mayor cobertura AI, HMR, ecosistema PWA |
| UI | Tailwind v4 + shadcn/ui | Componentes accesibles, DX excelente |
| Datos | Dexie.js (IndexedDB) | Local-first, API elegante, sync futuro |
| PWA | vite-plugin-pwa + Workbox | Zero-config, offline robusto |
| Routing | React Router v7 (SPA) | Estandar, sin servidor |
| Testing | Vitest + RTL + Playwright | Rapido, completo, 3 capas |
| Deploy | Cloudflare Pages | Gratis, bandwidth ilimitado, edge global |
| CI/CD | GitHub Actions | Gratis, integracion nativa |

### Ventaja Competitiva Tecnica

- **Privacidad inherente**: Arquitectura local-first como diferenciador vs competidores cloud-first
- **Costo cero**: Sin gastos de servidor permite iterar indefinidamente
- **Velocidad de desarrollo**: Stack optimizado para AI code generation
- **Preparacion agentica**: Arquitectura MCP-ready para integracion futura con IA

## 9. Roadmap de Implementacion y Evaluacion de Riesgos

### Framework de Implementacion

| Sprint | Nombre | Entregables |
|--------|--------|------------|
| **0** | Fundacion | Scaffold completo, CI/CD, estructura feature-based, CLAUDE.md |
| **1** | Core | Modelo de datos en Dexie, CRUD habitos, UI core con shadcn/ui |
| **2** | Engagement | Check-in diario, sistema de rachas, vista de progreso visual |
| **3** | Gamificacion | Puntos, niveles, mecanicas basadas en Habitos Atomicos |
| **4** | IA | Integracion IA conversacional (BYO-AI), export/import, pulido UX |

### Gestion de Riesgos Tecnicos

| Riesgo | Prob. | Impacto | Mitigacion |
|--------|-------|---------|------------|
| IndexedDB storage limits movil | Media | Alto | Limpieza datos antiguos, `navigator.storage.estimate()` |
| Service worker cache stale | Media | Medio | `registerType: 'autoUpdate'` + prompt usuario |
| Dexie.js schema migrations | Media | Alto | Versionar schema desde inicio, tests migracion |
| Perdida datos usuario | Baja | Critico | Export/import JSON desde dia 1 |
| Codigo IA con bugs sutiles | Media | Medio | Tests obligatorios, TS strict, review pre-merge |
| PWA install prompt inconsistente | Alta | Bajo | Fallback manual, `beforeinstallprompt` |
| Tailwind v4 breaking changes | Baja | Medio | shadcn/ui abstrae cambios, versiones pinned |
| Browser compatibility | Baja | Medio | caniuse.com, polyfills selectivos |

## 10. Perspectiva Tecnica Futura y Oportunidades de Innovacion

### Tendencias Tecnologicas Emergentes

**Corto plazo (1-2 anos):**
- Maduracion de MCP/WebMCP como estandar de integracion con agentes IA
- Origin Private File System (OPFS) expandiendo capacidades de almacenamiento local
- Agent Teams de Claude Code habilitando workflows multi-agente complejos
- Consolidacion de Tailwind v4 y nuevos primitivos CSS (container queries, :has())

**Mediano plazo (3-5 anos):**
- Web APIs para integracion nativa con asistentes de IA del dispositivo
- Sync peer-to-peer sin servidor central (CRDTs maduros)
- WebGPU habilitando modelos de IA locales en el navegador
- PWAs con capacidades cada vez mas cercanas a apps nativas

### Oportunidades de Innovacion

- **IA conversacional local**: Modelos pequenos corriendo en WebGPU para coaching de habitos sin enviar datos a la nube
- **Sync P2P**: Compartir habitos entre amigos/parejas sin servidor via WebRTC + CRDTs
- **Wearable integration**: Web Bluetooth API para conectar con smartwatches/fitness trackers
- **Gamificacion social**: Desafios grupales manteniendo privacidad individual

_Fuentes: [Local-First Software Revolution](https://www.clouddatainsights.com/from-the-cloud-to-the-edge-exploring-the-local-first-software-revolution/), [The Great Data Escape - AI & Local-First](https://solutionsreview.com/cloud-platforms/the-great-data-escape-ai-local-first-and-the-cloud-exodus/)_

## 11. Metodologia de Investigacion y Documentacion de Fuentes

### Documentacion Completa de Fuentes Tecnicas

**Fuentes Primarias (documentacion oficial):**
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Dexie.js Documentation](https://dexie.org/)
- [vite-plugin-pwa Guide](https://vite-pwa-org.netlify.app/guide/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)

**Fuentes Secundarias (analisis y comparativas):**
- [Ink & Switch - Local-First Software](https://www.inkandswitch.com/essay/local-first/)
- [Addy Osmani - LLM Coding Workflow 2026](https://addyosmani.com/blog/ai-coding-workflow/)
- [Cursor vs Claude Code 2026 - Builder.io](https://www.builder.io/blog/cursor-vs-claude-code)
- [Vercel vs Netlify vs Cloudflare 2026 - Codebrand](https://www.codebrand.us/blog/vercel-vs-netlify-vs-cloudflare-2026/)
- [Testing in 2026 - Nucamp](https://www.nucamp.co/blog/testing-in-2026-jest-react-testing-library-and-full-stack-testing-strategies)
- [PWA Best Practices 2026 - WireFuture](https://wirefuture.com/post/progressive-web-apps-pwa-best-practices-for-2026)
- [Local-First Future - RxDB](https://rxdb.info/articles/local-first-future.html)

### Aseguramiento de Calidad de la Investigacion

- **Verificacion de fuentes**: Todos los datos tecnicos verificados contra fuentes web actuales (2025-2026)
- **Nivel de confianza**: Alto — basado en multiples fuentes independientes y documentacion oficial
- **Limitaciones**: La investigacion se enfoca en el contexto de un solo desarrollador + agentes IA; equipos grandes podrian requerir consideraciones adicionales
- **Transparencia metodologica**: Busquedas web documentadas, fuentes citadas en cada seccion

## 12. Apendices Tecnicos y Materiales de Referencia

### Tabla Comparativa Detallada del Stack

| Criterio | React+Vite | Next.js | SvelteKit | Vue+Vite |
|---------|-----------|---------|-----------|---------|
| AI Code Gen Quality | Excelente | Excelente | Buena | Buena |
| PWA Support | vite-plugin-pwa | next-pwa | Built-in | vite-plugin-pwa |
| Local-First | Dexie.js nativo | Requiere config | Dexie.js nativo | Dexie.js nativo |
| Bundle Size | Pequeno | Grande (SSR) | Muy pequeno | Pequeno |
| Learning Curve | Moderada | Alta | Moderada | Baja |
| Ecosistema | Masivo | Masivo | Creciendo | Grande |
| Necesita Servidor | No | Si (SSR) | Opcional | No |

### Configuracion Recomendada Completa

**Dependencias de produccion:**
- react, react-dom (^19.x)
- react-router (^7.x)
- dexie, dexie-react-hooks
- tailwindcss (^4.x)
- tw-animate-css

**Dependencias de desarrollo:**
- typescript (^5.x)
- vite (^6.x)
- vite-plugin-pwa
- vitest, @testing-library/react, @testing-library/jest-dom
- @playwright/test
- @shadcn/ui (CLI)

### Recursos Tecnicos para Aprendizaje Continuo

- [React Patterns](https://reactpatterns.com/) - Patrones avanzados de React
- [Dexie.js - Getting Started](https://dexie.org/docs/Tutorial/Getting-started) - Tutorial oficial
- [Workbox Strategies](https://developer.chrome.com/docs/workbox/modules/workbox-strategies/) - Estrategias de caching
- [web.dev PWA Guide](https://web.dev/progressive-web-apps/) - Guia completa de PWA de Google

---

## Conclusion de la Investigacion Tecnica

### Resumen de Hallazgos Clave

1. El stack **TypeScript + React + Vite + Dexie.js + Tailwind v4 + shadcn/ui** es la combinacion optima para este MVP, validada por madurez del ecosistema, compatibilidad con AI code generation y costo cero de infraestructura
2. La **arquitectura local-first** no es solo una decision tecnica sino un diferenciador de producto que proporciona privacidad inherente y funcionamiento offline
3. **Cloudflare Pages** es la plataforma de deploy optima con free tier permanente y bandwidth ilimitado
4. El **workflow de desarrollo con IA** (Claude Code + Cursor + BMAD Method) esta perfectamente alineado con la arquitectura feature-based propuesta
5. No se identificaron **riesgos bloqueantes** — todos los riesgos tienen mitigaciones claras

### Evaluacion de Impacto Tecnico Estrategico

Esta investigacion confirma que es viable construir una app de habitos competitiva como solo-developer + AI agents, con un stack moderno, costo cero de infraestructura, y una arquitectura que escala naturalmente hacia integracion con IA agentica. El movimiento local-first y la maduracion de PWAs crean una ventana de oportunidad para ofrecer una experiencia de calidad nativa con privacidad inherente — algo que los competidores cloud-first no pueden igualar sin redisenar su arquitectura.

### Proximos Pasos Recomendados

1. **Crear el Product Brief** con los insights de esta investigacion como fundamento tecnico
2. **Disenar el PRD** incorporando las recomendaciones de stack y arquitectura
3. **Planificar Sprint 0** para scaffold del proyecto con toda la configuracion documentada
4. **Establecer CLAUDE.md** con las convenciones y patrones validados por esta investigacion

---

**Fecha de Completitud de la Investigacion:** 2026-03-05
**Periodo de Investigacion:** Analisis tecnico comprehensivo actual (2025-2026)
**Verificacion de Fuentes:** Todos los datos tecnicos citados con fuentes actuales
**Nivel de Confianza Tecnica:** Alto — basado en multiples fuentes tecnicas independientes

_Este documento de investigacion tecnica sirve como referencia autoritativa sobre el stack tecnologico para el MVP PWA de app de habitos y proporciona insights estrategicos para la toma de decisiones informada y la implementacion._
