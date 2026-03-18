---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7]
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/product-brief-primer-bmad-2026-03-09.md"
  - "_bmad-output/planning-artifacts/research/domain-apps-habitos-bienestar-research-2026-03-03.md"
  - "_bmad-output/planning-artifacts/research/market-habit-tracking-ai-research-2026-03-02.md"
---

# UX Design Specification primer-bmad

**Author:** Manuel
**Date:** 2026-03-16

---

## Executive Summary

### Project Vision

Primer es una PWA de desarrollo personal para hispanohablantes que reemplaza el paradigma dominante de apps de hábitos (formulario → tracking → castigo) por uno conversacional (reflexión guiada → la app se configura sola → acompañamiento sin juicio). El Pepito Grillo — un agente IA basado en Hábitos Atómicos — es el corazón del producto, no un feature adicional. La app debe sentirse como un lugar seguro de reflexión personal, no como una herramienta de productividad.

### Target Users

**Segmento prioritario para MVP: Marta (adulta joven, 28-35)**
- Usuaria de apps y redes sociales, no técnica (no sabe qué es una API)
- Ha leído sobre hábitos pero no ha logrado implementarlos
- Decepcionada con apps que la juzgan o la hacen sentir culpable
- Busca guía empática, no métricas frías
- Dispositivo principal: móvil Android, descubre vía búsqueda o redes sociales

**Segmento de crecimiento: Diego (estudiante, 18-24)**
- Gamer casual que entiende mecánicas de progresión y recompensa
- Principal candidato para monetización (cosméticos, pase de temporada)
- Cuanto antes aprenda patrones de hábitos correctos, más impacto a largo plazo
- Llega por contenido de influencers en redes sociales

**Segmento de alto valor emocional: Roberto (adulto, 40-50)**
- Hábitos de alta carga emocional (dejar de fumar, salud)
- Necesita que una recaída no borre el progreso anterior
- El usuario que genera las historias más poderosas de producto

**Nivel técnico compartido:** Usuarios de WhatsApp, Instagram, redes sociales. Cómodos con apps pero no con configuraciones técnicas. El modelo mental de referencia es "chatear con alguien", no "configurar una herramienta".

**Contexto de uso:** Sin momento específico del día. La app es un lugar donde ir a reflexionar cuando lo necesites — mañana, noche, o cualquier momento. Dos modos de uso distintos: (1) registro rápido de un tap, (2) conversación reflexiva con el agente.

### Key Design Challenges

1. **Onboarding conversacional sin fricción.** La primera interacción con el Pepito Grillo define si el usuario se queda. Si no entiende que debe hablar, si la respuesta tarda, o si parece un chatbot genérico, se pierde. Hay que diseñar los primeros 2 minutos como si fueran existenciales — porque lo son.

2. **Dualidad reflexión/acción en una misma interfaz.** La app necesita funcionar como espacio de conversación profunda (cuando el usuario quiere reflexionar) Y como herramienta de registro ultrarrápido (cuando solo quiere marcar su hábito). Dos modos de uso muy distintos que deben coexistir sin confundir.

3. **Transición conversación → datos estructurados.** El agente genera hábitos, señales y recompensas desde la conversación. El usuario necesita ver el resultado de esa conversación de forma clara sin salir del flujo. El reto es mostrar estructura sin romper la intimidad del chat.

4. **Mobile-first con contenido denso.** Heatmap de 12 meses, lista de hábitos activos, acceso al agente, registro rápido — todo en una pantalla de 320-639px. La jerarquía visual tiene que ser implacable.

### Design Opportunities

1. **Modelo mental de WhatsApp como superpoder.** Los usuarios ya saben chatear. Si la interfaz conversacional se siente natural (no como un formulario disfrazado), la curva de aprendizaje es cero. La familiaridad del chat elimina fricción de onboarding.

2. **El heatmap como espejo emocional, no como gráfico de datos.** Espacios vacíos como pausas (no fracasos), gradientes cálidos, sin rojo punitivo. Una oportunidad visual para diferenciarse de toda la competencia y comunicar la filosofía anti-castigo.

