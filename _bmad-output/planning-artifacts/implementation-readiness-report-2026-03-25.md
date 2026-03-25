


Aquí tienes la auditoría de preparación para implementación ("Implementation Readiness Check") basada en los documentos proporcionados para el proyecto "Primer" (Rachitas). 

---

# Auditoría de Preparación para Implementación (Implementation Readiness Check)

## 1. Análisis del PRD

### Requisitos Funcionales (FRs) Extraídos
1. **FR1:** El usuario puede registrarse con email y contraseña.
2. **FR2:** El usuario puede registrarse con login social (Google, GitHub).
3. **FR3:** El usuario puede iniciar sesión desde cualquier dispositivo y acceder a sus datos sincronizados.
4. **FR4:** El usuario puede cerrar sesión.
5. **FR5:** El usuario puede ver sus datos personales en su perfil.
6. **FR6:** El usuario puede eliminar su cuenta y todos sus datos de forma permanente, con confirmación explícita.
7. **FR7:** El sistema elimina todos los datos del usuario del servidor y del almacenamiento local al confirmar la eliminación.
8. **FR8:** El usuario puede iniciar una conversación con el agente IA desde la pantalla principal.
9. **FR9:** El agente guía al usuario en un onboarding conversacional para diseñar su primer hábito.
10. **FR10:** El agente estructura automáticamente los datos del hábito (señal, rutina, recompensa) a partir de la conversación, sin formularios.
11. **FR11:** El agente interactúa con los datos de la aplicación (hábitos, registros, objetivos) mediante un framework agéntico con herramientas definidas como contratos.
12. **FR12:** El agente puede crear, modificar y consultar hábitos del usuario como resultado de la conversación.
13. **FR13:** El agente nunca usa frases imperativas negativas ("deberías", "tienes que"), nunca menciona días perdidos como fracaso, y siempre ofrece una alternativa antes de señalar un fallo.
14. **FR14:** El agente advierte cuando el usuario configura un hábito con frecuencia diaria, intensidad alta y sin historial previo, y sugiere alternativas progresivas.
15. **FR15:** El agente da la bienvenida al usuario que vuelve tras una ausencia sin mencionar días sin uso, sin contadores de ausencia visibles, y con tono positivo orientado al futuro.
16. **FR16:** El usuario puede invocar al agente bajo demanda en cualquier momento (botón "Inspírame" o similar).
17. **FR17:** El agente utiliza el framework de Hábitos Atómicos como base para guiar la reflexión.
18. **FR18:** El usuario puede crear un hábito nuevo (con o sin asistencia del agente).
19. **FR19:** El usuario puede editar los datos de un hábito existente.
20. **FR20:** El usuario puede eliminar un hábito.
21. **FR21:** El usuario puede configurar la frecuencia de un hábito (diario, semanal X de 7, mensual, personalizada).
22. **FR22:** El usuario puede asignar un modo de dificultad a un hábito: Normal (acumulativo) o Difícil (resta sin resetear).
23. **FR23:** El usuario puede cambiar el modo de dificultad de un hábito en cualquier momento sin penalización.
24. **FR24:** El usuario puede ver un resumen de sus hábitos activos con su estado actual.
25. **FR25:** El usuario puede registrar el cumplimiento de un hábito de forma binaria (sí/no).
26. **FR26:** El usuario puede registrar el cumplimiento de un hábito con valor cuantificable.
27. **FR27:** El usuario puede añadir una nota opcional al registrar un hábito.
28. **FR28:** El usuario puede registrar un hábito con un solo tap desde la vista principal.
29. **FR29:** El sistema calcula y muestra la racha actual adaptada a la frecuencia configurada del hábito.
30. **FR30:** El sistema aplica la lógica del modo de dificultad seleccionado al calcular rachas (Normal: acumulativo; Difícil: resta sin resetear).
31. **FR31:** El usuario puede ver un heatmap estilo GitHub con gradientes de intensidad para cada hábito.
32. **FR32:** El sistema muestra las ausencias como espacio vacío en el heatmap, no como fracaso marcado.
33. **FR33:** El usuario puede registrar hábitos sin conexión a internet.
34. **FR34:** El sistema sincroniza automáticamente los datos locales con el servidor al recuperar conexión.
35. **FR35:** El sistema mantiene el servidor como fuente de verdad para resolver conflictos de sincronización.
36. **FR36:** El usuario puede acceder a sus datos desde múltiples dispositivos con sincronización automática.
37. **FR37:** El usuario puede instalar la aplicación en la pantalla de inicio de su dispositivo.
38. **FR38:** La aplicación se ejecuta en pantalla completa (display: standalone), muestra splash screen al iniciar, y tiene iconos en la pantalla de inicio del dispositivo.
39. **FR39:** La aplicación carga y es funcional para registro de hábitos cuando no hay conexión.
40. **FR40:** El administrador puede acceder a métricas básicas de uso a través del panel de administración del backend.
41. **FR41:** El administrador puede gestionar usuarios (visualizar, banear) a través del panel de administración del backend.

