# Story 1.1: Inicializar Proyecto con Starter Template y Tooling

Status: ready-for-dev

## Story

As a **developer**,
I want to scaffold the project using the architecture-defined starter template with testing, linting and CI/CD configured,
So that I have a reproducible, tested development environment from day one.

## Acceptance Criteria

1. **Given** no existing project directory **When** I run `pnpm dlx shadcn@latest init -t vite` **Then** a Vite 8 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui project is created
2. **And** React Router 7 is installed and configured (Framework mode, `ssr: false`)
3. **And** Vitest + React Testing Library + jest-dom are configured with a passing sample test
4. **And** the feature-based directory structure is created (`features/{auth,habits,agent,sync}`, `services/`, `lib/`, `stores/`, `app/routes/`)
5. **And** ESLint + TypeScript strict mode are configured
6. **And** GitHub Actions CI pipeline runs lint + type-check + tests + build on PR
7. **And** `pnpm dev` starts the dev server with HMR
8. **And** `pnpm test` runs Vitest in watch mode
9. **And** `pnpm build` genera el bundle de producción sin errores

## Tasks / Subtasks

- [ ] Task 1: Scaffold proyecto base (AC: #1)
  - [ ] 1.1 Ejecutar `pnpm dlx shadcn@latest init -t vite` para crear proyecto base
  - [ ] 1.2 Verificar que Vite 8, React 19, TypeScript, Tailwind CSS v4, shadcn/ui están instalados
  - [ ] 1.3 Configurar `components.json` de shadcn/ui con paths correctos (`src/components/ui/`)
- [ ] Task 2: Instalar y configurar React Router 7 Framework mode (AC: #2)
  - [ ] 2.1 `pnpm add react-router @react-router/dev` — React Router 7 + Vite plugin para Framework mode
  - [ ] 2.2 Integrar `reactRouter()` plugin en `vite.config.ts` (ver sección Dev Notes)
  - [ ] 2.3 Crear `react-router.config.ts` con `ssr: false`
  - [ ] 2.4 Crear `src/app/root.tsx` como layout raíz con providers
  - [ ] 2.5 Crear `src/app/routes/_layout.tsx` como layout principal (placeholder)
  - [ ] 2.6 Crear ruta `src/app/routes/home.tsx` como página inicial (placeholder)
- [ ] Task 3: Configurar testing (AC: #3, #8)
  - [ ] 3.1 `pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`
  - [ ] 3.2 Crear `vitest.config.ts` independiente (NO heredar de vite.config — ver Dev Notes)
  - [ ] 3.3 Crear `src/test/setup.ts` — usar `import '@testing-library/jest-dom/vitest'` (NO el import genérico)
  - [ ] 3.4 Crear `src/test/test-utils.tsx` con render helper con providers
  - [ ] 3.5 Escribir un sample test que pase (verificar que el render funciona)
  - [ ] 3.6 Configurar script `pnpm test` → `vitest` y `pnpm test:run` → `vitest run`
- [ ] Task 4: Crear estructura de directorios (AC: #4)
  - [ ] 4.1 Crear `src/features/{auth,habits,agent,sync}/` con `index.ts` barrel export vacío
  - [ ] 4.2 Crear subdirectorios `components/`, `hooks/`, `types.ts` en cada feature
  - [ ] 4.3 Crear `src/services/` con `.gitkeep`
  - [ ] 4.4 Crear `src/lib/` con archivos placeholder: `supabase.ts`, `dexie.ts`, `errors.ts`, `validators.ts`, `date-utils.ts`, `case-transform.ts`
  - [ ] 4.5 Crear `src/stores/` con archivos placeholder: `agent-store.ts`, `ui-store.ts`, `sync-store.ts`
  - [ ] 4.6 Crear `src/test/mocks/` con `supabase.ts` y `dexie.ts` placeholders
  - [ ] 4.7 Crear `e2e/.gitkeep`
  - [ ] 4.8 Crear `supabase/` estructura: `config.toml`, `migrations/`, `seed.sql`, `functions/ai-proxy/`
  - [ ] 4.9 Crear `public/icons/` para iconos PWA (placeholder)
- [ ] Task 5: Configurar ESLint + TypeScript strict (AC: #5)
  - [ ] 5.1 Verificar/ajustar `tsconfig.json` (y `tsconfig.app.json` si existe) con `strict: true`
  - [ ] 5.2 Configurar ESLint (el starter puede traerlo; instalar `@typescript-eslint/eslint-plugin` y `@typescript-eslint/parser` si no vienen incluidos)
  - [ ] 5.3 Configurar script `pnpm lint` → `eslint .`
  - [ ] 5.4 Configurar script `pnpm type-check` → `tsc -b`
- [ ] Task 6: GitHub Actions CI (AC: #6)
  - [ ] 6.1 Crear `.github/workflows/ci.yml`
  - [ ] 6.2 Configurar jobs: `pnpm lint`, `pnpm type-check`, `pnpm test:run`, `pnpm build`
  - [ ] 6.3 Trigger en PR a main
- [ ] Task 7: Configurar entorno y archivos base (AC: #7)
  - [ ] 7.1 Crear `.env.example` con variables template (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
  - [ ] 7.2 Configurar `.gitignore` para `.env.local`, `node_modules`, `dist`
  - [ ] 7.3 Crear `src/app/app.css` con imports de Tailwind v4 + placeholders para design tokens (importar desde `root.tsx`)
  - [ ] 7.4 Verificar que `pnpm dev` arranca el servidor con HMR
  - [ ] 7.5 Verificar que `pnpm build` genera el bundle sin errores

## Dev Notes

### Comando de Inicialización Exacto

```bash
pnpm dlx shadcn@latest init -t vite
```

Este comando genera un proyecto con: Vite 8, React 19, TypeScript, Tailwind CSS v4.2, shadcn/ui. shadcn CLI v4.1.1 incluye template `vite` específico.

### Dependencias Post-Init

```bash
# Routing (Framework mode requiere ambos paquetes)
pnpm add react-router @react-router/dev

# Testing (incluye @vitejs/plugin-react para vitest.config.ts independiente)
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# PWA (NO instalar en esta story — pertenece a Story 1.4)
# pnpm add -D vite-plugin-pwa workbox-window
```

**IMPORTANTE:** NO instalar dependencias de PWA, Supabase, Dexie.js, TanStack Query, ni Zustand en esta story. Solo scaffold + routing + testing + CI. Las demás se añaden en sus stories correspondientes.

### Versiones Verificadas (2026-03-28)

| Paquete | Versión |
|---------|---------|
| vite | 8.0.3 |
| react / react-dom | 19.2.4 |
| react-router | 7.13.2 |
| @react-router/dev | 7.13.2 |
| tailwindcss | 4.2.2 |
| @tailwindcss/vite | 4.2.2 |
| shadcn (CLI) | 4.1.1 |
| vitest | 4.1.2 |
| @testing-library/react | 16.3.2 |
| @testing-library/jest-dom | 6.9.1 |
| @testing-library/user-event | 14.6.1 |
| jsdom | 29.0.1 |
| zod | 4.3.6 |

### Tailwind CSS v4 — Sin tailwind.config.js

Tailwind v4 NO usa `tailwind.config.js`. La customización se hace directamente en CSS con `@theme`:

```css
/* src/app/app.css */
@import "tailwindcss";

@theme {
  /* Design tokens se definirán en Story 1.2 */
  /* Placeholder para Tierra Cálida */
}
```

Plugin de Vite: `@tailwindcss/vite` (no PostCSS plugin).

### React Router 7 — Framework Mode SPA

Framework mode requiere el plugin de Vite `@react-router/dev` + el archivo de config:

```typescript
// vite.config.ts — agregar reactRouter() al array de plugins
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),  // Framework mode — lee react-router.config.ts
  ],
});
```

```typescript
// react-router.config.ts
import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src/app",  // El default es "app/" — nuestra estructura usa "src/app/"
  ssr: false,               // SPA mode — sin server-side rendering
} satisfies Config;
```

Code splitting automático por rutas. Usar `clientLoader` para cargar datos.

**NOTA:** El starter de shadcn puede traer `@vitejs/plugin-react` o similar. Reemplazar con `reactRouter()` que ya incluye el plugin de React internamente. NO usar ambos simultáneamente.

### Vitest Config

**IMPORTANTE:** NO heredar de `vite.config.ts` con `mergeConfig`. El plugin `reactRouter()` inyecta lógica de compilación de rutas que hace crashear Vitest. Crear config independiente:

```typescript
// vitest.config.ts — config INDEPENDIENTE, no hereda de vite.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),        // Solo React plugin para tests — NO reactRouter()
    tailwindcss(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
```

Esto requiere instalar `@vitejs/plugin-react` como devDependency adicional:
```bash
pnpm add -D @vitejs/plugin-react
```

### GitHub Actions CI

```yaml
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm test:run
      - run: pnpm build
```

### Estructura de Directorios Placeholders

Los archivos placeholder (`index.ts`, `types.ts`) deben contener solo comentarios o exports vacíos. NO implementar lógica — solo crear la estructura para que el proyecto sea navegable y los imports futuros funcionen.

```typescript
// features/auth/index.ts
// Auth feature — implementación en Epic 2
export {};
```

```typescript
// lib/errors.ts
// AppError type — implementación posterior
export {};
```

### Convenciones de Naming

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Componentes React | PascalCase.tsx | `HabitCheckbox.tsx` |
| Archivos no-componentes | kebab-case.ts | `habit-service.ts` |
| Hooks | use + camelCase | `useHabits.ts` |
| Tests | co-locados, `.test.tsx` | `HabitCheckbox.test.tsx` |
| Rutas URL | kebab-case | `/habit-detail/:id` |
| Constantes | UPPER_SNAKE_CASE | `MAX_RETRY_ATTEMPTS` |
| Variables/funciones | camelCase | `getUserHabits()` |

### Qué NO Hacer

- **NO instalar Supabase, Dexie.js, TanStack Query, Zustand, vite-plugin-pwa** — cada uno se instala en su story
- **NO crear implementaciones reales** en los archivos placeholder (solo exports vacíos)
- **NO configurar dark mode** aún — eso es Story 1.2
- **NO crear componentes UI custom** — solo la estructura de directorios
- **NO añadir deploy a Cloudflare** en el CI — solo lint + type-check + test + build
- **NO crear `tailwind.config.js`** — Tailwind v4 usa `@theme` en CSS

### Project Structure Notes

Alineado con la estructura definida en [Source: architecture.md#Complete Project Directory Structure]:

```
primer/
├── .github/workflows/ci.yml
├── public/icons/
├── supabase/{config.toml,migrations/,seed.sql,functions/ai-proxy/}
├── src/
│   ├── app/{root.tsx,routes/}
│   ├── components/ui/          ← shadcn/ui (generados por CLI)
│   ├── features/{auth,habits,agent,sync}/
│   ├── services/
│   ├── lib/
│   ├── stores/
│   └── test/{setup.ts,test-utils.tsx,mocks/}
├── e2e/
├── .env.example
├── vite.config.ts
├── vitest.config.ts
└── tsconfig.json
```

### References

- [Source: architecture.md#Starter Template Evaluation] — Comando de inicialización y stack base
- [Source: architecture.md#Complete Project Directory Structure] — Estructura completa de directorios
- [Source: architecture.md#Naming Patterns] — Convenciones de naming
- [Source: architecture.md#Structure Patterns] — Tests co-locados, barrel exports, services puros
- [Source: architecture.md#Development Workflow] — Scripts dev, CI, deploy
- [Source: architecture.md#Core Architectural Decisions] — Decisiones críticas del stack
- [Source: architecture.md#Implementation Handoff] — Secuencia de implementación
- [Source: epics.md#Epic 1] — Story 1.1 acceptance criteria y requisitos técnicos

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