3. **Anti-patrones como lenguaje visual.** La ausencia de castigo puede traducirse en una identidad visual propia: colores cálidos, transiciones suaves, microinteracciones que celebran sin presionar. La estética ES la filosofía.

4. **Revelación progresiva como motor de curiosidad.** No mostrar todo desde el día 1. Que el heatmap se vaya llenando, que las opciones aparezcan cuando tienen sentido. Menos es más al principio — la complejidad se desbloquea con el uso.

## Core User Experience

### Defining Experience

Primer tiene dos acciones core que definen el producto, con pesos distintos:

**Acción #1 — Registrar el hábito (la más frecuente):**
Registro diario de mínima fricción. Un checkbox por hábito, un tap, hecho. Idealmente desde un widget en la homescreen del teléfono (post-MVP), y siempre desde un apartado dedicado en la app. Click > swipe — lo más directo posible.

**Acción #2 — Conversar con el Pepito Grillo (la más crítica):**
La conversación con el agente IA es lo que diferencia a Primer de toda la competencia. La primera conversación es existencial: si falla, no hay segunda oportunidad. Es el momento donde el usuario reflexiona sobre sí mismo y la app demuestra que es distinta.

**Acción #3 — Admirar logros y personalizar:**
Ver el progreso acumulado (heatmap, cumbres) y personalizar el perfil/estética. Es la acción que refuerza el hábito de volver y, en el segmento Diego, el motor de monetización.

### Platform Strategy

- **PWA mobile-first:** Diseño primario para 320-639px, touch-based
- **Desktop como segundo dispositivo natural:** El usuario puede tener Primer abierto en el ordenador mientras realiza tareas relacionadas con sus hábitos. No es un afterthought — es un caso de uso real
- **Offline obligatorio:** Registro de hábitos funciona sin conexión. Sincronización en background
- **Sincronización visible:** Icono de nube + tic que confirma estado sincronizado. Sutil pero presente — el usuario sabe que sus datos están seguros y disponibles en todos sus dispositivos
- **Widget homescreen (post-MVP):** Checkboxes de hábitos accesibles sin abrir la app

### Effortless Interactions

1. **Registro de hábito = un tap.** Checkbox en apartado dedicado. Sin pantallas intermedias, sin confirmación, sin animaciones que bloqueen. Tap → registrado → feedback visual instantáneo.

2. **La conversación genera datos sin formularios.** El usuario habla con el Pepito Grillo y el hábito se estructura solo (señal, rutina, recompensa). Nunca rellena un formulario.

3. **Confirmación humana para acciones del agente.** Cada vez que el agente va a tocar datos del usuario (crear hábito, modificar, eliminar), muestra una alerta sencilla con dos opciones (confirmar/cancelar). Human-in-the-loop siempre — el usuario mantiene el control.

4. **Sincronización invisible con feedback visual.** La sync multi-dispositivo funciona sola. El usuario solo ve un icono de nube + tic cuando está sincronizado. Sin configuración, sin conflictos visibles.

5. **Onboarding sin pasos explícitos.** No hay "paso 1 de 5". La primera conversación ES el onboarding. El usuario empieza hablando y termina con un hábito configurado.

### Critical Success Moments

1. **Momento "aha!" #1 — La primera conversación (existencial).** El usuario le cuenta al Pepito Grillo qué quiere cambiar. El agente responde con empatía, hace las preguntas correctas, y el usuario siente que por primera vez algo le escucha sin juzgar. La reflexión sobre sí mismo es la recompensa. Si este momento no funciona, no hay producto.

2. **Momento "aha!" #2 — El hábito estructurado sin formularios.** Al terminar la conversación, el usuario ve su hábito organizado (señal, rutina, recompensa) sin haber rellenado nada. "¿Esto lo hizo la conversación?" La magia es la ausencia de fricción.

3. **Momento "aha!" #3 — La primera semana de heatmap.** 7 cuadraditos de color. Es la primera vez que muchos usuarios mantienen un hábito una semana entera. El progreso visual es la prueba de que algo está cambiando.

