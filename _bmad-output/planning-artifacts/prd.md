---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
inputDocuments:
  - "_bmad-output/planning-artifacts/product-brief-primer-bmad-2026-03-09.md"
  - "_bmad-output/planning-artifacts/research/market-habit-tracking-ai-research-2026-03-02.md"
  - "_bmad-output/planning-artifacts/research/domain-apps-habitos-bienestar-research-2026-03-03.md"
  - "_bmad-output/planning-artifacts/research/technical-stack-mvp-pwa-research-2026-03-05.md"
  - "_bmad-output/planning-artifacts/research/technical-revision-critica-stack-mvp-pwa-2026-03-06.md"
  - "_bmad-output/brainstorming/brainstorming-session-2026-02-28.md"
documentCounts:
  briefs: 1
  research: 4
  brainstorming: 1
  projectDocs: 0
workflowType: 'prd'
classification:
  projectType: web_app
  domain: wellness_personal_development
  complexity: medium
  projectContext: greenfield
lastEdited: '2026-03-16'
editHistory:
  - date: '2026-03-16'
    changes: 'Post-validation fixes: implementation leakage removed from FRs/NFRs (15), AI FR measurability improved (3), NFR metrics added (5), auth journey gap closed, FR38 clarified'
---

# Product Requirements Document - Rachitas

**Author:** Manuel
**Date:** 2026-03-13

## Executive Summary

Rachitas es una PWA de desarrollo personal para hispanohablantes que combina un agente conversacional de IA especializado en cambio de comportamiento con un sistema de tracking de hábitos de mínima fricción. El agente — el Pepito Grillo — guía al usuario mediante reflexión estructurada basada en el framework de Hábitos Atómicos (señal, rutina, recompensa, identidad), diseñando hábitos a través de conversación en vez de formularios. La app se configura sola como resultado de esa conversación: el usuario habla, y los objetivos, hábitos y contexto se estructuran automáticamente.

El producto nace de un hueco de mercado estructural: no existe ninguna app que combine IA conversacional profunda con un framework específico de cambio de comportamiento, diseñada nativamente en español, con un modelo donde toda la funcionalidad core es gratuita. En un mercado de 580M+ hispanohablantes donde Hábitos Atómicos es bestseller y la retención de apps de hábitos es del 3% a los 30 días, Rachitas apuesta por resolver la retención desde la raíz: acompañamiento activo sin juicio, eliminación de fricción, y una primera interacción con IA que sea memorable.

La monetización se inspira en la industria del gaming: pase de temporada y mejoras estéticas. Toda la funcionalidad — incluida la IA conversacional — es gratuita. La IA básica se ofrece mediante modelos open source self-hosted, con opción BYO-AI para usuarios que prefieran traer su propia API key. El framework de comportamiento es extensible más allá de Hábitos Atómicos hacia otros marcos de psicología del comportamiento.

Este es también un vehículo de aprendizaje para el desarrollador: dominar el stack técnico (React, Vite, Supabase, IA), la metodología Agile con BMAD, y el desarrollo asistido por agentes de IA (Claude Code). No hay inversores ni deadlines — el éxito se mide en personas ayudadas y aprendizaje adquirido.

### What Makes This Special

1. **La reflexión guiada como motor de cambio.** El Pepito Grillo no es un chatbot — es un agente que hace las preguntas correctas en el momento correcto para provocar reflexión real. La conversación configura la app: el usuario habla y todo se estructura solo. La magia es la ausencia de fricción, no la presencia de tecnología.

2. **Acompañamiento activo sin castigo.** Anti-patrones sagrados: nunca notificaciones que generen culpa, nunca progresión forzada, nunca tono punitivo. Pero tampoco silencio pasivo — el agente nota, se interesa, y está presente sin invadir. Si te vas, la app espera. Si vuelves, te recibe sin drama.

3. **Español nativo como ventaja de timing.** No es una traducción — la app piensa, siente y se comunica en español desde su concepción. La ventana competitiva está abierta ahora: ningún competidor relevante ocupa este espacio. Hay que capitalizar antes de que se cierre.

4. **La calidad de la primera interacción es existencial.** Si el Pepito Grillo no impresiona en los primeros 2 minutos, no hay segunda oportunidad. La primera conversación define si el usuario se queda o se va. Esto condiciona las decisiones técnicas sobre modelos de IA.

5. **Framework extensible, no atado a un libro.** Hábitos Atómicos es el punto de entrada perfecto por su popularidad, pero la arquitectura del agente permite evolucionar hacia otros marcos de psicología del comportamiento sin reescribir el producto.

## Project Classification

- **Tipo de proyecto:** Web App (PWA/SPA) — TypeScript + React + Vite, instalable en homescreen
- **Dominio:** Wellness / Desarrollo Personal — app de bienestar general, no médica
- **Complejidad:** Media — integración con IA conversacional, sync offline/online (Dexie.js + Supabase), consideraciones GDPR para datos sensibles de hábitos, pero sin regulación médica
- **Contexto:** Greenfield — producto nuevo desde cero
- **Nombre de trabajo:** Rachitas (no definitivo)

## Success Criteria

### User Success

- **Completar el primer hábito con el agente:** >60% de usuarios que inician la conversación de onboarding con el Pepito Grillo completan el flujo y salen con al menos un hábito configurado (señal, rutina, recompensa).
- **Retención Day 7:** >20% (industria: 10-15%). El usuario vuelve tras la primera semana.
- **Retención Day 30:** >10% (industria: 3%). El usuario se queda tras el primer mes.
- **Registros semanales:** 3+ días/semana por usuario activo a los 3 meses, 4+ a los 12 meses.
- **Uso del agente IA:** >1 conversación/semana por usuario activo. Uso orgánico, sin empujar.
- **Retorno post-pausa:** >30% de usuarios inactivos (>14 días) vuelven en 30 días por su cuenta. Indica que la app no genera rechazo.
- **Primera cumbre (7 días):** >40% de usuarios nuevos alcanzan el primer hito de gamificación.
- **Indicador cualitativo:** Que un usuario sienta que Rachitas es un lugar seguro donde trabajar sus inseguridades. Se mide con feedback cualitativo (reviews, mensajes) y uso sostenido del agente.