### Requisitos No Funcionales (NFRs) Extraídos
1. **NFR1-NFR5 (Rendimiento):** UI responde en <100ms; Dashboard carga en <2s (primera vez) / <1s (caché); Heatmap 12 meses sin degradación; IA primer token <5s; Sync en background añade <50ms de latencia.
2. **NFR6-NFR13 (Seguridad):** HTTPS/TLS; Cifrado en reposo DB; API keys IA nunca en servidor; Sesiones expiran a 30 días; Row Level Security (RLS); Borrado GDPR <24h; PII protegido en conversaciones; Prompts sin leak de datos.
3. **NFR14-NFR16 (Escalabilidad):** Soporta 1,000 MAU sin cambiar infra; Cambio de proveedor IA sin reescribir lógica; Consultas locales <200ms con 2 años de datos.
4. **NFR17-NFR21 (Accesibilidad):** WCAG 2.1 A; Navegación por teclado; Alt text; Contraste mínimo 3:1; Interfaz conversacional puramente textual.
5. **NFR22-NFR30 (Integración):** Interfaz uniforme LLM; Tolerancia a fallos de red IA (<2s error); Contratos de tools validados; Latencia de tools <500ms; Mínimo 2 proveedores de auth; Sync con backoff exponencial (max 3 reintentos); Métricas IA en backend; Degradación gracefully sin IA; Tools hot-swappable.

### Evaluación de Completitud del PRD
El PRD es **excepcionalmente completo, maduro y medible**. Los criterios de éxito están cuantificados (retención D7 >20%, respuesta <100ms), las historias de usuario abarcan "Edge Cases", y existe una separación clara entre MVP y Growth. 

---

## 2. Validación de Cobertura de Épicas

| Categoría | Requisitos (FRs) | Épica / Historia | Estado |
| :--- | :--- | :--- | :---: |
| **Identidad** | FR1, FR2, FR3, FR4, FR5, FR6, FR7 | Epic 2 (Stories 2.1, 2.2, 2.3, 2.4) | ✓ Cubierto |
| **Agente IA** | FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17 | Epic 6 (Stories 6.1, 6.3, 6.4, 6.5, 6.6) | ✓ Cubierto |
| **Hábitos** | FR18, FR19, FR20, FR21, FR22, FR23, FR24 | Epic 3 (Stories 3.1, 3.2, 3.3, 3.4) | ✓ Cubierto |
| **Registro** | FR25, FR26, FR27, FR28, FR29, FR30, FR31, FR32 | Epic 4 (Stories 4.1, 4.2, 4.3) | ✓ Cubierto |
| **Offline/Sync**| FR33, FR34, FR35, FR36 | Epic 5 (Stories 5.1, 5.2) | ✓ Cubierto |
| **PWA** | FR37, FR38, FR39 | Epic 1 (Story 1.4) | ✓ Cubierto |
| **Admin** | FR40, FR41 | Epic 7 (Story 7.1) | ✓ Cubierto |

* **FRs No Cubiertos:** 0
* **Porcentaje de Cobertura:** 100%

---

## 3. Alineación UX

### UX ↔ PRD
* **Alineación:** Muy alta. Las reglas sagradas de no castigar al usuario (anti-patrones) se han traducido perfectamente al diseño (días vacíos en color neutro, sin uso de color rojo en toda la app).
* **Desalineación identificada:**
  * **Scope Bleed (Modo Hardcore):** En la especificación UX (Flujo 4) se documenta y diseña el modo "Hardcore". Sin embargo, el PRD establece explícitamente: *"Decidido simplificar para MVP: Modos de dificultad → 2 de 3 (Normal + Difícil, sin Hardcore)"*.
  * **Scope Bleed (Widget Homescreen):** En UX se menciona el Widget Homescreen como un patrón a implementar. El PRD lo pospone claramente a la *Phase 3 — Expansion*.

### UX ↔ Arquitectura
* **Alineación:** Perfecta sincronía técnica. El UX exige validación WCAG AA, que la Arquitectura soporta mediante Radix primitives en shadcn/ui. El "HabitHeatmap" se diseñó considerando el rendimiento, y la Arquitectura especifica un renderizado SVG nativo para soportarlo. 
* **Desalineación identificada:** Ninguna. Las decisiones de estado (Zustand) y caché (Dexie.js) soportan las micro-interacciones (tap <100ms) dictadas por UX de manera excelente.

---

## 4. Revisión de Calidad de Épicas