4. **Momento de riesgo — La primera recaída.** Si el usuario falla un día y la app le castiga (visual o tonalmente), se va. La respuesta debe ser: espacio vacío sin drama + agente disponible sin forzar. Este momento separa a Primer de toda la competencia.

### Experience Principles

1. **La reflexión es el producto, no el tracking.** El valor de Primer no es registrar datos — es ayudar a las personas a pensar sobre quiénes quieren ser. El tracking es la consecuencia, no el objetivo.

2. **Un tap o nada.** Cada interacción frecuente debe resolverse en un tap. Si requiere más, hay que rediseñar. La fricción es el enemigo de la consistencia.

3. **El usuario siempre tiene el control.** El agente sugiere, nunca impone. Las acciones sobre datos requieren confirmación humana. La app es un compañero, no un sistema automatizado.

4. **Los espacios vacíos son pausas, no fracasos.** Ningún elemento visual, textual o interactivo debe comunicar castigo, culpa o presión por ausencia. La vida pasa — la app espera.

5. **Menos al principio, más con el uso.** Revelación progresiva. El día 1 es simple. La complejidad se desbloquea cuando tiene sentido. No abrumar nunca al usuario nuevo.

## Desired Emotional Response

### Primary Emotional Goals

1. **Seguridad y confianza.** El usuario debe sentir que Primer es un espacio privado donde puede hablar de sus inseguridades más profundas sin miedo. Esto es fundacional — sin esta emoción, ninguna otra funciona. El usuario comparte vulnerabilidades con el agente, y eso requiere un nivel de confianza comparable al de un diario personal.

2. **Sentirse escuchado sin ser juzgado.** La interacción con el Pepito Grillo debe generar la sensación de que alguien (algo) te entiende. No da sermones, no impone, no juzga. Escucha, pregunta, y te ayuda a pensar. Es la emoción que diferencia a Primer de toda la competencia.

3. **Orgullo silencioso por el progreso.** No un orgullo ruidoso ni competitivo — uno íntimo. Ver el heatmap llenarse, notar que algo que antes costaba ahora es automático. La app refleja tu transformación sin compararla con nadie.

### Emotional Journey Mapping

| Momento | Emoción objetivo | Emoción a evitar | Implicación de diseño |
|---------|-----------------|------------------|----------------------|
| **Primera apertura** | Curiosidad directa — "Piensa en tu mejor versión, ¿qué te imaginas?" | Desconfianza, sensación de "otro chatbot" | Ir al grano del producto. Sin tutoriales, sin pasos. Una pregunta poderosa. |
| **Primera conversación** | Vulnerabilidad segura — sentirse escuchado | Vergüenza, incomodidad por hablar con IA | Tono cercano, preguntas abiertas, nunca forzar. Indicadores claros de privacidad. |
| **Hábito creado** | Sorpresa positiva — "ya empecé sin rellenar nada" | Confusión post-conversación | Transición clara: resumen visual del hábito con confirmación explícita. |
| **Registro diario** | Micro-celebración dopamínica + satisfacción rápida | Obligación, carga, rutina pesada | Feedback visual/sensorial inmediato al tap: color, animación sutil, micro-recompensa. |
| **Heatmap llenándose** | Orgullo silencioso, acumulación visual | Presión por racha perfecta | Gradientes cálidos, sin contadores de racha prominentes. El heatmap crece, no cuenta. |
| **Día que fallas** | Neutralidad — la vida pasa | Culpa, castigo, vergüenza | Espacio vacío sin color negativo. Sin notificación. Sin mención al volver. |
| **Volver tras ausencia** | Bienvenida cálida — "sigues aquí, tu progreso también" | Contadores de ausencia, tono pasivo-agresivo | Mensaje positivo orientado al futuro. Progreso anterior visible como logro. |
| **Conversación profunda** | Reflexión, autoconocimiento, insight | Sentirse sermoneado o juzgado | El agente pregunta más de lo que afirma. Nunca impone conclusiones. |
| **Compartir datos personales** | Seguridad — "mis datos están protegidos" | Miedo a exposición, desconfianza | Indicadores visibles de privacidad, cifrado comunicado, control total del usuario sobre sus datos. |