### Business Success

| Objetivo | Target 3 meses | Target 12 meses |
|----------|-----------------|------------------|
| **Aprendizaje técnico** | MVP funcional desplegado. Manuel domina React + Vite + Supabase + IA | Producto maduro, stack dominado, preparado para segundo proyecto |
| **Portfolio** | Rachitas como primer proyecto demostrable | Portfolio sólido con Rachitas como pieza central |
| **MAU** | 50-100 | 500-1,000 |
| **Cubrir costes** | Identificar costes reales (Supabase, IA, hosting) | Ingresos >= costes operativos |
| **Primer ingreso** | N/A | Primeras ventas de pase de temporada |

### Technical Success

- **MVP desplegado:** PWA funcional instalable en homescreen, con todas las features core operativas sin errores críticos.
- **Stack dominado:** Manuel puede explicar y defender cada decisión técnica del proyecto (React, Vite, Dexie.js, Supabase, IA).
- **Desarrollo con IA:** Flujo de trabajo eficiente con Claude Code y Cursor. Capacidad de generar features completas con agentes.
- **Metodología Agile/BMAD:** Proceso interiorizado — poder replicarlo en futuros proyectos.
- **Arquitectura agentic-ready:** Service layer bien separado que permita exponer un MCP server en el futuro sin reescribir.
- **Offline funcional:** Dexie.js como cache local + Supabase como fuente de verdad. La app funciona sin conexión para registro de hábitos.
- **Coste operativo <$30/mes** en fase inicial (Supabase free/Pro + hosting + IA self-hosted).

### Measurable Outcomes

| Métrica | Cómo se mide | Target |
|---------|-------------|--------|
| Tasa de completación onboarding IA | Usuarios que terminan el flujo de diseño de hábito / usuarios que lo inician | >60% |
| Retención D7 | Cohorte semanal | >20% |
| Retención D30 | Cohorte mensual | >10% |
| Ratio registro/apertura | Registros de hábito / aperturas de app | >70% |
| Uso del agente | % de MAU que interactúa con Pepito Grillo 1+/semana | >40% |
| Tasa de resurrección | % inactivos (>14 días) que vuelven en 30 días | >30% |

**Anti-métricas (lo que NO medimos):**
- No medimos "días de racha perfecta" — genera streak anxiety.
- No medimos "usuarios totales registrados" — vanity metric.
- No comparamos usuarios entre sí — nunca leaderboards de hábitos personales.

## Product Scope & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP con componente didáctico — el objetivo es doble: (1) entregar una experiencia de acompañamiento en hábitos que no existe en español, y (2) construir un framework agéntico que demuestre habilidades de diseño de agentes IA en el portfolio del desarrollador.

**Recurso principal:** Un desarrollador (Manuel) trabajando con agentes IA (Claude Code, Cursor). Sin equipo, sin inversores, sin deadlines externos. El ritmo lo marca el aprendizaje.

**Principio de scoping:** Preferir profundidad en el agente IA sobre amplitud en features de tracking. Un agente excelente con tracking básico es más valioso (producto y portfolio) que un tracking sofisticado con agente mediocre.

### MVP Feature Set (Phase 1)

**Core User Journeys Soportados:**
- Journey 1 (Marta): Onboarding conversacional → hábito configurado → heatmap ✅
- Journey 2 (Diego): Modos de dificultad, frecuencia, registro rápido ✅
- Journey 3 (Roberto): Tono empático, modo Difícil, recaída sin castigo ✅
- Journey 4 (Hábito poco realista): Detección básica vía prompt ✅
- Journey 5 (Eliminación de cuenta): Flujo GDPR completo ✅
- Journey 6 (Admin): Simplificado — Supabase Dashboard directo ✅
- Journey 7 (Reencuentro): Bienvenida sin culpa, tono del agente ✅

**Must-Have Capabilities:**

| # | Capability | Justificación |
|---|-----------|---------------|
| 1 | **Framework agéntico para Pepito Grillo** | Core del producto y pieza central del portfolio. Arquitectura tipo MCP que permita al agente interactuar con datos de la app (hábitos, registros, objetivos). La conversación genera datos estructurados automáticamente. |
| 2 | **Onboarding conversacional** | Sin esto, Rachitas es otra app de formularios. El usuario habla, el agente diseña el hábito (señal, rutina, recompensa). |
| 3 | **Registro de hábitos con heatmap** | Feature base de tracking. Heatmap estilo GitHub. Registro binario y cuantificable. Notas opcionales. |
| 4 | **2 modos de dificultad: Normal + Difícil** | Normal (acumulativo) para la mayoría. Difícil (resta sin resetear) para hábitos de alto compromiso como el de Roberto. Hardcore se añade post-MVP. |
| 5 | **Frecuencia configurable** | Diario, semanal (X de 7), mensual, personalizada. La racha se adapta. |
| 6 | **Auth + sync multi-dispositivo** | Supabase Auth (email + social). Dexie.js cache local + Supabase fuente de verdad. |
| 7 | **PWA instalable** | vite-plugin-pwa + Workbox. Homescreen. Offline para registro. |
| 8 | **Tono empático del agente (prompt engineering)** | Anti-patrones codificados en prompts: nunca castigar, nunca forzar, nunca punitivo. |
| 9 | **Flujo eliminación cuenta + datos** | GDPR. Borrado completo Supabase + Dexie.js. |
| 10 | **Bienvenida tras ausencia** | Tono sin culpa cuando el usuario vuelve. Implementación vía prompt + UI simple. |