Se han detectado varias violaciones graves a las metodologías ágiles en el desglose de Épicas y Stories.

### 🔴 CRÍTICA: Historias Técnicas disfrazadas de User Stories
* **Story 1.1: Inicializar Proyecto con Starter Template y Tooling**
  * *Problema:* El usuario es "developer". No entrega NINGÚN valor al usuario final. Configurar Vite y el CI/CD es una tarea técnica preparatoria (Chore), no una historia de usuario.
* **Story 6.2: LLM Adapter y Edge Function Proxy**
  * *Problema:* El usuario es "developer". Esta historia es puramente de infraestructura (Proxy). Debería ser un detalle técnico de implementación o sub-tarea bajo la historia de entregar la primera conversación funcional del chatbot (Story 6.1).

### 🔴 CRÍTICA: Dependencias hacia adelante (Forward Dependencies)
Las Épicas están acopladas visualmente hacia el futuro. Si se despliega la Épica 3, la UI estará rota o incompleta.
* **Story 3.2 (Dashboard):** Indica *"space reserved for heatmap (right ~45%, implemented in Epic 4)"*. 
* **Story 3.3 (Editar Hábito):** Indica *"a compact heatmap placeholder (implemented in Epic 4)"* y *"button 'Hablar con Pepito sobre este hábito' (functional in Epic 6, visible but placeholder now)"*.
  * *Por qué es crítico:* La Épica 3 no es un incremento de producto independiente y "shippable" si está llena de "placeholders" que no hacen nada. La interfaz debe adaptarse. En la Épica 3, la UI no debería tener espacios vacíos; en las Épicas 4 y 6 es donde se *inyectan* esos nuevos componentes al Dashboard.

### 🟡 MENOR: Épicas que no requieren código
* **Epic 7 / Story 7.1: Administración vía Supabase Dashboard**
  * *Problema:* El Acceptance Criteria dicta *"When I access the Supabase Dashboard..."*. Si el plan del MVP es usar el dashboard nativo de Supabase sin programar un panel custom, entonces la Épica 7 requiere **cero esfuerzo de desarrollo de software**. Esto no debería ser una Épica en el backlog de desarrollo, sino un proceso operativo documentado.

### 🟢 POSITIVO: Creación de Entidades "Just-In-Time"
A diferencia de muchos proyectos que tienen una tarea inicial de "Configurar toda la Base de Datos", este backlog hace un excelente trabajo creando el modelo de datos incrementalmente cuando la historia lo requiere:
* `user_profiles` se crea en la Story 2.1.
* `habits` se crea en la Story 3.1.
* `habit_records` se crea en la Story 4.1.
* `sync_queue` en la 5.1 y `conversations/messages` en la 6.1. 

---

## 5. Evaluación Final

**ESTADO GENERAL:** ⚠️ **NECESITA TRABAJO (Solo ajustes de Backlog)**

El proyecto tiene una base documental brillante. La investigación de producto, las decisiones de arquitectura y las especificaciones de diseño son de altísima calidad. Sin embargo, no está estrictamente "Listo" para empezar un sprint porque la partición de historias rompe principios fundamentales de Scrum/Agile, lo que causará fricción en el desarrollo.

### Lista de Issues Críticos (Acción Inmediata Requerida)
1. **Eliminar dependencias UI hacia adelante:** Modificar los criterios de aceptación de la Épica 3 para eliminar cualquier mención a "placeholders". El Dashboard de la Épica 3 debe estar diseñado para verse completo sin el Heatmap ni los botones de IA.
2. **Purgar historias de "Developer":** Eliminar la **Story 1.1** y **Story 6.2** del backlog de Historias de Usuario. Moverlas a un "Sprint 0" (Spikes / Chores de infraestructura) o incluirlas como sub-tareas técnicas dentro de historias de negocio reales.

### Recomendaciones Accionables
* **Ajustar Documento UX:** Extraer "Hardcore Mode" y "Widget Homescreen" hacia una sección explícita de "Diseños Post-MVP" en el documento UX para que no causen confusión durante la implementación del MVP.
* **Refactorizar la Historia 7.1:** En lugar de tratar el acceso a Supabase como una "Feature", documenta en el README del proyecto las consultas SQL necesarias para extraer los KPIs (MAU, retención) estipulados en el PRD.

### Resumen de Hallazgos
Se ha encontrado **100% de cobertura funcional**, con una **alineación de Arquitectura estelar**. Se han levantado **2 issues Críticos** relacionados con metodología Agile (historias técnicas y dependencias hacia adelante) y **1 issue Menor** (inclusión de procesos operativos como Épicas de software). Aplicando estas correcciones al archivo de Épicas, el proyecto pasará inmediatamente a estado "LISTO PARA IMPLEMENTACIÓN".