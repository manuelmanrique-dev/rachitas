---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/validacion-prd-report.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
  - "_bmad-output/planning-artifacts/product-brief-primer-bmad-2026-03-09.md"
  - "_bmad-output/planning-artifacts/research/technical-stack-mvp-pwa-research-2026-03-05.md"
  - "_bmad-output/planning-artifacts/research/market-habit-tracking-ai-research-2026-03-02.md"
  - "_bmad-output/planning-artifacts/research/domain-apps-habitos-bienestar-research-2026-03-03.md"
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-03-21'
project_name: 'primer-bmad'
user_name: 'Manuel'
date: '2026-03-21'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements (41 FRs en 6 categorías):**

| Categoría | FRs | Implicación arquitectónica |
|-----------|-----|---------------------------|
| Identidad y Cuenta (FR1-7) | Auth multi-proveedor, sync multi-dispositivo, eliminación GDPR | Capa de autenticación abstracta, cascade delete, RLS |
| Agente IA — Pepito Grillo (FR8-17) | Framework agéntico con tool contracts, onboarding conversacional, tono empático | Service layer con herramientas definidas, abstracción de proveedor LLM, pipeline conversación→datos |
| Gestión de Hábitos (FR18-24) | CRUD hábitos, frecuencia configurable, modos de dificultad | Modelo de dominio rico, lógica de negocio en service layer |
| Registro y Seguimiento (FR25-32) | Registro un tap, rachas adaptativas, heatmap sin castigo | Operaciones <100ms, cálculo de rachas por modo, renderizado eficiente de heatmap |
| Datos Offline y Sync (FR33-36) | Registro offline, sync automática, servidor como fuente de verdad | Cache local + sync queue + conflict resolution (last-write-wins MVP) |
| PWA e Instalación (FR37-39) | Instalable, standalone, offline funcional | Service worker, manifest, estrategia de cache |
| Administración (FR40-41) | Métricas, gestión usuarios | Panel backend directo (no custom en MVP) |

**Non-Functional Requirements (30 NFRs en 5 categorías):**

| Categoría | NFRs clave | Impacto arquitectónico |
|-----------|-----------|----------------------|
| Performance | Tap <100ms (NFR1), carga <2s (NFR2), IA <5s primer token (NFR4), sync no bloquea UI (NFR5) | Operaciones locales primero, sync en background, streaming IA preparado |
| Security | HTTPS (NFR6), cifrado en reposo (NFR7), RLS (NFR10), GDPR <24h (NFR11), PII en conversaciones (NFR12) | Row Level Security, cascade delete, API keys solo en cliente |
| Scalability | 1000 MAU sin cambio de infra (NFR14), proveedor IA intercambiable (NFR15), local <200ms con 2 años de datos (NFR16) | Arquitectura stateless-ready, interfaces abstractas, índices eficientes |
| Accessibility | WCAG 2.1 A (NFR17), teclado (NFR18), contraste 3:1 (NFR20) | Componentes con ARIA, focus management, tokens de contraste |
| Integration | Interfaz uniforme IA (NFR22), tool contracts validados (NFR24), herramientas hot-swap (NFR30), degradación sin IA (NFR29), métricas IA (NFR28) | Adapter pattern para IA, schema validation en tools, feature flags para IA |

**UX Spec — Implicaciones arquitectónicas:**

- **9 componentes custom** con estados, animaciones y accesibilidad definidos (HabitHeatmap, ChatBubble, ChatInput, HabitCheckbox, HabitCard, AgentTypingIndicator, SyncIndicator, HabitDetailView, HabitCreateForm)
- **Sistema de design tokens** semánticos con variantes light/dark y temas intercambiables (Tierra Cálida MVP, Salvia y Atardecer como cosméticos futuros)
- **Navegación plana** con tab bar de 3 elementos (Hábitos, Pepito, Perfil)
- **Human-in-the-loop** obligatorio: confirmación explícita para toda acción del agente sobre datos del usuario
- **Dos modos de uso coexistentes**: registro ultrarrápido (tap) y conversación reflexiva profunda

### Scale & Complexity

- **Dominio primario:** Full-stack PWA con integración IA agéntica
- **Nivel de complejidad:** Media-Alta
- **Componentes arquitectónicos estimados:** ~8-10 (auth, habits domain, tracking, AI agent framework, sync engine, UI layer, storage abstraction, admin)
- **Usuarios target MVP:** 50-100 MAU → 1000 MAU sin cambios de infra

### Technical Constraints & Dependencies

- **Solo developer** trabajando con agentes IA (Claude Code, Cursor) — la arquitectura debe ser modular y comprensible por agentes
- **Coste operativo <$30/mes** en fase inicial
- **Sin SEO en MVP** — toda la app detrás de autenticación
- **Sin notificaciones push en MVP** — anti-patrón por filosofía de producto
- **Panel admin simplificado** — acceso directo al backend, sin panel custom en MVP
- **Streaming de respuestas IA** — arquitectura preparada desde el inicio, implementación post-MVP

### Cross-Cutting Concerns Identified

1. **Sincronización offline/online** — Afecta: datos de hábitos, registros, conversaciones, estado de UI, indicador de sync
2. **Abstracción de proveedores** — Afecta: IA (LLM), autenticación, almacenamiento remoto, almacenamiento local
3. **Seguridad y privacidad** — Afecta: toda operación de datos (RLS), conversaciones (PII), eliminación (GDPR), API keys (BYO-AI)
4. **Accesibilidad** — Afecta: todos los componentes UI, navegación, feedback sensorial
5. **Theming** — Afecta: todos los componentes visuales via tokens semánticos, preparación para cosméticos como monetización