**Decidido simplificar para MVP:**
- Panel admin → acceso directo a Supabase Dashboard (sin panel custom)
- Modos de dificultad → 2 de 3 (Normal + Difícil, sin Hardcore)
- Detección de hábitos poco realistas → vía prompt engineering, no lógica programática
- Streaming de respuestas IA → arquitectura preparada, implementación post-MVP

### Post-MVP Features

**Phase 2 — Growth:**

| Feature | Dependencia | Valor |
|---------|------------|-------|
| Modo Hardcore (vuelta a cero) | Lógica de modos MVP | Completa la trilogía de dificultad |
| Panel admin custom | Supabase Dashboard MVP | Métricas propias, baneo, costes IA |
| Sistema de cumbres alpinas + trofeos | Heatmap MVP | Primera gamificación |
| Pase de temporada + cosméticos | Sistema de cumbres | Primera monetización |
| Streaming de respuestas IA | Framework agéntico MVP | Experiencia token-por-token |
| Detección de patrones por el agente | Framework agéntico + datos acumulados | "Los lunes son tu día débil" |
| Insights cualitativos del agente | Framework agéntico + historial | "Antes te costaba, ahora lo haces sin pensar" |
| Revelación progresiva de datos (Principio Pasapalabra) | Heatmap + datos acumulados | Datos que se desbloquean con uso |
| Habit stacking como subida de nivel | Framework agéntico + hábitos múltiples | Progresión orgánica |
| UX adaptativa / modo lite | UI MVP madura | Reducir fricción para usuarios ligeros |
| Testing automatizado de accesibilidad (axe-core) | UI MVP | Camino hacia WCAG AA |

**Phase 3 — Expansion:**

| Feature | Dependencia | Valor |
|---------|------------|-------|
| Hábitos colaborativos (círculo cercano) | Auth + social features | Presión social gestionada con empatía |
| MCP server público | Framework agéntico maduro | Agentes IA externos interactúan con Rachitas |
| BYO-AI (traer tu propia API key) | Framework agéntico estable | Libertad de proveedor, coste cero IA |
| Widget nativo (Capacitor/TWA) | PWA madura | Registro sin abrir la app |
| IA on-device | Madurez de modelos edge | Detección de patrones sin coste de tokens |
| Integración wearables | APIs de salud | Datos contextuales automáticos |
| Landing page + blog + SEO | Producto validado | Marketing, MPA separada |
| Framework extensible (más allá de Hábitos Atómicos) | Agente maduro | B.J. Fogg, Duhigg, otros marcos |
| Notificaciones push (opt-in, tono positivo) | Investigación UX | Solo si se valida que no es contraproducente |
| Compartir progreso en redes | Heatmap + gamificación | Crecimiento orgánico |
| Contenido patrocinado por marcas saludables/deportivas | Comunidad establecida | Rewards contextuales |

### Risk Mitigation Strategy

**Riesgos Técnicos:**

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Complejidad del framework agéntico subestimada | Alta | Alto | Empezar con interacciones agente-datos mínimas (crear hábito, leer hábitos). Iterar. Documentar aprendizajes para portfolio. |
| Sincronización Dexie.js ↔ Supabase con conflictos | Media | Alto | Supabase como fuente de verdad siempre. Dexie.js es cache de lectura + cola de escritura offline. Conflictos: last-write-wins en MVP. |
| Calidad del modelo IA open source insuficiente | Media | Existencial | Evaluar modelos antes de comprometerse. Si open source no alcanza calidad mínima, usar modelo premium con rate limiting para controlar costes. La primera conversación no puede fallar. |
| IndexedDB (Dexie.js) con pérdida de datos en iOS | Media | Medio | Dexie.js es cache, no fuente de verdad. Sync frecuente con Supabase. Pérdida de cache = re-sync, no pérdida de datos. |

**Riesgos de Producto y Mercado:**

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| La conversación como onboarding es demasiado lenta para algunos usuarios | Media | Alto | Ofrecer flujo guiado alternativo (preguntas cortas, no conversación abierta). Onboarding que demuestre el valor en los primeros 2 minutos. |
| IA gratuita (open source) no alcanza calidad suficiente para primera impresión | Media | Existencial | Invertir en prompt engineering. Evaluar coste de usar modelo premium para onboarding y modelo económico para uso continuado |
| BYO-AI es demasiado técnico para el usuario promedio | Alta | Medio | UX extremadamente guiada para configurar API key. La IA gratuita es el default — BYO-AI es opt-in para power users |
| Competidor lanza algo similar en español | Baja (corto) | Alto (largo) | Ventaja de timing + datos acumulados + relación con agente como switching cost emocional |

**Riesgos de Recurso:**

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Un solo desarrollador = cuello de botella | Alta | Medio | Desarrollo asistido por IA (Claude Code, Cursor). Arquitectura modular para avanzar feature por feature. Sin deadlines — el ritmo lo marca el aprendizaje. |
| Costes operativos mayores de lo esperado | Baja | Medio | Supabase free tier para inicio. Monitoreo de tokens IA desde día 1. Target <$30/mes en fase inicial. |
| Burnout por proyecto ambicioso en solitario | Media | Alto | Sin deadlines. Priorizar aprendizaje sobre velocidad. El proyecto es un maratón, no un sprint. |

## User Journeys

### Journey 1: Marta — "Quiero retomar el control" (Primary User - Success Path)

**Persona:** Marta, 32 años, trabaja en oficina en Madrid. Tiene sobrepeso y lo sabe. Leyó Hábitos Atómicos hace meses — le encantó, subrayó medio libro, pero no ha implementado nada. Probó Habitica (infantil), Loop Habits (frío), y una app de dieta que la hacía sentir culpable. Abandonó todas en menos de un mes.