### Micro-Emotions

**Micro-celebración en el registro diario:**
El tap de registro debe generar un micro-momento de dopamina: un color que aparece suavemente, quizá una microanimación o vibración háptica sutil. No un fuego artificial — algo que tu cerebro registre como "bien hecho" sin necesitar atención consciente. La línea entre celebración y presión es delgada: celebrar cuando registras, pero nunca señalar cuando no lo haces.

**Confianza progresiva con el agente:**
La primera conversación genera curiosidad. La tercera genera familiaridad. Al mes, el usuario siente que el Pepito Grillo "le conoce". Esta confianza progresiva es clave para que el usuario comparta cada vez más y la experiencia se profundice.

**Seguridad de datos como emoción, no como feature:**
La privacidad no es un checkbox legal — es una emoción. El usuario necesita SENTIR que sus inseguridades más profundas están protegidas. Esto se comunica con señales visuales sutiles (icono de privacidad en el chat), con lenguaje claro ("solo tú puedes ver esto"), y con control total sobre sus datos (exportar, eliminar en cualquier momento).

### Design Implications

| Emoción objetivo | Decisión de diseño |
|-----------------|-------------------|
| Seguridad / confianza | Indicadores de privacidad en la interfaz del chat. Mensajes claros sobre quién ve los datos ("Solo tú"). Acceso fácil a eliminar datos. Sin tracking de terceros visible. |
| Sentirse escuchado | El agente usa el nombre del usuario. Referencia conversaciones anteriores. Las preguntas son específicas, no genéricas. Tiempo de respuesta que no se sienta robótico. |
| Micro-celebración | Feedback visual inmediato al registrar: transición de color en el checkbox, microanimación en el heatmap. Vibración háptica sutil (si el dispositivo lo soporta). |
| Orgullo silencioso | El heatmap como pieza visual central. Sin comparaciones. Sin leaderboards. El progreso es tuyo y de nadie más. |
| Neutralidad en el fallo | Cero elementos visuales negativos: sin rojo, sin X, sin contadores descendentes. Espacio vacío = pausa natural. |
| Bienvenida cálida | Mensaje personalizado al volver. Sin mención de tiempo ausente. Progreso anterior visible. Tono orientado al futuro. |

### Emotional Design Principles

1. **La seguridad emocional es prerrequisito.** Antes de que el usuario pueda reflexionar, necesita sentir que sus datos y sus palabras están protegidos. Cada decisión de diseño debe reforzar esta confianza.

2. **Celebrar sin presionar.** El feedback positivo es inmediato y sensorial (color, movimiento, háptica). Pero la ausencia de feedback nunca es castigo. Celebrar el sí sin señalar el no.

3. **La empatía se diseña, no se declara.** No basta con decir "somos empáticos" — hay que diseñar cada interacción para que se sienta así. El agente pregunta antes de afirmar. La app espera antes de empujar. Los errores se manejan con calidez.

4. **La confianza se construye con transparencia.** El usuario sabe qué datos tiene la app, dónde están, y puede eliminarlos cuando quiera. No hay letra pequeña. El control sobre los datos es visible y accesible.

5. **La dopamina al servicio del hábito, no de la app.** Los micro-momentos de celebración refuerzan el hábito real del usuario, no el hábito de abrir la app. La adicción a la app no es un objetivo — la autonomía del usuario sí.

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

**Claude (Anthropic)**

