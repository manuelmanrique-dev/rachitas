# 🟩 Rachitas

> *Un compañero de desarrollo personal, no una app que te persigue.*

Rachitas es una herramienta de seguimiento de hábitos con visualización tipo heatmap (inspirada en el contribution graph de GitHub) y un agente IA guiado por la filosofía de **Hábitos Atómicos** de James Clear.

La idea es simple: registrar tus rachas sin culpa, celebrar el progreso sin toxicidad, y tener un compañero que madura contigo.

---

## 🧭 Estado actual del proyecto

**Fase: Pre-implementación** — Planificación completa, validando readiness para desarrollo.

| Fase | Estado |
|------|--------|
| 🟩 Brainstorming | ✅ Completado |
| 🟩 Investigación (mercado, dominio, técnica) | ✅ Completado |
| 🟩 Product Brief | ✅ Completado |
| 🟩 PRD + Validación | ✅ Completado |
| 🟩 UX Design Spec | ✅ Completado |
| 🟩 Arquitectura | ✅ Completado |
| 🟩 Epics y Stories | ✅ Completado |
| 🟨 Implementation Readiness Check | 🔄 En revisión |
| ⬜ Sprint Planning | 🔜 Próximo |
| ⬜ Desarrollo | — |

---

## 💡 Visión del producto

Una app de hábitos que no te castiga por fallar. Que no te manda notificaciones ansiosas. Que no te compara con nadie.

Lo que sí hace:
- Muestra tu progreso en un heatmap visual y honesto
- Te ayuda a **diseñar** hábitos reales (no solo a registrar checks)
- Tiene un agente IA empático basado en el framework de Hábitos Atómicos
- Modelo BYO-AI: trae tu propia API key, sin suscripciones ocultas
- Crece y se adapta contigo — el día 1 no es igual que el año 3
- Core 100% gratuito, siempre

---

## 🗂️ Estructura del repositorio

```
rachitas/
├── _bmad/                                     ← Configuración BMad Method
├── _bmad-output/
│   ├── planning-artifacts/                    ← PRD, arquitectura, UX, epics, research
│   └── implementation-artifacts/              ← Stories y código (próximamente)
└── README.md
```

---

## 🛠️ Metodología

Este proyecto se desarrolla usando **[BMad Method](https://github.com/bmad-code-org/BMAD-METHOD)** — un framework de desarrollo agéntico con IA que estructura el proceso completo: desde el brief hasta el código, pasando por PRD, arquitectura y stories.

El repositorio documenta el proceso real de principio a fin, no solo el resultado.

---

## 🧱 Anti-patrones de diseño (los "nunca jamás")

Nacidos de experiencias reales durante el brainstorming:

- ❌ Notificaciones que castigan la ausencia (efecto Duolingo)
- ❌ Progresión forzada que rompe hábitos consolidados
- ❌ Tono del agente punitivo o condescendiente
- ❌ Funcionalidades básicas detrás de un muro de pago

---

## 📍 Roadmap de alto nivel

**Épica 1 — Fundación y PWA Instalable**
Setup inicial, PWA funcional, design system base. La app se puede instalar y tiene estructura.

**Épica 2 — Identidad de Usuario**
Registro, login (email + social), perfil y eliminación de cuenta.

**Épica 3 — Gestión de Hábitos**
CRUD de hábitos, frecuencia configurable, modos de dificultad (normal/difícil).

**Épica 4 — Registro y Visualización**
Check-in de hábitos, cálculo de rachas, heatmap estilo GitHub, estadísticas.

**Épica 5 — Sincronización Offline y Multi-dispositivo**
Offline-first con Dexie.js, sincronización con Supabase, resolución de conflictos.

**Épica 6 — Agente IA Conversacional**
Onboarding conversacional, framework Hábitos Atómicos, modelo BYO-AI.

**Épica 7 — Administración y Monitoreo**
Health checks, métricas de uso, panel de administración.

---

## 👤 Autor

**Manuel** — Desarrollador en formación, Región de Murcia / Lebrija.
Aprendiendo BMad Method construyendo un producto real.

---

*Proyecto iniciado: febrero 2026 | Sin prisa, con dirección.*