**Opening Scene:** Martes por la noche. Marta está en Instagram y ve un post de alguien que comparte su racha de lectura con una estética que le llama la atención. Hace clic, llega a la web de Rachitas. Se registra con su email — la verificación se completa en background mientras ella ya empieza a hablar con el Pepito Grillo. Ve "Cuéntame, ¿qué quieres cambiar?" y algo le hace quedarse. El flujo de registro existe pero no interrumpe la primera conversación.

**Rising Action:** Empieza a hablar con el Pepito Grillo. No le pide rellenar nada — le pregunta qué le frustra, qué ha intentado antes, por qué cree que falló. Marta escribe más de lo que esperaba. El agente le dice: "Parece que las apps anteriores te castigaban cuando fallabas. Aquí eso no va a pasar." Juntos diseñan un hábito pequeño: caminar 10 minutos después de comer. Señal: terminar de comer. Rutina: ponerse las zapatillas. Recompensa: un café en el parque. Marta mira la pestaña de resumen y ve todo estructurado — sin haber rellenado un solo formulario.

**Climax:** Día 8. Marta abre la app y ve su heatmap con 7 cuadraditos verdes seguidos. Es la primera vez en su vida que mantiene un hábito una semana entera. El Pepito Grillo le dice: "7 días. Tu primera cumbre. ¿Recuerdas lo que me contaste el primer día? Mira dónde estás ahora." Se le humedecen los ojos.

**Resolution:** Mes 3. Marta camina todos los días. Ha añadido lectura 3 veces por semana. El heatmap es una alfombra de verdes. No abre la app todos los días — a veces solo toca el botón del widget. Pero cuando necesita reflexionar, el Pepito Grillo está ahí. Rachitas no es una app que usa — es un lugar al que va.

**Requirements revelados:** Registro de usuario (email/social), onboarding conversacional, diseño de hábito guiado, heatmap con gradientes, sistema de cumbres (post-MVP), widget de registro rápido (post-MVP), resumen auto-generado desde conversación.

---

### Journey 2: Diego — "Necesito dejar de procrastinar" (Primary User - Gamificación)

**Persona:** Diego, 21 años, estudiante universitario en Bogotá. Gamer casual. Pasa demasiado tiempo en el móvil. No va a pagar una suscripción pero sí compraría un pase de temporada si la estética le mola.

**Opening Scene:** Diego ve un video de YouTube de un influencer de productividad que menciona Rachitas. Le parece interesante que sea gratis. Abre la web desde Chrome en Android.

**Rising Action:** El Pepito Grillo le pregunta qué quiere cambiar. Diego escribe: "estudiar más y dejar el móvil." El agente no le dice "deberías estudiar 4 horas diarias" — le pregunta cuánto estudia ahora (nada), y le propone empezar con 15 minutos después de desayunar. Modo Normal. Diego piensa "esto es demasiado fácil" pero el agente le explica: "Lo fácil se mantiene. Lo difícil se abandona." Diego configura su segundo hábito en modo Hardcore: no usar redes sociales antes de las 12:00.

**Climax:** Semana 2. Diego tiene 12 cuadraditos en estudio y 10 en redes. El Hardcore le ha costado — falló dos veces y volvió a cero. Pero el modo Normal acumula sin drama. Entiende la diferencia. Comparte su heatmap en Instagram Stories.

**Resolution:** Diego instala la PWA en su homescreen. El registro diario es un tap. Los fines de semana habla con el Pepito Grillo sobre cómo le fue la semana. El agente le nota: "Los lunes son tu día débil. ¿Quieres ajustar algo?" Diego aprende sobre sí mismo a través de los datos.

**Requirements revelados:** Modos de dificultad (Normal/Difícil/Hardcore), frecuencia configurable, flujo de instalación PWA optimizado, registro de un tap, detección de patrones (post-MVP).

---

### Journey 3: Roberto — "Esta vez va en serio" (Primary User - Edge Case: Hábito extremo)

**Persona:** Roberto, 45 años, técnico en CDMX. Lleva 20 años fumando. Ha intentado dejarlo tres veces. Su hija le pidió que dejara de fumar.

**Opening Scene:** Roberto busca en Google "dejar de fumar app español". Encuentra Rachitas. No espera nada — las apps anteriores solo mostraban un contador que se reseteaba a cero con cada recaída.

**Rising Action:** El Pepito Grillo le pregunta sobre su hábito. Roberto escribe: "Quiero dejar de fumar. He intentado 3 veces." El agente no le dice "¡Tú puedes!" — le pregunta qué pasó las veces anteriores, qué disparó las recaídas, quién le apoya. Roberto menciona a su hija. El agente diseña el hábito con él: señal (ganas de fumar), rutina alternativa (3 respiraciones profundas + beber agua), recompensa (anotar cómo se siente después). Modo Difícil — porque una recaída no debería borrar 47 días de esfuerzo.

**Climax — el edge case:** Día 52. Roberto fuma un cigarrillo en una cena con amigos. Abre la app esperando ver todo en cero. Pero no. Modo Difícil: pierde puntos, pero su racha de 52 días sigue ahí, con una marca. El Pepito Grillo le dice: "¿Qué ha pasado? No pasa nada — 52 días no desaparecen por una noche. ¿Ajustamos algo para las cenas?" Roberto llora. Por primera vez, algo no le castiga por fallar.

**Resolution:** Día 365. El agente le dice: "Recuerda lo que sentías el día 1. Mira dónde estás ahora. Tu hija estaría orgullosa." Roberto nunca va a cambiar de app. Tiene un año de historia con algo que le conoce.

**Requirements revelados:** Modo Difícil (resta sin resetear), tono empático en recaídas, notas contextuales al registrar, personalidad del agente nunca punitiva, memoria del agente sobre historial del usuario.

---

### Journey 4: Roberto — Hábito poco realista (Edge Case: Advertencia del agente)