| Aspecto | Análisis |
|---------|----------|
| **Problema que resuelve** | Un espacio donde pensar, reflexionar y trabajar con un compañero IA empático |
| **Patrón clave: Proyectos** | La organización por proyectos es directamente transferible: cada hábito en Primer es como un proyecto en Claude — un espacio con contexto acumulado que enriquece las conversaciones futuras del agente |
| **Enganche emocional** | Los LLMs son empáticos por naturaleza. El usuario siente que tiene un rincón donde charlar sin juicio. Es exactamente la sensación que el Pepito Grillo necesita replicar |
| **Retención** | Los usuarios vuelven porque pueden comentar cualquier cosa y sienten que sus datos están seguros. La confianza en la privacidad es el motor de retención — no la gamificación |
| **UX destacable** | Interfaz conversacional limpia, sin ruido visual. El chat es el centro. La estructura (proyectos, artefactos) emerge de la conversación, no la precede |

**Loop Habits**

| Aspecto | Análisis |
|---------|----------|
| **Problema que resuelve** | Tracking de hábitos simple y directo, sin suscripciones |
| **Patrón clave: Registro sin abrir la app** | Las notificaciones que permiten confirmar un hábito directamente (sí/no) sin abrir la app son el patrón de mínima fricción por excelencia. Los usuarios vuelven precisamente porque no tienen que "volver" — el registro ocurre fuera de la app |
| **Visualización de datos** | Gráficos de racha, heatmaps, estadísticas. La visualización del progreso acumulado es lo que da peso emocional al tracking |
| **Debilidad clara** | UI anticuada que no se ha adaptado a estándares modernos. La funcionalidad es sólida pero la experiencia visual no comunica calidez ni modernidad. Oportunidad directa para Primer |
| **Retención** | Puramente funcional — vuelven por la utilidad, no por la emoción. Primer puede superar esto combinando la utilidad de Loop con la conexión emocional de Claude |

### Transferable UX Patterns

**De Claude → Primer:**

- **Hábito como proyecto contextual.** Cada hábito acumula conversaciones, registros y contexto. Cuando el usuario habla con el Pepito Grillo sobre un hábito específico, el agente tiene todo el historial. El hábito no es un dato — es un espacio vivo.
- **Chat como interfaz principal.** La conversación es limpia, centrada, sin distracciones. El contenido estructurado (hábitos, resúmenes) emerge dentro del chat como tarjetas o bloques, no en pantallas separadas.
- **Privacidad como experiencia.** La sensación de seguridad no se comunica con una página legal — se comunica con diseño: interfaz íntima, sin elementos sociales, sin tracking visible.

**De Loop Habits → Primer:**

- **Registro fuera de la app.** En Loop es vía notificación; en Primer será vía widget en homescreen (post-MVP). El principio es el mismo: el hábito se registra donde el usuario ya está, no donde la app quiere que vaya.
- **Visualización de progreso como recompensa.** El heatmap y los gráficos de racha son lo que convierte datos fríos en motivación visual. Primer toma este patrón pero lo eleva con gradientes cálidos y sin penalización visual.

### Anti-Patterns to Avoid

| Anti-patrón | Dónde se ve | Por qué evitarlo en Primer |
|-------------|------------|---------------------------|
| **UI anticuada / fría** | Loop Habits | La funcionalidad sin calidez visual no comunica empatía. Primer necesita que la estética refuerce la filosofía. |
| **Notificaciones push en PWA** | Múltiples apps | Complicadas técnicamente en web, invasivas si no se gestionan bien, y riesgo de contradecir la filosofía anti-presión. Widget > notificaciones. |
| **Formularios de configuración** | Apps de hábitos tradicionales | Si el usuario tiene que rellenar campos para crear un hábito, perdemos la magia de "la conversación lo configura todo". Formularios solo como fallback manual. |
| **Datos sociales visibles** | Habitica, redes sociales | Leaderboards, comparaciones, actividad de otros usuarios — todo esto contradice la intimidad que necesita Primer. El progreso es privado por defecto. |
| **Onboarding con slides/tutoriales** | La mayoría de apps | 5 slides explicando cómo funciona la app = 5 oportunidades de que el usuario cierre. En Primer, el onboarding ES la primera conversación. |

### Design Inspiration Strategy