## Starter Template Evaluation

### Primary Technology Domain

Web Application (PWA/SPA) — TypeScript + React + Vite, basado en los requisitos de proyecto: offline-first, agente IA conversacional, instalable en homescreen.

### Starter Options Considered

| Opción | Qué proporciona | Ventaja | Desventaja |
|--------|----------------|---------|------------|
| `shadcn init -t vite` | Vite 8 + React 19 + TS + Tailwind v4 + shadcn/ui + dark mode | Oficial, mantenido, base sólida con UX stack completo | Requiere añadir Router, PWA, testing |
| `npm create vite@latest --template react-ts` | Vite 8 + React 19 + TS | Control total, mínimo | Requiere configurar todo manualmente |
| Starter comunitario (React 19 + Tailwind v4 + shadcn + RR7) | Todo incluido | Setup rápido | Riesgo de mantenimiento, dependencia de tercero |
| Laravel 13 (evaluado y descartado) | Full-stack PHP con AI SDK nativo | Framework agéntico maduro | No soporta PWA offline-first, requiere servidor PHP, coste de infra 3-5x mayor, BYO-AI incompatible con modelo cliente-side |

### Selected Starter: `shadcn init -t vite`

**Rationale:**
- Proporciona la base UI completa que define la UX spec (Tailwind v4 + shadcn/ui) desde el primer minuto
- Oficialmente mantenido — no depende de un tercero
- El CLI v4 de shadcn incluye soporte para agentes IA (shadcn/skills), alineado con el flujo de desarrollo del proyecto
- Las piezas que faltan (Router, PWA, testing) se añaden de forma incremental sin conflictos

**Initialization Command:**

```bash
pnpm dlx shadcn@latest init -t vite
```

**Post-initialization (añadir incrementalmente):**