**Opening Scene:** Roberto, motivado por su éxito con el cigarrillo, decide crear un nuevo hábito: "Correr 10km diarios." Nunca ha corrido.

**Rising Action:** El Pepito Grillo detecta la señal: frecuencia diaria + intensidad alta + sin historial previo. En vez de aceptar silenciosamente, el agente responde: "10km diarios es un objetivo ambicioso, especialmente si es tu primera vez corriendo. Los datos muestran que empezar demasiado fuerte es la causa #1 de abandono. ¿Qué te parece si empezamos con 2km tres veces por semana y subimos desde ahí?" Le sugiere categorizarlo como Difícil si quiere mantener los 10km, para que los días que no llegue no borren su progreso.

**Resolution:** Roberto acepta 2km, 3 días/semana, modo Normal. Dos meses después, corre 5km. El agente le propone subir. La progresión es orgánica, no impuesta.

**Requirements revelados:** Lógica de detección de hábitos poco realistas en el agente, sugerencia de dificultad según contexto, progresión adaptativa con opt-in.

---

### Journey 5: Usuario que quiere borrar su cuenta (Edge Case: Eliminación de datos)

**Persona:** Cualquier usuario que decide irse.

**Opening Scene:** El usuario va a su perfil. Ve la sección de datos personales.

**Rising Action:** Pulsa "Eliminar mi cuenta y datos". Aparece una advertencia clara: "Esto eliminará permanentemente todos tus datos: hábitos, registros, conversaciones con el agente, y tu cuenta. Esta acción no se puede deshacer. ¿Estás seguro?" Con un botón de confirmar que requiere escribir "ELIMINAR" para evitar borrados accidentales.

**Resolution:** Los datos se eliminan de Supabase y de Dexie.js local. La cuenta deja de existir. Sin drama, sin intentos de retención agresivos. Cumplimiento GDPR completo. Un simple "Gracias por haber estado aquí. Tus datos han sido eliminados."

**Requirements revelados:** Sección de datos en perfil, flujo de eliminación con confirmación explícita, borrado completo de Supabase + Dexie.js, mensaje de despedida sin retención agresiva, cumplimiento GDPR (derecho al olvido).

---

### Journey 6: Manuel — Administrador (Secondary User)

**Persona:** Manuel, desarrollador y administrador de Rachitas.

**Opening Scene:** Manuel abre el panel de administración después de la primera semana con usuarios reales.

**Rising Action:** En el panel ve: usuarios activos (MAU), retención por cohorte (D7, D30), tasa de completación del onboarding IA, uso del agente por usuario, costes de IA acumulados (tokens consumidos por el modelo self-hosted), y errores de la app. Nota que un usuario ha enviado 200 mensajes al agente en una hora — posible abuso. Revisa el patrón y decide banearlo.

**Climax:** Manuel detecta que la tasa de completación del onboarding está en 45% — por debajo del target de 60%. Revisa las conversaciones abandonadas (datos anonimizados) y descubre que los usuarios se pierden en el paso de definir la recompensa. Ajusta el prompt del agente para ser más guiado en ese paso.

**Resolution:** Panel como herramienta de decisiones. No un dashboard de vanity metrics — una herramienta para entender qué funciona, qué no, y actuar. Incluye: métricas clave, gestión de usuarios (baneo), monitoreo de costes de IA, y logs de errores.

**Requirements revelados:** Panel de administración con métricas (MAU, retención, onboarding, uso agente), gestión de usuarios (ver, banear), monitoreo de costes de IA, logs de errores, datos anonimizados para análisis. **Necesario desde MVP.**

---

### Journey 7: Usuario que vuelve tras ausencia (Edge Case: Reencuentro)

**Persona:** Cualquier usuario que dejó de usar la app por semanas.

**Opening Scene:** El usuario abre Rachitas después de 3 semanas sin entrar. Espera culpa, contadores en rojo, notificaciones acumuladas.

**Rising Action:** En su lugar, una animación suave de amanecer. El Pepito Grillo le saluda: "Bienvenido de vuelta. Tu progreso anterior sigue aquí." Sin drama, sin "llevas 21 días sin registrar". El heatmap muestra los huecos como espacio vacío — no como fracaso marcado en rojo. Sus rachas anteriores siguen visibles como logros reales.

**Resolution:** El usuario retoma donde lo dejó, o decide reconfigurar. El agente le pregunta: "¿Quieres seguir con los mismos hábitos o ajustamos algo?" La app espera, no castiga.

**Requirements revelados:** Animación de bienvenida tras ausencia, tono del agente sin culpa, heatmap que no marca ausencias como fracaso, rachas anteriores preservadas como logros.

---

### Journey Requirements Summary

| Capability | Journeys que la revelan | Prioridad MVP |
|-----------|------------------------|---------------|
| Onboarding conversacional con agente IA | Marta, Diego, Roberto | Sí |
| Diseño de hábito guiado (señal/rutina/recompensa) | Marta, Diego, Roberto | Sí |
| Heatmap con gradientes de intensidad | Marta, Diego | Sí |
| Modos de dificultad (Normal/Difícil/Hardcore) | Diego, Roberto | Sí |
| Frecuencia configurable | Diego | Sí |
| Registro de un tap | Diego, Marta | Sí |
| Tono empático en recaídas / nunca punitivo | Roberto | Sí (prompt engineering) |
| Detección de hábitos poco realistas | Roberto (edge case) | Sí (prompt engineering) |
| Resumen auto-generado desde conversación | Marta | Sí |
| Flujo de eliminación de cuenta + datos | Eliminación | Sí (GDPR) |
| Panel de administración (métricas, baneo, costes) | Manuel | Sí |
| Flujo instalación PWA optimizado | Diego | Sí |
| Notas contextuales al registrar | Roberto | Sí |
| Bienvenida tras ausencia (sin culpa) | Reencuentro | Sí |
| Sistema de cumbres | Marta | Post-MVP |
| Widget nativo de homescreen | Marta, Diego | Post-MVP |
| Detección de patrones | Diego | Post-MVP |
| Memoria del agente sobre historial completo | Roberto | Post-MVP (básico en MVP) |

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. Conversación como interfaz de configuración**
El patrón dominante en apps de hábitos es: formulario → configurar → usar. Rachitas invierte esto: conversación → la app se configura sola → usar. El usuario nunca rellena un formulario. La reflexión guiada con el agente IA genera los datos estructurados (hábitos, señales, rutinas, recompensas, objetivos) como efecto secundario de una conversación empática. Esto no existe en ninguna app del mercado.