**Adoptar directamente:**
- Interfaz conversacional limpia estilo Claude — el chat como centro de la experiencia
- Concepto de hábito como espacio contextual (inspirado en proyectos de Claude)
- Heatmap de progreso de Loop Habits como pieza visual central
- Registro de un tap / checkbox sin abrir flujos complejos

**Adaptar para Primer:**
- El widget de homescreen (post-MVP) como evolución del patrón de "registro sin abrir la app" de Loop Habits — pero con checkboxes en vez de notificaciones
- La visualización de datos de Loop pero con lenguaje visual cálido y sin penalización (gradientes en vez de rojo/verde binario)
- La sensación de privacidad de Claude pero comunicada de forma más explícita — indicadores visuales de que "solo tú ves esto"

**Evitar:**
- UI funcional pero fría (Loop Habits) — la estética debe comunicar empatía
- Notificaciones push en MVP — widget como alternativa preferida
- Cualquier elemento social o competitivo — el progreso es íntimo
- Onboarding basado en tutoriales — la conversación es el onboarding

## Design System Foundation

### Design System Choice

**Tailwind CSS v4 + shadcn/ui** como sistema themeable con control total.

shadcn/ui no es una librería de componentes tradicional — los componentes se copian al proyecto, lo que permite personalización completa sin depender de actualizaciones externas. Esto es crítico para Primer: necesitamos que la UI comunique calidez y empatía, no el look corporativo que viene por defecto.

**Metodología de construcción: Atomic Design + Subatomic Design (Brad Frost)**

La interfaz se construye siguiendo la jerarquía de Atomic Design:

| Nivel | Qué es | Ejemplo en Primer |
|-------|--------|-------------------|
| **Design Tokens (Subatómico)** | Variables fundamentales: colores, espaciado, tipografía, radios, sombras | `--color-celebration`, `--radius-card`, `--space-chat-bubble` |
| **Átomos** | Elementos UI indivisibles | Checkbox de hábito, botón de confirmación, avatar del agente, icono de nube+tic |
| **Moléculas** | Combinaciones funcionales de átomos | Tarjeta de hábito (checkbox + nombre + racha), burbuja de chat (avatar + texto + timestamp) |
| **Organismos** | Secciones completas de interfaz | Lista de hábitos con checkboxes, interfaz de conversación con el Pepito Grillo, heatmap completo |
| **Templates** | Layouts de página sin datos | Layout de dashboard, layout de conversación, layout de perfil |
| **Páginas** | Templates con datos reales | Dashboard de Marta con sus 3 hábitos, conversación de Roberto sobre dejar de fumar |

### Rationale for Selection

1. **Máxima compatibilidad con desarrollo asistido por IA.** shadcn/ui + Tailwind es el stack de UI donde Claude Code y Cursor generan código con mayor precisión y consistencia. Para un desarrollador solo trabajando con agentes IA, esto es decisivo.

2. **Control total sin dependencia externa.** Los componentes viven en el proyecto. Se pueden personalizar para que Primer se sienta cálido y empático sin pelear contra los defaults de una librería.

3. **Accesibilidad incluida.** shadcn/ui está construido sobre Radix UI primitives, que traen WCAG compliance de serie (focus management, keyboard navigation, ARIA). Cumplir Nivel A sin esfuerzo extra.

4. **Theming profundo con design tokens.** Tailwind CSS v4 con CSS custom properties permite definir tokens subatómicos que se propagan a toda la UI. Cambiar la paleta de colores o ajustar el spacing es modificar variables, no reescribir componentes.

5. **Atomic Design como lenguaje compartido.** La jerarquía átomo → molécula → organismo da estructura al desarrollo y hace que los componentes sean reutilizables y predecibles. Los agentes IA trabajan mejor con esta estructura porque es modular y explícita.

### Implementation Approach

**Fase 1 — Tokens y átomos (inicio del MVP):**
- Definir design tokens subatómicos: paleta de colores, tipografía, espaciado, radios, sombras
- Configurar Tailwind CSS v4 con los tokens como CSS custom properties
- Instalar y personalizar átomos base de shadcn/ui: Button, Checkbox, Input, Card, Avatar, Dialog (para confirmaciones del agente)