```bash
# React Router 7 (Framework mode, SPA)
pnpm add react-router

# PWA
pnpm add -D vite-plugin-pwa workbox-window

# Testing
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Architectural Decisions Provided by Starter

**Language & Runtime:**
- TypeScript 5.x con configuración estricta
- React 19 con SWC compiler
- Node.js 20.19+ o 22.12+ (requerido por Vite 8)

**Styling Solution:**
- Tailwind CSS v4.2 con plugin nativo de Vite (`@tailwindcss/vite`)
- Sin `tailwind.config.js` — customización directa en CSS con `@theme`
- shadcn/ui con componentes copiados al proyecto (control total)
- CSS custom properties para design tokens — alineado con el sistema de tokens de la UX spec

**Build Tooling:**
- Vite 8.0 con Rolldown (bundler Rust) — builds 10-30x más rápidos
- Soporte nativo de tsconfig paths (sin configuración adicional de aliases)
- Code splitting automático por rutas (con React Router Framework mode)

**Testing Framework (post-init):**
- Vitest 4.1 — comparte configuración con Vite, sin duplicación
- React Testing Library + jest-dom para testing de componentes
- jsdom como environment de test

**Code Organization:**
- Estructura base de shadcn con `src/components/ui/` para componentes del design system
- Feature-based organization se implementará sobre esta base en la arquitectura

**Development Experience:**
- Hot Module Replacement (HMR) instantáneo con Vite 8
- Console forwarding del browser al terminal
- Devtools integradas en Vite
- shadcn CLI con `--dry-run` y `--diff` para inspeccionar antes de ejecutar

**Note:** La inicialización del proyecto con este comando será la primera story de implementación.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Bloquean implementación):**
- Backend: Supabase (auth + BD + Edge Functions + Realtime)
- Local storage: Dexie.js (cache offline + queries reactivas)
- IA: Proxy vía Supabase Edge Functions → LLM Adapter pattern
- State management: TanStack Query (server state) + Zustand (UI state)

**Important Decisions (Dan forma a la arquitectura):**
- Sync: Last-write-wins con cola de reintentos + backoff exponencial
- Tool contracts: Schema validation con Zod, hot-swappable sin redespliegue
- Heatmap: SVG con accesibilidad ARIA nativa
- Hosting: Cloudflare Pages (SPA estático)
- CI/CD: GitHub Actions

**Deferred Decisions (Post-MVP):**
- BYO-AI key storage: Dexie cifrado (dexie-encrypted) como baseline, evaluar Web Crypto API si se necesita más seguridad
- Modelo IA self-hosted: VPS con Dokploy cuando se defina proveedor
- Streaming de respuestas: Arquitectura preparada, implementación post-MVP
- E2E testing: Playwright en CI cuando haya flujos estables

### Data Architecture

| Decisión | Elección | Versión | Rationale |
|----------|----------|---------|-----------|
| **Backend/BaaS** | Supabase | Latest | Auth + PostgreSQL + RLS + Realtime + Edge Functions. Free tier cubre 1000 MAU. Open source. |
| **Base de datos** | PostgreSQL (via Supabase) | 15+ | RLS nativo (NFR10), CASCADE DELETE para GDPR (NFR11), índices para queries de heatmap |
| **Almacenamiento local** | Dexie.js | Latest | Cache offline + `useLiveQuery()` reactivo. Operaciones <100ms (NFR1). ~35KB. |
| **Sync strategy** | Server as source of truth | — | Dexie.js como cache de lectura + cola de escritura offline. Last-write-wins en MVP. Cola de reintentos con backoff exponencial (NFR27). |
| **Data validation** | Zod | Latest | Schemas compartidos entre tool contracts del agente, formularios, y API. TypeScript-first. |

**Modelo de datos conceptual:**

```
User (Supabase Auth)
├── Habit (id, name, signal, routine, reward, frequency, difficulty_mode, created_at)
│   └── HabitRecord (id, habit_id, date, completed, intensity, note)
├── Conversation (id, habit_id?, started_at)
│   └── Message (id, conversation_id, role, content, tool_calls?, created_at)
└── UserProfile (id, display_name, preferences, theme)
```

### Authentication & Security

| Decisión | Elección | Rationale |
|----------|----------|-----------|
| **Auth provider** | Supabase Auth | Email/password + Google OAuth para MVP (NFR26) |
| **Authorization** | PostgreSQL RLS | Policies `auth.uid() = user_id` en todas las tablas. Aislamiento a nivel de fila sin código adicional (NFR10) |
| **API keys BYO-AI** | Dexie.js cifrado (dexie-encrypted) | Keys nunca en servidor (NFR8). Cifradas en reposo en IndexedDB. Post-MVP (Phase 3) |
| **GDPR elimination** | CASCADE DELETE + Dexie.delete() + cache cleanup | Borrado irreversible en <24h (NFR11). Flujo completo definido en UX spec (Flujo 6) |
| **Transport security** | HTTPS/TLS obligatorio | NFR6. Supabase y Cloudflare lo proporcionan por defecto |
| **PII en conversaciones** | Misma protección RLS que el resto de datos | NFR12. Las conversaciones son datos personales sensibles |

### API & Communication Patterns

| Decisión | Elección | Rationale |
|----------|----------|-----------|
| **Comunicación con LLM** | Proxy vía Supabase Edge Functions | Rate limiting server-side, métricas centralizadas (NFR28), endpoint LLM no expuesto públicamente |
| **Abstracción de proveedor** | LLM Adapter pattern (Port/Adapter) | Interfaz uniforme `sendMessage` / `streamMessage` (NFR22). Cambiar proveedor = cambiar adapter |
| **Tool contracts del agente** | Schemas Zod con validación de entrada/salida | Herramientas definidas como contratos explícitos (NFR24). Hot-swappable vía configuración (NFR30) |
| **Error handling IA** | Graceful degradation | App funcional sin IA (NFR29). Errores visibles al usuario en <2s (NFR23). Retry con backoff |
| **Métricas IA** | Logging en Edge Functions | Tokens consumidos, latencia, errores — accesibles desde Supabase Dashboard (NFR28) |

**Tools del agente MVP:**

| Tool | Input | Output | Descripción |
|------|-------|--------|-------------|
| `createHabit` | señal, rutina, recompensa, frecuencia, modo | Habit object | Crear hábito desde conversación |
| `getHabits` | — | Habit[] | Listar hábitos del usuario |
| `getHabitRecords` | habitId, dateRange | HabitRecord[] | Consultar registros para contexto |
| `updateHabit` | habitId, changes | Habit object | Modificar hábito existente |
| `deleteHabit` | habitId | confirmation | Archivar hábito |

### Frontend Architecture

| Decisión | Elección | Rationale |
|----------|----------|-----------|
| **Server state** | TanStack Query | Cache de datos Supabase, invalidación, optimistic updates para tap <100ms (NFR1) |
| **UI state** | Zustand | Estado del chat, tema activo, estado offline. Minimalista (~1KB), selectores granulares |
| **Organización** | Feature-based | `features/{auth,habits,agent,sync}` con componentes, hooks y tipos co-locados |
| **Design system** | Atomic Design sobre shadcn/ui | Átomos (shadcn) → Moléculas → Organismos (9 componentes custom de UX spec) |
| **Heatmap rendering** | SVG | Accesibilidad nativa (`role="grid"`, ARIA por celda), estilable con tokens CSS (NFR17-19) |
| **Routing** | React Router 7 Framework mode (`ssr: false`) | Code splitting automático, type-safe params, `clientLoader` para datos |

**Estructura de proyecto:**

```
src/
├── components/ui/          ← shadcn/ui (átomos del design system)
├── features/
│   ├── auth/               ← Login, registro, perfil, eliminación
│   ├── habits/             ← CRUD hábitos, heatmap, registro, rachas
│   ├── agent/              ← Chat, tool contracts, LLM adapter
│   └── sync/               ← Cola offline, reconciliación, indicador
├── services/               ← Service layer (lógica de negocio pura)
├── lib/                    ← Utilidades, config, types compartidos
└── app/                    ← Routes, layouts (React Router)
```

### Infrastructure & Deployment

| Decisión | Elección | Coste | Rationale |
|----------|----------|-------|-----------|
| **Hosting SPA** | Cloudflare Pages | Gratis | CDN global, zero-config para estáticos, auto-deploy desde GitHub |
| **Backend** | Supabase (hosted) | Gratis (free tier) → Pro ($25/mes) cuando escale | Auth + BD + Edge Functions + Realtime incluidos |
| **CI/CD** | GitHub Actions | Gratis | Lint + type-check + tests en PR, deploy en merge a main |
| **Error tracking** | Sentry (free tier) | Gratis | Error tracking frontend. Se añade cuando haya usuarios |
| **Monitoring** | Supabase Dashboard + Edge Function logs | Incluido | Métricas de uso, gestión usuarios (FR40-41), métricas IA (NFR28) |

**Environments:**

| Entorno | Supabase | Deploy | Uso |
|---------|----------|--------|-----|
| local | Supabase local (Docker) o proyecto dev | `vite dev` | Desarrollo |
| preview | Proyecto Supabase staging | Cloudflare preview deploys (por PR) | Review |
| production | Proyecto Supabase prod | Cloudflare Pages (main) | Usuarios reales |

**Coste operativo estimado MVP:** $0/mes (Cloudflare Pages gratis + Supabase free tier). Escala a ~$25/mes si supera límites del free tier.

### Decision Impact Analysis

**Secuencia de implementación:**

1. Scaffold proyecto (shadcn init + Router + PWA + Vitest)
2. Configurar Supabase (schema, RLS, auth providers)
3. Configurar Dexie.js (schema local, sync service)
4. Service layer (lógica de hábitos, registros, rachas)
5. UI features (dashboard, heatmap, formularios)
6. Agent framework (LLM adapter, tool contracts, Edge Function proxy)
7. Chat UI (conversación, tarjeta resumen, human-in-the-loop)
8. PWA polish (offline, sync indicator, instalación)

**Dependencias entre decisiones:**

- Supabase RLS → depende del schema de datos
- TanStack Query → depende de la API de Supabase
- Tool contracts → depende del service layer
- Sync engine → depende de Dexie.js + Supabase
- Edge Function proxy → depende de la elección de LLM

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:** 5 categorías donde agentes IA podrían tomar decisiones diferentes — naming, estructura, formatos, comunicación y procesos.

### Naming Patterns

**Database (PostgreSQL):**

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Tablas | `snake_case` plural | `habits`, `habit_records`, `conversations`, `messages` |
| Columnas | `snake_case` | `user_id`, `created_at`, `difficulty_mode` |
| Foreign keys | `{tabla_singular}_id` | `habit_id`, `conversation_id` |
| Índices | `idx_{tabla}_{columna}` | `idx_habits_user_id` |

**TypeScript/React (código):**

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Variables y funciones | `camelCase` | `getUserHabits()`, `habitId` |
| Componentes | `PascalCase` | `HabitCheckbox`, `ChatBubble` |
| Archivos de componentes | `PascalCase.tsx` | `HabitCheckbox.tsx` |
| Archivos no-componentes | `kebab-case.ts` | `habit-service.ts`, `sync-engine.ts` |
| Hooks | `use` + `camelCase` | `useHabits()`, `useSyncStatus()` |
| Types/Interfaces | `PascalCase` | `Habit`, `HabitRecord`, `AgentTool` |
| Constantes | `UPPER_SNAKE_CASE` | `MAX_RETRY_ATTEMPTS`, `DEFAULT_FREQUENCY` |
| Zod schemas | `camelCase` + `Schema` | `habitSchema`, `createHabitSchema` |
| Rutas URL | `kebab-case` | `/habit-detail/:id`, `/agent-chat` |

**Conversión entre capas:** Los datos llegan de Supabase en `snake_case` y se transforman a `camelCase` en el service layer. Un único punto de conversión.

### Structure Patterns

**Tests — co-locados:**

```
features/habits/
├── HabitCheckbox.tsx
├── HabitCheckbox.test.tsx    ← junto al componente
├── habit-service.ts
└── habit-service.test.ts     ← junto al servicio
```

**Feature internals — barrel exports:**

```
features/habits/
├── components/     ← componentes específicos de esta feature
├── hooks/          ← hooks específicos
├── types.ts        ← tipos de la feature
├── index.ts        ← barrel export (lo que la feature expone)
```

**Services:** Funciones puras sin estado, importan types pero no componentes React.

**Lib:** Solo utilidades verdaderamente compartidas. Si algo solo lo usa una feature, va dentro de la feature.

### Format Patterns

**Transformación de datos Supabase → App:**

```typescript
// Supabase devuelve snake_case
{ habit_id: "...", created_at: "...", difficulty_mode: "normal" }