**2. Anti-patrones como principios de diseño**
La industria de apps de hábitos se construye sobre castigo, streak anxiety y progresión forzada — patrones que generan engagement a corto plazo pero destruyen retención a largo plazo (67% abandono en semana 4 para apps gamificadas). Rachitas codifica los anti-patrones como reglas sagradas del producto: nunca castigar ausencia, nunca forzar progresión, nunca tono punitivo. Esto es un posicionamiento radical contra toda la industria.

**3. BYO-AI como modelo de distribución de coste**
En vez de absorber el coste de IA y cobrarlo vía suscripción, Rachitas permite al usuario traer su propia API key. Esto elimina el intermediario, reduce el coste operativo del desarrollador a prácticamente cero en IA, y da libertad de proveedor al usuario. Es un modelo que no existe en apps de hábitos — importado conceptualmente del mundo developer (trae tu propia nube/API).

**4. Framework de comportamiento extensible**
Las apps que usan un framework (Atoms con James Clear) se atan a un autor/marca. Rachitas usa Hábitos Atómicos como punto de entrada pero arquitecta el agente para ser extensible a otros marcos de psicología del comportamiento (B.J. Fogg, Duhigg, etc.). La IA no está hardcodeada a un libro — es un framework que puede evolucionar.

### Market Context & Competitive Landscape

Confirmado por las 3 investigaciones:
- **Atoms** tiene el brand de James Clear pero sin IA conversacional, sin español, y a $7-17/mes
- **Habit Coach AI** tiene IA genérica sin framework específico
- **Habitica** tiene gamificación pero contraproducente a largo plazo (67% abandono semana 4)
- **Loop Habits** es gratuito y open source pero estancado, sin IA, sin acompañamiento
- **Nadie** ocupa el cuadrante: IA profunda + framework específico + español nativo + core gratuito

### Validation Approach

| Innovación | Cómo validar | Métrica de éxito |
|-----------|-------------|-----------------|
| Conversación como configuración | Tasa de completación del onboarding IA | >60% completan el flujo y salen con hábito configurado |
| Anti-patrones (sin castigo) | Tasa de resurrección post-pausa | >30% de inactivos vuelven en 30 días |
| BYO-AI | % de usuarios que configuran su propia API key | Dato exploratorio — sin target inicial |
| Framework extensible | Validación técnica en arquitectura | Service layer acepta múltiples frameworks sin reescritura |

## Requisitos Específicos de Web App

### Visión General del Tipo de Proyecto

Rachitas es una **Single Page Application (SPA)** construida como PWA instalable. El MVP se centra exclusivamente en la experiencia de aplicación — sin landing page, blog ni contenido público. La estrategia de marketing web (MPA con SEO, documentación, tutoriales) se abordará como proyecto separado post-MVP.

### Matriz de Navegadores

| Navegador | Prioridad | Versión Mínima | Notas |
|-----------|-----------|----------------|-------|
| Chrome (Desktop/Android) | **Principal** | Últimas 2 versiones | Target primario, base Chromium |
| Edge | **Principal** | Últimas 2 versiones | Base Chromium, soporte nativo |
| Safari (iOS/macOS) | Secundario | iOS 16.4+ / Safari 16.4+ | Soporte PWA mejorado desde 16.4 |
| Firefox | Secundario | Últimas 2 versiones | Soporte completo PWA limitado |
| Samsung Internet | Secundario | Últimas 2 versiones | Base Chromium, relevante en Android |

**Decisiones clave:**
- Optimización primaria para motores Chromium (Chrome, Edge, Samsung Internet)
- Safari como secundario pero importante: iOS es el segundo mercado móvil, PWA support desde 16.4
- No se soportan: IE11, navegadores legacy, UC Browser
- Testing obligatorio en Chrome y Safari; testing periódico en Firefox y Edge

### Diseño Responsive

| Breakpoint | Rango | Prioridad | Uso Principal |
|------------|-------|-----------|---------------|
| Mobile | 320px - 639px | **Principal** | Uso diario de hábitos, conversación con Pepito Grillo |
| Tablet | 640px - 1023px | Secundario | Experiencia expandida |
| Desktop | 1024px+ | Secundario | Panel admin, configuración detallada |

**Estrategia mobile-first:**
- La interfaz conversacional con Pepito Grillo se diseña primero para móvil
- El panel de administración puede priorizar desktop sin comprometer la experiencia móvil
- Tailwind CSS v4 con breakpoints estándar (`sm`, `md`, `lg`, `xl`)
- shadcn/ui proporciona componentes responsive por defecto

### Objetivos de Rendimiento

| Métrica | Objetivo MVP | Objetivo Growth | Herramienta de Medición |
|---------|-------------|-----------------|------------------------|
| LCP (Largest Contentful Paint) | < 2.5s | < 1.5s | Lighthouse |
| FID (First Input Delay) | < 100ms | < 50ms | Lighthouse |
| CLS (Cumulative Layout Shift) | < 0.1 | < 0.05 | Lighthouse |
| TTI (Time to Interactive) | < 3.5s | < 2.0s | Lighthouse |
| Bundle Size (inicial) | < 200KB gzip | < 150KB gzip | Vite bundle analyzer |
| Lighthouse Performance Score | > 80 | > 90 | Lighthouse |
| Tiempo offline-to-online sync | < 5s | < 2s | Custom metrics |