**Fase 2 — Moléculas y organismos (durante MVP):**
- Componer moléculas específicas de Primer: tarjeta de hábito, burbuja de chat, alerta de confirmación del agente
- Construir organismos: lista de hábitos, interfaz conversacional, heatmap
- Validar accesibilidad Nivel A en cada componente

**Fase 3 — Templates y páginas (integración MVP):**
- Definir layouts responsive (mobile-first)
- Ensamblar páginas completas con datos reales
- Testing cross-browser (Chrome, Safari)

### Customization Strategy

**Paleta de colores — Pendiente de definición:**
- Restricción firme: sin rojo ni colores punitivos en el heatmap o estados negativos
- Dirección: tonos cálidos y empáticos que comuniquen seguridad y cercanía
- Los espacios vacíos en el heatmap usan un neutro suave, no un color que señale ausencia
- Los gradientes del heatmap van de suave a intenso (celebración sin presión)
- La paleta final se definirá al inicio de la implementación como design tokens

**Modo oscuro — Deseable para MVP, no bloqueante:**
- Tailwind CSS v4 + shadcn/ui facilitan modo oscuro con CSS custom properties y la clase `dark`
- Si el timeline lo permite, se incluye en MVP. Si no, es la primera mejora post-MVP
- Los design tokens subatómicos se definen con variantes light/dark desde el inicio para no rehacer trabajo

**Tipografía:**
- Una fuente principal legible y cálida (no corporativa). Se evaluará en fase de implementación
- Tamaños responsive definidos como tokens
- Jerarquía clara: títulos, cuerpo, captions, texto del chat

**Componentes custom de Primer (no existen en shadcn/ui):**
- Heatmap estilo GitHub con gradientes personalizados
- Interfaz de chat tipo mensajería (burbujas, avatar del agente, indicador de escritura)
- Checkbox de registro rápido con microanimación de celebración
- Tarjeta resumen de hábito (generada desde conversación con el agente)
- Icono de sincronización (nube + tic)

## Defining Core Interaction

### Defining Experience

**"Habla con tu Pepito Grillo y construye quién quieres ser."**

La experiencia que define a Primer es la conversación reflexiva que genera acción. El usuario habla con un agente IA empático, reflexiona sobre sí mismo, y como resultado de esa conversación sus hábitos se configuran automáticamente. No es el tracking lo que diferencia al producto — es que la reflexión guiada produce datos estructurados sin fricción.

El tracking es la consecuencia. La conversación es el producto.

**Nombre del producto:** Pendiente de definición. "Primer" y "Rachitas" son nombres de trabajo. Se decidirá antes de lanzamiento.

### User Mental Model

**Modelo mental que traen los usuarios:**
- Marta: "Una app de hábitos es un sitio donde marco si hice o no hice algo cada día" (modelo Loop Habits)
- Diego: "Una app es como un juego con logros y progresión" (modelo Habitica/gaming)
- Roberto: "Una app de hábitos es un contador que se resetea cuando fallo" (modelo apps de abstinencia)

**Modelo mental que Primer necesita instalar:**
"Primer es un lugar donde hablo de lo que quiero cambiar, y la app me ayuda a pensar y a actuar."

La transición del modelo viejo al nuevo ocurre en la primera conversación. Si el usuario espera un formulario y encuentra una conversación empática, el momento de sorpresa positiva instala el nuevo modelo mental. Por eso la primera interacción es existencial.

**Metáfora familiar:** WhatsApp. El usuario ya sabe chatear. La interfaz conversacional no requiere aprendizaje. Lo que es nuevo es que el chat produce resultados estructurados (hábitos) — y eso se comunica con la tarjeta resumen que aparece en el propio chat.

### Success Criteria