// Service layer transforma a camelCase
{ habitId: "...", createdAt: "...", difficultyMode: "normal" }
```

**Fechas:** ISO 8601 strings siempre (`2026-03-21T10:30:00Z`). Formateo para UI solo en el componente que renderiza.

**IDs:** UUIDs generados por PostgreSQL (`gen_random_uuid()`).

**Estructura de errores uniforme:**

```typescript
type AppError = {
  code: string;        // "HABIT_NOT_FOUND", "AI_TIMEOUT", "SYNC_FAILED"
  message: string;     // Mensaje para el usuario (en español)
  details?: unknown;   // Datos técnicos para logging
}
```

**Null handling:** `null` para ausencia de datos del servidor. `undefined` para props opcionales de React. Nunca mezclar.

### Communication Patterns

**TanStack Query keys — convención estricta:**

```typescript
// [feature, entity, ...params]
["habits", "list"]                    // todos los hábitos
["habits", "detail", habitId]         // un hábito
["habits", "records", habitId, date]  // registros de un hábito
["agent", "conversations"]            // conversaciones
```

**Zustand stores — uno por dominio:**

```typescript
useAgentStore    → estado del chat (messages, isTyping, activeConversation)
useUIStore       → tema, estado offline, sidebar
useSyncStore     → cola de sync, estado de conexión
```

**Optimistic updates (tap de registro):**

1. Update Dexie.js local inmediatamente
2. Update UI via `useLiveQuery` (reactivo)
3. Encolar sync a Supabase en background
4. Si falla → retry con backoff, UI ya está actualizada

### Process Patterns

**Error boundaries:** Un `ErrorBoundary` por feature, no uno global. Si el chat falla, el dashboard sigue funcionando.

**Loading states:** TanStack Query proporciona `isLoading`, `isError`, `data`. No crear estados de carga manuales donde TanStack los da. Para operaciones locales (Dexie): loading es prácticamente 0.

**Offline handling:**

1. Dexie.js es la fuente de datos para la UI (siempre disponible)
2. El `SyncIndicator` muestra estado de conexión
3. Las operaciones se encolan en `SyncQueue` (Dexie table)
4. Al reconectar → procesar cola en orden FIFO

**Auth flow:**

1. Supabase Auth maneja sesión
2. Si sesión expira → redirect a login
3. Los datos locales (Dexie) persisten entre sesiones
4. Al login → sync desde Supabase → merge con datos locales

### Enforcement Guidelines

**Todo agente IA DEBE:**

1. Seguir las convenciones de naming exactas (snake_case BD, camelCase TS, PascalCase componentes)
2. Co-locar tests junto al archivo que testean
3. Transformar datos de Supabase a camelCase en el service layer, nunca en componentes
4. Usar la estructura `AppError` para todos los errores
5. Usar TanStack Query keys con el formato `[feature, entity, ...params]`
6. No crear estado manual de loading donde TanStack Query ya lo proporciona
7. Mantener services como funciones puras sin dependencias de React

**Anti-patrones a evitar:**

- Mezclar `snake_case` y `camelCase` en el mismo archivo
- Poner lógica de negocio en componentes React
- Crear helpers/utils que solo usa una feature (va dentro de la feature)
- Usar `any` en TypeScript — siempre tipar con Zod schema o interface
- Hacer fetch directo a Supabase desde componentes (siempre via service → TanStack Query)

## Project Structure & Boundaries

### Complete Project Directory Structure

```
primer/
├── .github/
│   └── workflows/
│       └── ci.yml                        ← Lint + type-check + tests en PR, deploy en merge
├── public/
│   ├── favicon.ico
│   ├── icons/                            ← Iconos PWA (192x192, 512x512)
│   └── manifest.json                     ← PWA manifest (display: standalone)
├── supabase/
│   ├── config.toml                       ← Config Supabase local (Docker)
│   ├── migrations/                       ← Migraciones SQL versionadas
│   │   └── 001_initial_schema.sql
│   ├── seed.sql                          ← Datos de prueba
│   └── functions/
│       └── ai-proxy/
│           └── index.ts                  ← Edge Function: proxy LLM con rate limiting y métricas
├── src/
│   ├── app/                              ← React Router: rutas y layouts
│   │   ├── root.tsx                      ← Layout raíz (providers, ErrorBoundary global)
│   │   ├── routes/
│   │   │   ├── _layout.tsx               ← Layout principal (header + tab bar + contenido)
│   │   │   ├── home.tsx                  ← Dashboard: lista de hábitos + heatmap
│   │   │   ├── chat.tsx                  ← Conversación con Pepito Grillo
│   │   │   ├── chat.$conversationId.tsx  ← Conversación específica (con contexto de hábito)
│   │   │   ├── habit.$id.tsx             ← Detalle de hábito (edición inline + heatmap individual)
│   │   │   ├── habit.new.tsx             ← Creación manual de hábito (formulario)
│   │   │   ├── profile.tsx               ← Perfil + datos + eliminar cuenta
│   │   │   ├── login.tsx                 ← Login (email + Google)
│   │   │   └── register.tsx              ← Registro (email + Google)
│   │   └── app.css                       ← Tailwind v4 imports + design tokens + tema Tierra Cálida
│   ├── components/
│   │   └── ui/                           ← shadcn/ui (átomos — instalados via CLI)
│   │       ├── button.tsx
│   │       ├── checkbox.tsx
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── avatar.tsx
│   │       ├── select.tsx
│   │       ├── scroll-area.tsx
│   │       ├── skeleton.tsx
│   │       ├── badge.tsx
│   │       ├── label.tsx
│   │       ├── separator.tsx
│   │       └── tooltip.tsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── LoginForm.test.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   ├── RegisterForm.test.tsx
│   │   │   │   ├── ProfileView.tsx
│   │   │   │   └── DeleteAccountDialog.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── habits/
│   │   │   ├── components/
│   │   │   │   ├── HabitCheckbox.tsx         ← Custom: micro-celebración + háptica
│   │   │   │   ├── HabitCheckbox.test.tsx
│   │   │   │   ├── HabitHeatmap.tsx          ← Custom: SVG, gradientes, ARIA grid
│   │   │   │   ├── HabitHeatmap.test.tsx
│   │   │   │   ├── HabitCard.tsx             ← Custom: tarjeta resumen (en chat y detalle)
│   │   │   │   ├── HabitDetailView.tsx       ← Custom: edición inline + heatmap individual
│   │   │   │   ├── HabitCreateForm.tsx       ← Custom: formulario + tooltips educativos
│   │   │   │   ├── HabitCreateForm.test.tsx
│   │   │   │   └── HabitList.tsx             ← Dashboard: lista con checkboxes
│   │   │   ├── hooks/
│   │   │   │   ├── useHabits.ts              ← TanStack Query wrapper
│   │   │   │   ├── useHabitRecords.ts
│   │   │   │   └── useStreakCalculation.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── agent/
│   │   │   ├── components/
│   │   │   │   ├── ChatBubble.tsx            ← Custom: burbujas usuario/agente
│   │   │   │   ├── ChatBubble.test.tsx
│   │   │   │   ├── ChatInput.tsx             ← Custom: input multi-línea + envío
│   │   │   │   ├── ChatInput.test.tsx
│   │   │   │   ├── AgentTypingIndicator.tsx  ← Custom: 3 puntos animados
│   │   │   │   └── ChatView.tsx              ← Orquestador: lista mensajes + input + typing
│   │   │   ├── hooks/
│   │   │   │   ├── useChat.ts                ← Estado de conversación + envío
│   │   │   │   └── useAgentTools.ts          ← Procesamiento de tool calls
│   │   │   ├── tools/
│   │   │   │   ├── tool-registry.ts          ← Registro de tools disponibles
│   │   │   │   ├── create-habit.tool.ts      ← Tool: crear hábito
│   │   │   │   ├── get-habits.tool.ts        ← Tool: listar hábitos
│   │   │   │   ├── get-records.tool.ts       ← Tool: consultar registros
│   │   │   │   ├── update-habit.tool.ts      ← Tool: modificar hábito
│   │   │   │   └── delete-habit.tool.ts      ← Tool: archivar hábito
│   │   │   ├── adapters/
│   │   │   │   ├── llm-adapter.ts            ← Interfaz abstracta (Port)
│   │   │   │   ├── self-hosted-adapter.ts    ← Adapter: modelo self-hosted via proxy
│   │   │   │   └── byo-ai-adapter.ts         ← Adapter: BYO-AI directo (Phase 3)
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── sync/
│   │       ├── components/
│   │       │   ├── SyncIndicator.tsx         ← Custom: nube + estados
│   │       │   └── SyncIndicator.test.tsx
│   │       ├── hooks/
│   │       │   └── useSyncStatus.ts
│   │       ├── sync-engine.ts                ← Cola FIFO + backoff exponencial
│   │       ├── sync-engine.test.ts
│   │       ├── types.ts
│   │       └── index.ts
│   ├── services/
│   │   ├── habit-service.ts                  ← CRUD hábitos (Supabase + Dexie)
│   │   ├── habit-service.test.ts
│   │   ├── record-service.ts                 ← Registro + rachas + lógica de modos
│   │   ├── record-service.test.ts
│   │   ├── conversation-service.ts           ← Persistencia de conversaciones
│   │   ├── auth-service.ts                   ← Wrapper Supabase Auth
│   │   └── user-service.ts                   ← Perfil + eliminación GDPR
│   ├── lib/
│   │   ├── supabase.ts                       ← Cliente Supabase (singleton)
│   │   ├── dexie.ts                          ← Schema Dexie.js + instancia DB
│   │   ├── errors.ts                         ← AppError type + helpers
│   │   ├── date-utils.ts                     ← Formateo ISO ↔ display
│   │   ├── case-transform.ts                 ← snake_case ↔ camelCase
│   │   └── validators.ts                     ← Zod schemas compartidos
│   ├── stores/
│   │   ├── agent-store.ts                    ← Zustand: chat state
│   │   ├── ui-store.ts                       ← Zustand: tema, offline, UI
│   │   └── sync-store.ts                     ← Zustand: cola, conexión
│   └── test/
│       ├── setup.ts                          ← Vitest setup (jest-dom, cleanup)
│       ├── test-utils.tsx                    ← Render helpers con providers
│       └── mocks/
│           ├── supabase.ts                   ← Mock del cliente Supabase
│           └── dexie.ts                      ← Mock de Dexie.js
├── e2e/                                      ← Playwright (post-MVP)
│   └── .gitkeep
├── .env.example                              ← Variables de entorno (template)
├── .env.local                                ← Variables locales (gitignored)
├── .gitignore
├── components.json                           ← Config shadcn/ui
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts                            ← Vite + React + Tailwind + PWA plugins
├── vitest.config.ts                          ← Config Vitest (hereda de vite.config)
└── README.md
```

### Architectural Boundaries

**Boundary 1 — UI ↔ Services:**
Los componentes React nunca acceden directamente a Supabase ni Dexie. Siempre pasan por el service layer (`services/`) o por hooks de TanStack Query que envuelven servicios.

```
Componente → Hook (TanStack Query / custom) → Service → Supabase / Dexie
```

**Boundary 2 — Agent ↔ Datos:**
El agente IA interactúa con datos exclusivamente via tool contracts (`features/agent/tools/`). Los tools llaman a services, nunca a Supabase/Dexie directamente.

```
LLM → tool call → Tool (validación Zod) → Service → Supabase / Dexie
```

**Boundary 3 — Local ↔ Remoto:**
Dexie.js es la fuente de datos para la UI. Supabase es la fuente de verdad para persistencia. El `sync-engine` es el único punto de comunicación entre ambos.

```
UI ← Dexie (lectura) ← sync-engine → Supabase (escritura/reconciliación)
```

**Boundary 4 — LLM Provider:**
Los adapters (`features/agent/adapters/`) son el único punto de contacto con proveedores de IA. Cambiar de proveedor = crear un nuevo adapter. La lógica del agente no se modifica.

### Requirements to Structure Mapping

| Categoría FR | Feature/Directorio | Archivos clave |
|-------------|-------------------|----------------|
| FR1-7 (Auth + Cuenta) | `features/auth/` + `services/auth-service.ts` + `services/user-service.ts` | LoginForm, RegisterForm, DeleteAccountDialog, auth-service |
| FR8-17 (Agente IA) | `features/agent/` + `supabase/functions/ai-proxy/` | ChatView, tools/*, adapters/*, ai-proxy Edge Function |
| FR18-24 (Gestión Hábitos) | `features/habits/` + `services/habit-service.ts` | HabitCreateForm, HabitDetailView, habit-service |
| FR25-32 (Registro + Tracking) | `features/habits/` + `services/record-service.ts` | HabitCheckbox, HabitHeatmap, HabitList, record-service |
| FR33-36 (Offline + Sync) | `features/sync/` + `lib/dexie.ts` | sync-engine, SyncIndicator, dexie schema |
| FR37-39 (PWA) | `vite.config.ts` + `public/` | manifest.json, iconos, vite-plugin-pwa config |
| FR40-41 (Admin) | Supabase Dashboard (externo) | — (no hay panel custom en MVP) |

**Cross-cutting concerns:**

| Concern | Ubicación |
|---------|-----------|
| Transformación snake_case ↔ camelCase | `lib/case-transform.ts` — usado por todos los services |
| Error handling | `lib/errors.ts` — AppError type + ErrorBoundary por feature |
| Validación (Zod) | `lib/validators.ts` (compartidos) + `features/*/types.ts` (específicos) |
| Design tokens | `app/app.css` — tema Tierra Cálida (light + dark) |
| Estado offline | `stores/sync-store.ts` + `features/sync/sync-engine.ts` |

### Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                  │
│                                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐                  │
│  │ React UI │◄──►│ TanStack │◄──►│ Services │                  │
│  │(features)│    │  Query   │    │  Layer   │                  │
│  └──────────┘    └──────────┘    └─────┬────┘                  │
│       ▲                                │                        │
│       │              ┌─────────────────┼─────────────┐         │
│       │              ▼                 ▼             │         │
│       │         ┌─────────┐     ┌──────────┐        │         │
│       └─────────│ Dexie.js│     │  Sync    │        │         │
│    useLiveQuery │ (local) │◄───►│  Engine  │        │         │
│                 └─────────┘     └────┬─────┘        │         │
│                                      │              │         │
│  ┌──────────┐    ┌──────────┐       │              │         │
│  │  Agent   │◄──►│   Tool   │───────┘              │         │
│  │ Adapter  │    │ Registry │                      │         │
│  └────┬─────┘    └──────────┘                      │         │
│       │                                             │         │
└───────┼─────────────────────────────────────────────┼─────────┘
        │                                             │
        ▼                                             ▼
┌───────────────┐                           ┌─────────────────┐
│ Supabase Edge │                           │   Supabase      │
│ Function      │                           │ (Auth + BD +    │
│ (AI Proxy)    │──► LLM Provider           │  Realtime)      │
└───────────────┘                           └─────────────────┘
```

### Development Workflow

**Dev local:**

```bash
pnpm dev              # Vite dev server (HMR)
pnpm supabase start   # Supabase local (Docker)
pnpm test             # Vitest watch mode
```

**CI (GitHub Actions):**

```bash
pnpm lint             # ESLint
pnpm type-check       # tsc --noEmit
pnpm test -- --run    # Vitest single run
pnpm build            # Vite build (verifica que compila)
```

**Deploy:** Merge a main → Cloudflare Pages auto-deploy.

## Architecture Validation Results

### Coherence Validation ✅

**Compatibilidad de Decisiones:**
Todas las decisiones tecnológicas trabajan en armonía: React 19 + TypeScript + Vite 8 como base frontend, Supabase como backend completo (Auth + PostgreSQL + Edge Functions + Realtime), Dexie.js como cache local reactiva, TanStack Query para estado servidor y Zustand para estado UI. No se detectan conflictos de versiones ni incompatibilidades. shadcn/ui con Radix primitives encaja perfectamente con Tailwind CSS v4 y el sistema de design tokens.

**Consistencia de Patrones:**
Los patrones de implementación soportan coherentemente las decisiones arquitectónicas:
- Naming: snake_case (BD) → camelCase (TS) con punto único de conversión en service layer
- Feature-based organization alinea con las 4 features principales (auth, habits, agent, sync)
- Adapter pattern para IA permite intercambio de proveedores sin afectar el dominio
- Barrel exports mantienen boundaries claras entre features

**Alineación Estructural:**
La estructura de proyecto soporta todas las decisiones arquitectónicas:
- `features/` organiza por dominio, no por tipo técnico
- `services/` centraliza la lógica de negocio y el punto de conversión de naming
- `lib/` contiene utilidades compartidas sin dependencias circulares
- `supabase/` separa claramente la configuración de backend
- `stores/` diferencia estado UI de estado servidor

### Requirements Coverage Validation ✅

**Cobertura de Requisitos Funcionales (41/41 FRs):**

| Categoría | FRs | Soporte Arquitectónico |
|-----------|-----|----------------------|
| Identidad y Cuenta (FR1-7) | ✅ | Supabase Auth + RLS + CASCADE DELETE |
| Agente IA (FR8-17) | ✅ | Edge Function proxy + LLM Adapter + Tool contracts (Zod) |
| Gestión de Hábitos (FR18-24) | ✅ | Service layer + Dexie cache + modelo de dominio |
| Registro y Seguimiento (FR25-32) | ✅ | Operaciones locales <100ms + SVG heatmap con ARIA |
| Datos Offline y Sync (FR33-36) | ✅ | Dexie.js + FIFO queue + exponential backoff + last-write-wins |
| PWA e Instalación (FR37-39) | ✅ | vite-plugin-pwa + Workbox + manifest.json |
| Administración (FR40-41) | ✅ | Supabase Dashboard directo (no custom MVP) |

**Cobertura de Requisitos No Funcionales (30/30 NFRs):**

| Categoría | Estado | Mecanismo |
|-----------|--------|-----------|
| Performance (NFR1-5) | ✅ | Operaciones locales primero, sync background, streaming preparado |
| Security (NFR6-12) | ✅ | HTTPS, RLS, cascade delete, dexie-encrypted (Phase 3) |
| Scalability (NFR13-16) | ✅ | Stateless frontend, Supabase managed, índices eficientes |
| Accessibility (NFR17-20) | ✅ | Radix primitives + ARIA + focus management + tokens de contraste |
| Integration (NFR21-30) | ✅ | Adapter pattern + Zod schemas + feature flags + degradación sin IA |

### Implementation Readiness Validation ✅

**Completitud de Decisiones:**
- Todas las decisiones críticas documentadas con versiones específicas verificadas
- Patrones de implementación completos para naming, estructura, formatos, comunicación y procesos
- Reglas de consistencia claras y aplicables por agentes IA
- Ejemplos concretos para cada patrón principal (buenos ejemplos y anti-patrones)

**Completitud Estructural:**
- Estructura de proyecto completa con todos los archivos y directorios definidos
- Puntos de integración claramente especificados (service layer como boundary)
- Boundaries de componentes bien definidas (features aisladas con barrel exports)
- Mapping de requisitos a estructura completado

**Completitud de Patrones:**
- Todos los puntos de conflicto potencial entre agentes IA abordados
- Convenciones de naming comprensivas (BD, API, código, archivos)
- Patrones de comunicación completamente especificados (eventos, estado, errores)
- Patrones de proceso documentados (error handling, loading states, sync)

### Gap Analysis Results

**Gaps Críticos:** 0 — No se identifican elementos faltantes que bloqueen implementación.

**Gaps Importantes (a abordar durante implementación):**
- Esquema detallado de BD se definirá en stories de implementación (modelo conceptual suficiente)
- Configuración exacta de Workbox caching strategies se refinará con uso real
- Métricas de observabilidad específicas se definirán al implementar el dashboard

**Gaps Nice-to-Have (post-MVP):**
- Estrategia de migración de esquema para futuras versiones
- Documentación de API para Edge Functions (auto-generada con implementación)
- Guía de contribución para desarrolladores externos

### Validation Issues Addressed

No se encontraron issues críticos ni importantes durante la validación. La arquitectura es coherente, completa y lista para implementación.

### Architecture Completeness Checklist

**✅ Requirements Analysis**

- [x] Contexto del proyecto analizado exhaustivamente (PRD, UX Spec, Product Brief)
- [x] Escala y complejidad evaluadas (MVP → 1000 MAU)
- [x] Restricciones técnicas identificadas (offline-first, BYO-AI, PWA)
- [x] Concerns cross-cutting mapeados (sync, auth, error handling, accessibility)

**✅ Architectural Decisions**

- [x] Decisiones críticas documentadas con versiones verificadas
- [x] Stack tecnológico completamente especificado
- [x] Patrones de integración definidos (Adapter, Service Layer, Feature-based)
- [x] Consideraciones de performance abordadas (local-first ops, background sync)

**✅ Implementation Patterns**

- [x] Convenciones de naming establecidas (snake_case↔camelCase)
- [x] Patrones de estructura definidos (feature-based, co-located tests)
- [x] Patrones de comunicación especificados (TanStack Query, Zustand, eventos)
- [x] Patrones de proceso documentados (error handling, loading, sync)

**✅ Project Structure**

- [x] Estructura de directorios completa definida
- [x] Boundaries de componentes establecidas
- [x] Puntos de integración mapeados
- [x] Mapping de requisitos a estructura completado

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** HIGH — basado en cobertura completa de requisitos, coherencia verificada y patrones comprensivos.

**Fortalezas Clave:**
- Stack moderno y bien integrado con excelente soporte de IA para generación de código
- Arquitectura offline-first robusta con sync transparente
- Patrón Adapter para IA permite flexibilidad total de proveedor
- Feature-based organization facilita trabajo paralelo de agentes IA
- Design tokens y Atomic Design aseguran consistencia visual

**Áreas para Mejora Futura:**
- Estrategia de migración de esquema para evolución post-MVP
- Observabilidad avanzada (tracing distribuido cuando escale)
- Testing E2E con Playwright (preparado pero post-MVP)
- Temas cosméticos adicionales (Salvia, Atardecer) como monetización

### Implementation Handoff

**Guías para Agentes IA:**

- Seguir todas las decisiones arquitectónicas exactamente como están documentadas
- Usar patrones de implementación consistentemente en todos los componentes
- Respetar estructura de proyecto y boundaries entre features
- Referirse a este documento para todas las preguntas arquitectónicas
- Punto único de conversión snake_case↔camelCase en service layer

**Primera Prioridad de Implementación:**

1. Inicializar proyecto con `pnpm dlx shadcn@latest init -t vite`
2. Configurar Supabase local con `supabase init`
3. Establecer estructura de directorios base
4. Implementar feature `auth` como primera vertical completa