**Estrategia de rendimiento:**
- Code splitting por rutas con React.lazy()
- Precarga de Service Worker para assets críticos (Workbox)
- Caché local con Dexie.js para respuesta instantánea de UI
- Sincronización con Supabase en background, no bloqueante
- Lazy loading de componentes pesados (editor de hábitos, historial)

### Estrategia SEO

**MVP: Sin SEO** — Toda la aplicación está detrás de autenticación. No hay contenido público indexable.

**Post-MVP (proyecto separado):**
- Landing page de marketing (posiblemente MPA con Astro o similar)
- Blog con contenido sobre hábitos y desarrollo personal
- Documentación y tutoriales
- Se evaluará SSR/SSG para el contenido público cuando se aborde

**Para el MVP solo se necesita:**
- Meta tags básicos (título, descripción, favicon)
- `robots.txt` con `Disallow: /` para la app
- Open Graph tags mínimos para compartir enlaces

### Nivel de Accesibilidad

**MVP: WCAG 2.1 Nivel A** con fundamentos para escalar a AA.

| Requisito Nivel A | Implementación |
|-------------------|----------------|
| Texto alternativo en imágenes | Alt text en todos los elementos visuales |
| Navegación por teclado | Focus visible, tab order lógico |
| Contraste mínimo (3:1) | Validación con herramientas de contraste |
| Etiquetas en formularios | Labels asociados, aria-label donde necesario |
| Estructura semántica | HTML5 semántico (header, main, nav, section) |
| Contenido no depende solo de color | Iconos + texto, no solo color para estados |

**Preparación para AA (Growth):**
- shadcn/ui ya incluye muchas prácticas AA por defecto (roles ARIA, focus management)
- Contraste mejorado (4.5:1) se puede implementar con variables CSS de Tailwind
- El diseño conversacional de Pepito Grillo es inherentemente accesible (texto como medio primario)
- Se añadirá testing automatizado de accesibilidad (axe-core) en fase Growth

### Consideraciones de Implementación

**Tiempo real y streaming:**
- Streaming de respuestas IA (token por token) como mejora post-MVP — la arquitectura lo soportará desde el inicio con `ReadableStream` / Server-Sent Events
- Sincronización multi-dispositivo vía Supabase Realtime (suscripciones a cambios en tablas)
- Notificaciones push: se descarta para MVP por riesgo de ser contraproducente con la filosofía anti-castigo. Se investigará en Growth con enfoque opt-in y tono positivo

**PWA específico:**
- Manifest.json con `display: standalone` para experiencia app-like
- Service Worker con estrategia cache-first para assets, network-first para datos
- Splash screen y iconos para instalación en homescreen
- Offline: la app funciona con datos cacheados en Dexie.js, sincroniza al reconectar

## Functional Requirements

### Gestión de Identidad y Cuenta

- FR1: El usuario puede registrarse con email y contraseña
- FR2: El usuario puede registrarse con login social (Google, GitHub)
- FR3: El usuario puede iniciar sesión desde cualquier dispositivo y acceder a sus datos sincronizados
- FR4: El usuario puede cerrar sesión
- FR5: El usuario puede ver sus datos personales en su perfil
- FR6: El usuario puede eliminar su cuenta y todos sus datos de forma permanente, con confirmación explícita
- FR7: El sistema elimina todos los datos del usuario del servidor y del almacenamiento local al confirmar la eliminación

### Agente IA Conversacional (Pepito Grillo)

- FR8: El usuario puede iniciar una conversación con el agente IA desde la pantalla principal
- FR9: El agente guía al usuario en un onboarding conversacional para diseñar su primer hábito
- FR10: El agente estructura automáticamente los datos del hábito (señal, rutina, recompensa) a partir de la conversación, sin formularios
- FR11: El agente interactúa con los datos de la aplicación (hábitos, registros, objetivos) mediante un framework agéntico con herramientas definidas como contratos
- FR12: El agente puede crear, modificar y consultar hábitos del usuario como resultado de la conversación
- FR13: El agente nunca usa frases imperativas negativas ("deberías", "tienes que"), nunca menciona días perdidos como fracaso, y siempre ofrece una alternativa antes de señalar un fallo. Criterios validados por revisión de prompts y pruebas con usuarios de muestra
- FR14: El agente advierte cuando el usuario configura un hábito con frecuencia diaria, intensidad alta y sin historial previo en la categoría (ej. correr 10km/día sin historial de running), y sugiere alternativas progresivas
- FR15: El agente da la bienvenida al usuario que vuelve tras una ausencia sin mencionar días sin uso, sin contadores de ausencia visibles, y con tono positivo orientado al futuro
- FR16: El usuario puede invocar al agente bajo demanda en cualquier momento (botón "Inspírame" o similar)
- FR17: El agente utiliza el framework de Hábitos Atómicos como base para guiar la reflexión

### Gestión de Hábitos

- FR18: El usuario puede crear un hábito nuevo (con o sin asistencia del agente)
- FR19: El usuario puede editar los datos de un hábito existente
- FR20: El usuario puede eliminar un hábito
- FR21: El usuario puede configurar la frecuencia de un hábito (diario, semanal X de 7, mensual, personalizada)
- FR22: El usuario puede asignar un modo de dificultad a un hábito: Normal (acumulativo) o Difícil (resta sin resetear)
- FR23: El usuario puede cambiar el modo de dificultad de un hábito en cualquier momento sin penalización
- FR24: El usuario puede ver un resumen de sus hábitos activos con su estado actual

### Registro y Seguimiento