| Criterio | Indicador de éxito |
|----------|-------------------|
| **"Esto funciona"** | El usuario termina la primera conversación con un hábito configurado sin haber rellenado un formulario |
| **"Me entiende"** | El usuario siente que el agente ha capturado lo que quiere cambiar con precisión y empatía |
| **"Ya empecé"** | Tras la conversación, el usuario ve su hábito en el dashboard listo para registrar. La distancia entre intención y acción es cero |
| **"Es rápido"** | El registro diario posterior se resuelve en un tap. Sin pantallas intermedias |
| **"Mis datos están seguros"** | El usuario no duda en compartir información personal con el agente |
| **"No me castiga"** | El primer día que falla, la app no le hace sentir mal |

### Novel UX Patterns

**Patrón novel: Conversación como configuración**
No existe en apps de hábitos. El usuario no rellena campos — habla, y los datos se estructuran solos. Es un patrón novel que combina dos patrones familiares:
- Chat tipo WhatsApp (interfaz familiar)
- Tarjeta resumen tipo artefacto de Claude (resultado estructurado dentro del chat)

La educación del usuario es mínima: sabe chatear, sabe leer una tarjeta. Lo nuevo es que una cosa produce la otra.

**Patrón establecido: Registro por checkbox**
El tracking diario usa un patrón universal — checkboxes. No hay innovación aquí a propósito. La familiaridad es la feature.

**Patrón establecido adaptado: Heatmap emocional**
El heatmap estilo GitHub es conocido, pero adaptado: sin rojo, con gradientes cálidos, espacios vacíos neutros. La innovación no es el patrón sino el lenguaje visual.

**Patrón novel: Confirmación human-in-the-loop del agente**
Cada acción del agente sobre datos del usuario requiere confirmación mediante una alerta sencilla dentro del chat. El agente propone, el usuario confirma. Esto es familiar (diálogos de confirmación) pero aplicado a un contexto novel (agente IA que modifica datos).

### Experience Mechanics

**1. Iniciación — Primera vez:**

```
Registro rápido (email / Google)
    → Pantalla de bienvenida mínima
    → Conversación directa con Pepito Grillo
    → "Piensa en tu mejor versión. ¿Qué es lo que te imaginas?"
```

- El registro es rápido y no interrumpe el momentum
- No hay tutorial, slides ni explicación previa
- La primera pregunta del agente invita a reflexionar, no a configurar

**2. Interacción — La conversación:**

```
Usuario escribe lo que quiere cambiar
    → Agente responde con empatía, pregunta más
    → Conversación de 3-5 intercambios
    → Agente estructura el hábito internamente
    → Aparece tarjeta resumen en el chat:
      ┌─────────────────────────────┐
      │ 🎯 Tu primer hábito         │
      │                             │
      │ Señal: [detectada]          │
      │ Rutina: [definida]          │
      │ Recompensa: [acordada]      │
      │ Frecuencia: [sugerida]      │
      │ Modo: Normal                │
      │                             │
      │  [✓ Crear hábito] [✗ Ajustar] │
      └─────────────────────────────┘
    → Usuario confirma o pide ajustes
```

- La tarjeta resumen aparece DENTRO del chat, no en otra pantalla
- El usuario puede aceptar directamente o pedir cambios conversacionalmente
- El agente nunca crea el hábito sin confirmación explícita

**3. Feedback — El resultado:**

```
Usuario confirma "Crear hábito"
    → Microanimación de celebración sutil
    → Mensaje del agente: "Listo. Tu primer paso está dado."
    → El hábito aparece inmediatamente en el dashboard
```

- El feedback es inmediato y emocional (animación + mensaje)
- No hay redirección forzada al dashboard — el usuario puede seguir charlando o ir a ver su hábito

**4. Completación — El loop diario:**

```
Usuario abre la app (día siguiente)
    → Ve su lista de hábitos con checkboxes
    → Tap en el checkbox → registrado
    → Microanimación de celebración (color, háptica)
    → Heatmap se actualiza con un nuevo cuadradito
    → (Opcional) Abre conversación con Pepito Grillo para reflexionar
```

- El loop diario es un tap. Todo lo demás es opcional
- La conversación con el agente está siempre disponible pero nunca forzada
- El heatmap crece visualmente como recompensa pasiva