- FR25: El usuario puede registrar el cumplimiento de un hábito de forma binaria (sí/no)
- FR26: El usuario puede registrar el cumplimiento de un hábito con valor cuantificable
- FR27: El usuario puede añadir una nota opcional al registrar un hábito
- FR28: El usuario puede registrar un hábito con un solo tap desde la vista principal
- FR29: El sistema calcula y muestra la racha actual adaptada a la frecuencia configurada del hábito
- FR30: El sistema aplica la lógica del modo de dificultad seleccionado al calcular rachas (Normal: acumulativo; Difícil: resta sin resetear)
- FR31: El usuario puede ver un heatmap estilo GitHub con gradientes de intensidad para cada hábito
- FR32: El sistema muestra las ausencias como espacio vacío en el heatmap, no como fracaso marcado

### Datos Offline y Sincronización

- FR33: El usuario puede registrar hábitos sin conexión a internet
- FR34: El sistema sincroniza automáticamente los datos locales con el servidor al recuperar conexión
- FR35: El sistema mantiene el servidor como fuente de verdad para resolver conflictos de sincronización
- FR36: El usuario puede acceder a sus datos desde múltiples dispositivos con sincronización automática

### PWA e Instalación

- FR37: El usuario puede instalar la aplicación en la pantalla de inicio de su dispositivo
- FR38: La aplicación se ejecuta en pantalla completa (display: standalone), muestra splash screen al iniciar, y tiene iconos en la pantalla de inicio del dispositivo
- FR39: La aplicación carga y es funcional para registro de hábitos cuando no hay conexión

### Administración

- FR40: El administrador puede acceder a métricas básicas de uso a través del panel de administración del backend
- FR41: El administrador puede gestionar usuarios (visualizar, banear) a través del panel de administración del backend

## Non-Functional Requirements

### Performance

- NFR1: Las acciones de registro de hábitos (tap) se reflejan en la UI en menos de 100ms, independientemente del estado de conexión
- NFR2: La pantalla principal con hábitos activos carga en menos de 2 segundos en primera visita, menos de 1 segundo en visitas posteriores (cache)
- NFR3: El heatmap renderiza datos de hasta 12 meses sin degradación perceptible de rendimiento
- NFR4: Las respuestas del agente IA comienzan a llegar en menos de 5 segundos (tiempo hasta primer token cuando se implemente streaming)
- NFR5: La sincronización offline-to-online se ejecuta en background y no incrementa la latencia de interacción de la UI en más de 50ms

### Security

- NFR6: Todos los datos se transmiten cifrados (HTTPS/TLS en tránsito)
- NFR7: Los datos en el servidor están cifrados en reposo (cifrado nativo de la base de datos)
- NFR8: Las API keys de IA del usuario (BYO-AI, post-MVP) nunca se almacenan en el servidor — solo en el dispositivo del usuario
- NFR9: Las sesiones de autenticación expiran tras inactividad prolongada (configurable, default 30 días)
- NFR10: El backend implementa aislamiento de datos a nivel de fila (Row Level Security) que garantiza que un usuario solo accede a sus propios datos
- NFR11: El flujo de eliminación de cuenta borra irreversiblemente todos los datos del usuario en menos de 24 horas (cumplimiento GDPR derecho al olvido)
- NFR12: Las conversaciones con el agente IA se tratan como datos personales sensibles — misma protección que el resto de datos del usuario
- NFR13: No se comparten datos de usuario con terceros. Los prompts enviados al modelo IA no incluyen datos identificables de otros usuarios

### Scalability

- NFR14: La arquitectura soporta hasta 1,000 usuarios activos mensuales sin cambios de infraestructura ni de tier de servicio
- NFR15: El modelo de datos y la service layer permiten migrar de un proveedor de IA a otro sin reescribir lógica de negocio
- NFR16: El almacenamiento local mantiene tiempos de consulta inferiores a 200ms con hasta 2 años de datos de hábitos por usuario

### Accessibility

- NFR17: La aplicación cumple WCAG 2.1 Nivel A en todas las vistas del MVP
- NFR18: Toda la interfaz es navegable por teclado con focus visible
- NFR19: Todo elemento visual informativo tiene texto alternativo o equivalente textual
- NFR20: El contraste mínimo de texto es 3:1 (Nivel A), con preparación para 4.5:1 (Nivel AA) en Growth
- NFR21: La interfaz conversacional usa texto como medio primario de interacción, sin dependencia de elementos exclusivamente visuales para transmitir información

### Integration

- NFR22: El framework agéntico abstrae la comunicación con modelos IA detrás de una interfaz uniforme, permitiendo cambiar de proveedor de LLM sin modificar lógica de negocio
- NFR23: La integración con el modelo IA gestiona errores de red, timeouts y respuestas malformadas sin crashear la aplicación — el usuario recibe un mensaje de error visible en menos de 2 segundos con descripción del problema si el agente no puede responder
- NFR24: Las herramientas del framework agéntico (crear hábito, consultar registros, etc.) están definidas como contratos explícitos con validación de entrada y salida
- NFR25: La latencia añadida por el framework agéntico (procesamiento de tool calls) no supera los 500ms sobre el tiempo de respuesta del modelo IA
- NFR26: El sistema de autenticación soporta al menos 2 proveedores de identidad (email + 1 social) con flujo unificado
- NFR27: La sincronización almacenamiento local ↔ servidor implementa cola de reintentos para operaciones fallidas, con máximo 3 reintentos y backoff exponencial
- NFR28: El sistema de integración con IA registra métricas de uso (tokens consumidos, latencia, errores) accesibles desde el panel de administración del backend para monitoreo de costes
- NFR29: Si el servicio de IA externo no está disponible, la app sigue siendo funcional para crear hábitos, registrar cumplimiento y consultar el heatmap — la IA es una mejora, no una dependencia bloqueante
- NFR30: Las herramientas del framework agéntico se pueden añadir o modificar sin necesidad de redesplegar la aplicación completa (configuración de herramientas separada de lógica core)
