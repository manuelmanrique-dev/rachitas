---
stepsCompleted: [1]
inputDocuments:
  - "_bmad-output/planning-artifacts/research/technical-stack-mvp-pwa-research-2026-03-05.md"
workflowType: "research"
lastStep: 1
research_type: "technical"
research_topic: "Revision Critica Stack Tecnico MVP PWA"
research_goals: "Validar o refutar decisiones tecnicas del documento existente, especialmente arquitectura local-first"
user_name: "Manuel"
date: "2026-03-06"
web_research_enabled: true
source_verification: true
---

# Revision Critica: Stack Tecnico MVP PWA

**Fecha:** 2026-03-06
**Autor:** Manuel
**Tipo:** Investigacion Tecnica - Revision Adversarial

---

## Confirmacion de Alcance

**Tema:** Revision critica del stack tecnico MVP PWA - Validar arquitectura local-first
**Objetivos:** Auditar con datos reales las 6 vulnerabilidades identificadas en el documento tecnico existente

**Vectores de investigacion:**

1. Fragilidad de IndexedDB como almacenamiento principal
2. Privacidad real vs. privacidad percibida
3. Coste real del modelo BYO-AI
4. Dexie Cloud pricing y alternativas de sync
5. PWA en iOS - estado actual y limitaciones
6. Local-first vs. features sociales planificadas
7. Persistencia sin instalacion de PWA
8. Riesgos de seguridad y privacidad en exportacion/importacion de datos
9. Alternativas de backend — Supabase, PocketBase y modelo hibrido

**Pregunta central:** Es la arquitectura local-first la decision correcta dado lo que queremos construir, o fue elegida para optimizar coste de infraestructura a expensas de la propuesta de valor del producto?

**Alcance Confirmado:** 2026-03-06

---

## Vector 1: Fragilidad de IndexedDB como Almacenamiento Principal

### Veredicto: RIESGO REAL - El documento original SUBESTIMA el problema

### Hallazgos verificados

**Chrome:** "Clear browsing data" con la opcion por defecto incluye IndexedDB junto con cookies, cache y otros datos temporales. La API `chrome.browsingData` confirma que IndexedDB es un tipo de dato eliminable. Ademas, la opcion "clear on exit" tambien elimina IndexedDB, haciendo que el usuario parezca un visitante nuevo la proxima vez que abre el navegador.
_Fuente: [Chrome DevTools - IndexedDB](https://developer.chrome.com/docs/devtools/storage/indexeddb), [Chrome Browsing Data API](https://developer.chrome.com/docs/extensions/reference/api/browsingData)_

**Safari/iOS:** Safari aplica una politica de eviccion de 7 dias: si un origen no tiene interaccion del usuario (click o tap) en los ultimos 7 dias de uso del navegador, sus datos creados desde script seran eliminados. Esto incluye IndexedDB. **Excepcion critica:** esta politica NO aplica a PWAs instaladas en la pantalla de inicio.
_Fuente: [WebKit - Updates to Storage Policy](https://webkit.org/blog/14403/updates-to-storage-policy/)_

**Safari PWA:** Las PWAs instaladas tienen un limite de almacenamiento de ~50MB, significativamente menor que Chrome (cientos de MB). PWAs inactivas pierden todos los datos cacheados despues de 7 dias.
_Fuente: [MDN - Storage quotas and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)_

### Mitigacion disponible: Storage API persist()

`navigator.storage.persist()` solicita almacenamiento persistente que solo puede ser eliminado por el usuario de forma explicita. Soporte actual:
- **Chrome/Chromium:** Maneja automaticamente el permiso sin mostrar prompts al usuario
- **Safari 17.0+** (iOS 17+): Soporte completo de Storage API. WebKit concede la peticion basandose en heuristicas, incluyendo si el sitio se abre como Home Screen Web App
- **Requisito:** Solo disponible en contexto seguro (HTTPS)
_Fuente: [web.dev - Persistent storage](https://web.dev/articles/persistent-storage), [Dexie.js StorageManager docs](https://dexie.org/docs/StorageManager)_

### Analisis critico

| Escenario | Riesgo sin mitigacion | Riesgo con persist() |
|---|---|---|
| Usuario borra "todo el historial" en Chrome | **ALTO** - datos eliminados | **ALTO** - persist() NO protege contra borrado manual explicito |
| Safari 7 dias sin uso (no PWA) | **ALTO** - eviccion automatica | **BAJO** - persist() protege |
| Safari PWA instalada | **BAJO** - exenta de eviccion | **BAJO** - doble proteccion |
| Cambio de dispositivo/navegador | **TOTAL** - sin recuperacion | **TOTAL** - persist() no ayuda |
| Disco lleno, navegador necesita espacio | **ALTO** - eviccion por presion | **BAJO** - persist() protege |

**Conclusion Vector 1:** La probabilidad de perdida de datos calificada como "Baja" en el documento original es **incorrecta**. Para usuarios que no instalan la PWA (la mayoria de usuarios nuevos), el riesgo es **Alto**. El usuario promedio SI borra datos del navegador periodicamente. Y el escenario de cambio de dispositivo es 100% perdida sin sync.

**Recomendacion:** Implementar `navigator.storage.persist()` como minimo obligatorio en Sprint 1, y ofrecer exportacion manual de datos (JSON) como feature del MVP. Comunicar al usuario de forma transparente que sus datos viven en el dispositivo.

---

## Vector 2: Privacidad Real vs. Privacidad Percibida

### Veredicto: DEBILIDAD REAL pero con mitigaciones viables

### Hallazgos verificados

**Problema confirmado:** IndexedDB almacena datos en texto plano por defecto. Cualquier persona con acceso al dispositivo puede ver los datos desde DevTools del navegador sin ningun tipo de autenticacion.
_Fuente: [MindStick - IndexedDB security considerations](https://www.mindstick.com/interview/34312/what-are-the-security-and-privacy-considerations-when-using-indexeddb)_

**Soluciones de encriptacion disponibles:**

1. **Web Crypto API + AES-GCM:** Encriptacion nativa del navegador. Se puede aplicar encriptacion simetrica (AES-GCM) a cada dato al entrar/salir de la base de datos. Usa PBKDF2 para derivacion de claves y AES-GCM para encriptacion.
_Fuente: [Zerocrat - Zero-Knowledge AES-256 Encryption](https://zerocrat.com/advanced-encryption-zero-knowledge-aes-256-encryption-for-unrivaled-data-protection/)_

2. **Librerias existentes:**
 - `web-crypto-storage`: Tiny promise-based crypto keyval storage usando IndexedDB + Web Crypto API nativo
 - `secure-webstore` (AKASHA): IndexedDB store con encriptacion integrada
 - **RxDB** incluye plugin de encriptacion integrado
 _Fuente: [GitHub - web-crypto-storage](https://github.com/willgm/web-crypto-storage), [RxDB Encryption](https://rxdb.info/encryption.html)_

3. **Problema del almacenamiento de claves:** Almacenar la clave de encriptacion en localStorage o IndexedDB permite que un infostealer obtenga la clave del disco. Soluciones parciales:
 - Guardar la clave en una cookie (en navegadores con app-bound encryption, la cookie esta encriptada en disco)
 - Derivar la clave de una contrasena del usuario (mas seguro, pero requiere que el usuario recuerde algo)
 - Usar WebAuthn/passkeys para desbloqueo biometrico
 _Fuente: [Browsertech Digest - Encrypting offline storage](https://digest.browsertech.com/archive/browsertech-digest-encrypting-offline-storage-for/)_

### Analisis critico

La encriptacion de IndexedDB es **tecnicamemte viable** pero anade complejidad significativa:
- Impacto en rendimiento de lectura/escritura
- El problema de almacenamiento de claves no tiene solucion perfecta en el navegador
- Un atacante con acceso fisico al dispositivo Y conocimiento tecnico podria eventualmente extraer datos, pero el listón se eleva considerablemente

**Conclusion Vector 2:** El documento original presenta "privacidad por diseno" de forma engañosa. Local-first != privacidad. Pero la encriptacion con Web Crypto API es una mitigacion real y viable para el MVP. El nivel de proteccion resultante es comparable al de muchas apps nativas que almacenan datos sin encriptar en SQLite.

**Recomendacion:** Implementar encriptacion basica con Web Crypto API para datos sensibles (notas personales, reflexiones). No necesario para datos de habitos basicos. Documentar honestamente el modelo de amenazas en la politica de privacidad.

---

## Vector 3: "Coste Cero" que No es Coste Cero

### Veredicto: OMISION CRITICA en el documento original

### Hallazgos verificados - Pricing LLM APIs (Marzo 2026)

| Modelo | Input/1M tokens | Output/1M tokens | Coste por 1K tokens (output) |
|---|---|---|---|
| Claude Haiku 4.5 | $1.00 | $5.00 | $0.005 |
| Claude Sonnet 4.6 | $3.00 | $15.00 | $0.015 |
| Claude Opus 4.6 | $5.00 | $25.00 | $0.025 |
| GPT-5 mini | $0.25 | $2.00 | $0.002 |
| GPT-5.2 | $1.75 | $14.00 | $0.014 |
| Gemini 2.5 Pro | $1.25 | $10.00 | $0.010 |

_Fuentes: [Claude API Pricing](https://platform.claude.com/docs/en/about-claude/pricing), [LLM API Pricing 2026](https://pricepertoken.com/), [Silicon Data - LLM Cost Guide](https://www.silicondata.com/blog/llm-cost-per-token)_

### Estimacion de coste por sesion de coaching

Una conversacion de coaching de habitos tipica (saludo + contexto + reflexion + recomendacion) implica aproximadamente:

| Componente | Tokens estimados |
|---|---|
| System prompt + contexto de habitos | ~500-1,000 input |
| Mensaje del usuario | ~100-200 input |
| Respuesta del agente | ~300-800 output |
| **Total por intercambio** | ~600-1,200 input + ~300-800 output |

Para una sesion tipica de 3-5 intercambios:

| Modelo | Coste por sesion (5 intercambios) | Coste mensual (1 sesion/dia) |
|---|---|---|
| Claude Haiku 4.5 | ~$0.005 - $0.025 | ~$0.15 - $0.75 |
| Claude Sonnet 4.6 | ~$0.015 - $0.075 | ~$0.45 - $2.25 |
| GPT-5 mini | ~$0.002 - $0.010 | ~$0.06 - $0.30 |

**Optimizaciones disponibles:**
- Batch API de Anthropic: 50% descuento
- Prompt caching: hasta 90% reduccion en input tokens para system prompts consistentes
_Fuente: [CostGoat - Claude API Pricing Calculator](https://costgoat.com/pricing/claude-api)_

### Analisis critico

El coste es **real pero bajo** para el usuario individual:
- Con GPT-5 mini o Claude Haiku: $0.06-$0.75/mes — insignificante
- Con Claude Sonnet: $0.45-$2.25/mes — noticeable pero razonable
- Con Opus: hasta $7.50/mes — comparable a una suscripcion

**Conclusion Vector 3:** El documento original tiene razon en que la infraestructura del desarrollador es $0, pero * +*omite por completo** que el usuario paga tokens. Esta omision es problematica porque:
1. El coste debe comunicarse al usuario ANTES de que configure su API key
2. Modelos baratos (Haiku, GPT-5 mini) hacen el coste negligible, pero la UX debe guiar hacia estos
3. El prompt caching reduce costes dramaticamente y debe implementarse desde el inicio

**Recomendacion:** Incluir en la UX del onboarding BYO-AI: estimador de coste mensual segun modelo elegido. Recomendar Haiku/GPT-5 mini como default. Implementar prompt caching obligatorio.

---

## Vector 4: Dexie Cloud Pricing y Alternativas de Sync

### Veredicto: INFORMACION INCOMPLETA en el documento original

### Hallazgos verificados - Dexie Cloud Pricing (2026)

| Tier | Coste | Incluye |
|---|---|---|
| Free | $0 | 3 usuarios, 100MB storage |
| Production | $3/mes por pack de 25 seats | = $0.12/usuario/mes |
| Storage adicional | Coste separado | Segun necesidad |

*Fuente: [Dexie Cloud Pricing](https://dexie.org/cloud/pricing), [Dexie Cloud Subscription Model](https://medium.com/dexie-js/dexie-cloud-subscription-model-cbf9a709ce7)*

**Nota importante:** El free tier de 3 usuarios es solo para desarrollo/testing, no para produccion real. La transicion a produccion requiere $3/mes minimo (25 seats). Evaluacion de 30 dias disponible para nuevos usuarios sin ocupar + seats.

### Alternativas de sync investigadas

| Solucion | Modelo | Coste | Complejidad |
|---|---|---|---|
| **Dexie Cloud** | Managed sync | $0.12/user/mes | Baja (integrado con Dexie.js) |
| **PowerSync** | Sync + PostgreSQL | Self-hosted o managed | Media-Alta |
| **Replicache** | Sync protocol + backend propio | Gratis <$200k ARR | Alta (assembly required) |
| **ElectricSQL** | CRDT + PostgreSQL | Open source | Media |
| **RxDB** | Plugin sync + backend | Open source | Media |
| **CRDTs (Yjs/Automerge)** | Peer-to-peer o servidor | Open source | Alta |

*Fuentes: [ElectricSQL Alternatives](https://electric-sql.com/docs/reference/alternatives), [PowerSync vs ElectricSQL](https://www.powersync.com/blog/electricsql-vs-powersync), [Replicache](https://replicache.dev/)*

### Analisis critico

Dexie Cloud **es** una opcion razonable para sync si se planifica:
- A $0.12/user/mes, 1,000 usuarios activos = $120/mes — manejable
- Pero es un **cambio de modelo economico**: de $0 infraestructura a coste variable por usuario
- La integracion con Dexie.js existente es la mas sencilla de todas las opciones

**Conclusion Vector 4:** El documento original menciona Dexie Cloud como "el camino natural" sin explicitar que:
1. El free tier (3 usuarios) no sirve para produccion
2. Requiere presupuesto de $0.12/user/mes en produccion
3. Es la opcion mas facil pero no la unica — alternativas open-source existen (con mas trabajo)

**Recomendacion:** Mantener Dexie.js para local-first MVP. Si/cuando se necesite sync, Dexie Cloud es la opcion de menor friccion. Pero planificar el modelo economico ANTES de prometer sync multi-dispositivo a los usuarios. Considerar exportacion/importacion manual como sync "pobre" para el MVP.

---

## Vector 5: PWA en iOS - Estado Actual y Limitaciones

### Veredicto: RIESGO REAL pero en mejora - el documento original NO evalua adecuadamente

### Hallazgos verificados (2025-2026)

**Limitaciones confirmadas de PWA en iOS:**

1. **Instalacion solo desde Safari:** Los usuarios que lleguen por Chrome u otro navegador en iOS no pueden instalar la PWA. Deben abrir en Safari y usar "Añadir a pantalla de inicio".
*Fuente: [Brainhub - PWA on iOS 2025](https://brainhub.eu/library/pwa-on-ios)*

2. **Push Notifications:** Disponibles desde iOS 16.4, PERO:
 - Solo funcionan para PWAs instaladas en la pantalla de inicio
 - El prompt de permiso debe activarse en respuesta a interaccion del usuario
 - No soportan: Time Sensitive notifications, Live Activities, ni notificaciones provisionales
 *Fuente: [MagicBell - PWA iOS Limitations](https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide)*

3. **Sin Background Sync:** iOS no soporta Background Sync API, Periodic Background Sync, ni Background Fetch para PWAs. Sin timeline de implementacion. La PWA no puede actualizar contenido en segundo plano.
*Fuente: [Brainhub - PWA on iOS 2025](https://brainhub.eu/library/pwa-on-ios)*

4. **Acceso limitado a hardware:** Geolocation soportada, pero USB, Bluetooth y otros sensores limitados o no disponibles.

**Mejoras recientes (2025-2026):**
- Safari 18.4: Declarative Web Push y Screen Wake Lock
- **iOS 26:** Cada sitio anadido a la pantalla de inicio ahora se abre por defecto como web app — mejora significativa en la experiencia de instalacion
_Fuente: [MobiLoud - PWAs on iOS 2026](https://www.mobiloud.com/blog/progressive-web-apps-ios)_

### Cuota de mercado iOS en mercado objetivo

| Region | iOS | Android |
|---|---|---|
| España | ~25% | ~75% |
| America Latina (promedio) | ~15-25% | ~75-85% |
| Global | ~28-29% | ~71-72% |

_Fuentes: [StatCounter - Mobile OS Spain](https://gs.statcounter.com/os-market-share/mobile/spain), [World Population Review - iPhone Market Share](https://worldpopulationreview.com/country-rankings/iphone-market-share-by-country), +[TekRevol - Android vs iOS 2026](https://www.tekrevol.com/blogs/android-vs-ios-statistics/)_

### Analisis critico

Para una app de habitos hispanohablante:
- **~20-25% del publico objetivo usa iOS** — no es despreciable
- La experiencia PWA en iOS ha mejorado sustancialmente en 2025-2026
- **iOS 26 es un game-changer**: abrir como web app por defecto reduce friccion
- Las limitaciones mas graves (sin background sync) afectan a recordatorios de habitos — feature core del producto
- Push notifications funcionan pero requieren instalacion previa — embudo de conversion adicional

**Conclusion Vector 5:** El riesgo es real pero **en declive activo**. Apple esta mejorando el soporte PWA, no empeorándolo. Las limitaciones mas criticas para una app de habitos son:
1. Sin background sync = no puedes enviar recordatorios inteligentes en iOS
2. Push requiere instalacion previa = menor alcance que Android
3. Instalacion solo desde Safari = friccion en onboarding

**Recomendacion:** PWA sigue siendo viable como estrategia MVP para el mercado hispanohablante donde Android domina(~75-85%). Para iOS, aceptar las limitaciones en MVP y considerar wrapper nativo (Capacitor/TWA) como evolucion post-MVP si la traccion lo justifica. Implementar el flujo de instalacion PWA con UX optimizada para Safari.

---

## Vector 6: Local-First vs. Features Sociales Planificadas

### Veredicto: CONTRADICCION ARQUITECTONICA REAL pero gestionable con planificacion

### Hallazgos verificados

**Estado del arte local-first + colaboracion (2026):**

El ecosistema local-first ha evolucionado significativamente hacia soporte de features colaborativas:

1. **CRDTs como puente:** Los Conflict-free Replicated Data Types (CRDTs) son el patron principal para combinar local-first con colaboracion. Frameworks como Yjs, Automerge 2.0 y Y-Sweet permiten edicion colaborativa con resolucionautomatica de conflictos.
*Fuente: [Dev.to - Architecture Shift Local-First 2026](https://dev.to/the_nortern_dev/the-architecture-shift-why-im-betting-on-local-first-in-2026-1nh6)*

2. **Sync engines invisibles:** La tendencia 2026 es el "invisible sync engine" — aplicaciones completamente offline-capable que sincronizan de forma transparente cuando hay conexion. Herramientas como ElectricSQL y Replicache sirven como motor de sync entre instancia local y backend.
*Fuente: [Heavybit - Local-First Development](https://www.heavybit.com/library/article/local-first-development)*

3. **Patron hibrido:** Local-first con cloud opcional. Los datos personales viven en el dispositivo; los datos compartidos viven en un servidor. No es todo-o-nada.
*Fuente: [alexop.dev - What is Local-First Web Development](https://alexop.dev/posts/what-is-local-first-web-development/)*

### Features del brainstorming vs. viabilidad local-first

| Feature planificada | Compatible local-first | Requiere servidor | Complejidad de migracion |
|---|---|---|---|
| Tracking de habitos | SI | NO | N/A |
| Rachas y gamificacion | SI | NO | N/A |
| Agente IA conversacional | SI (API call directo) | NO (BYO-AI) | N/A |
| Memoria del agente IA | SI (local) | PARCIAL (si multi-device) | Baja |
| Habitos colaborativos | NO | SI | **Alta** |
| Compartir logros | NO | SI | **Media** |
| Leaderboards/competencia | NO | SI | **Alta** |
| Backup/sync multi-dispositivo | NO | SI | **Media** (Dexie Cloud) |

### Analisis critico

La contradiccion es real pero **no es un blocker para el MVP**:

1. **Las features core del MVP son 100% compatibles con local-first:** tracking, rachas, gamificacion, agente IA (BYO-AI). No hay conflicto aqui.

2. **Las features sociales son post-MVP:** habitos colaborativos, compartir logros, leaderboards — todas son features de crecimiento, no de producto minimo viable.

3. **El patron hibrido existe:** No es necesario elegir entre local-first puro y servidor puro. Se puede empezar local-first y anadir una capa de sync/social despues. Esto es exactamente lo que hacen apps como Obsidian (local-first+ Obsidian Sync opcional).

4. **El coste real de la migracion:** Anadir features sociales no requiere "reescribir desde cero" si la arquitectura tiene buena separacion de concerns (service layer). Requiere anadir un backend y un motor de sync, no tirar el frontend.

**Conclusion Vector 6:** El documento original deberia explicitar que features sociales requieren backend adicionaly que eso no es un "upgrade facil". Pero la decision de empezar local-first para el MVP **es correcta** porque:
- Las features core no necesitan servidor
- El time-to-market se reduce drasticamente
- Se puede validar la propuesta de valor antes de invertir en infraestructura
- El patron hibrido (local + sync opcional) es un camino probado

**Recomendacion:** Mantener local-first para MVP. Disenar el service layer con la interfaz de sync en mente (pero sin implementarla). Documentar explicitamente que features sociales = backend + presupuesto de infraestructura. No prometer features sociales en el roadmap sin presupuesto asociado.

---

## Respuesta a la Pregunta Central

> Es la arquitectura local-first la decision correcta dado lo que queremos construir, o fue elegida para optimizar coste de infraestructura a expensas de la propuesta de valor del producto?

### Veredicto: LOCAL-FIRST ES CORRECTA PARA EL MVP, CON CONDICIONES

**La arquitectura local-first ES la decision correcta para el MVP** porque:

1. **Las features core del MVP no necesitan servidor:** Tracking de habitos, rachas, gamificacion, y agente IA conversacional (BYO-AI) funcionan al 100% en local-first.

2. **Valida antes de gastar:** Permite validar la propuesta de valor (coaching IA para habitos) sin coste de infraestructura. Si nadie quiere el producto, no has gastado en servidores.

3. **Time-to-market:** Un solo desarrollador puede lanzar MVP en semanas, no meses.

4. **El patron hibrido es viable:** La evolucion de local-first a local-first + sync es un camino probado (Obsidian, + Excalidraw, Linear).

**PERO el documento original falla en:**

1. **Subestimar el riesgo de perdida de datos** (probabilidad "Baja" cuando es "Alta" para usuarios no-instalados)
2. **Omitir el coste real BYO-AI** trasladado al usuario
3. **Presentar "privacidad por diseno" sin explicar que IndexedDB es texto plano**
4. **No explicitar el coste de Dexie Cloud** y la transicion de modelo economico
5. **No evaluar adecuadamente las limitaciones PWA en iOS** para el mercado objetivo
6. **No documentar que features sociales = backend + presupuesto** como decision consciente

### Acciones correctivas para el documento tecnico

| Accion | Prioridad | Sprint |
|---|---|---|
| Implementar `navigator.storage.persist()` | **Critica** | Sprint 1 |
| Exportacion/importacion manual de datos (JSON) | **Alta** | Sprint 1-2 |
| UX transparente sobre almacenamiento local | **Alta** | Sprint 1 |
| Estimador de coste BYO-AI en onboarding | **Alta** | Sprint 4 |
| Prompt caching para reducir costes IA | **Alta** | Sprint 4 |
| Encriptacion Web Crypto para datos sensibles | **Media** | Sprint 2-3 |
| Flujo instalacion PWA optimizado para Safari | **Media** | Sprint 1-2 |
| Documentar roadmap social = backend requerido | **Media** | Pre-Sprint 1 |
| UX que priorice instalacion de PWA para proteger datos | **Alta** | Sprint 1 |
| Exportacion cifrada (Web Crypto + AES-GCM) obligatoria | **Alta** | Sprint 1-2 |
| Importacion con validacion de esquema y sanitizacion | **Alta** | Sprint 1-2 |

---

## Vector 7: Persistencia sin Instalacion de PWA

### Veredicto: LIMITACION ESTRUCTURAL del modelo local-first

### Hallazgos de la discusion

El usuario que accede desde el navegador sin instalar la PWA enfrenta riesgos de persistencia significativos:

| Escenario | ¿Persisten los datos? |
|---|---|
| Chrome - uso normal | Si, mientras no borre datos |
| Chrome - "Clear browsing data" (opcion por defecto) | **NO** - IndexedDB se elimina |
| Chrome - "Clear on exit" activado | **NO** - cada sesion empieza de cero |
| Safari/iOS - 7+ dias sin visitar el sitio | **NO** - eviccion automatica de WebKit |
| Cualquier navegador - cambio de dispositivo | **NO** - perdida total sin sync |
| Cualquier navegador - cambio de navegador | **NO** - datos aislados por navegador |

`navigator.storage.persist()` funciona sin instalar la PWA (solo requiere HTTPS), pero **no protege contra borrado manual** del usuario.

### Analisis critico

La experiencia esperada de una app de habitos es **continuidad y confianza en los datos**. El modelo local-first sin instalacion contradice esta expectativa:
- Los datos estan atados a un navegador especifico en un dispositivo especifico
- El usuario promedio borra datos del navegador periodicamente
- No hay portabilidad entre dispositivos ni navegadores

**Conclusion Vector 7:** La fragilidad de persistencia sin instalacion refuerza los hallazgos del Vector 1. Para usuarios que no instalan la PWA (la mayoria de usuarios nuevos), la experiencia de datos es inferior a cualquier app con backend. La decision de local-first se mantiene valida para el MVP por coste y velocidad, pero debe comunicarse transparentemente al usuario y priorizar el flujo de instalacion de la PWA.

---

## Vector 8: Riesgos de Seguridad y Privacidad en Exportacion/Importacion de Datos

### Veredicto: SUPERFICIE DE ATAQUE ADICIONAL creada por compensar fragilidad local-first

### Hallazgos de la discusion

La exportacion/importacion de datos (recomendada en Vector 1 como mitigacion) introduce sus propios riesgos:

**Riesgos de exportacion:**

| Riesgo | Descripcion |
|---|---|
| Archivo en texto plano | JSON sin cifrar en carpeta de descargas — accesible a cualquier persona o app con acceso al dispositivo |
| Compartido accidentalmente | El usuario lo sube a Drive, lo envia por mensajeria, lo deja en USB |
| Sin control post-exportacion | Una vez fuera de la app, no hay forma de protegerlo |
| Datos sensibles expuestos | Habitos personales, notas de coaching IA, patrones de comportamiento |

**Riesgos de importacion:**

| Riesgo | Descripcion |
|---|---|
| Inyeccion de datos maliciosos | Archivo manipulado podria inyectar datos corruptos en IndexedDB |
| Sobreescritura no deseada | Reemplazar o fusionar datos actuales conlleva riesgo de perdida |
| Archivo de origen desconocido | Importar archivos alterados o de terceros |

### Mitigaciones viables

- **Exportacion cifrada:** Web Crypto API + AES-GCM con contrasena del usuario. Genera `.json.enc` en lugar de `.json` plano
- **Importacion segura:** Validacion estricta de esquema, sanitizacion de strings (prevencion XSS), checksum/firma para detectar alteraciones, confirmacion explicita antes de sobrescribir

### Analisis critico

Existe una tension fundamental en el modelo local-first:

> Cuanto mas mecanismos de "backup manual" se anaden para compensar la fragilidad de IndexedDB, mas superficie de ataque se crea.

Con una BD en servidor, export/import seria un "nice to have" para portabilidad. En local-first es casi obligatorio para no perder datos, y eso **anade complejidad y riesgo de seguridad al MVP**.

**Conclusion Vector 8:** La exportacion cifrada es implementable pero representa trabajo adicional que existe unicamente porque la persistencia local es fragil. Este coste oculto debe contabilizarse al evaluar si el ahorro de infraestructura de local-first realmente compensa. Implementar exportacion sin cifrado NO es aceptable dado que los datos incluyen informacion personal sensible (notas de coaching, habitos intimos).

**Recomendacion:** Si se implementa export/import, cifrado obligatorio desde el primer dia. Anadir a la tabla de acciones correctivas.

---

## Vector 9: Alternativas de Backend — Evaluacion de Supabase, PocketBase y Modelo Hibrido

### Contexto

Los vectores 1, 7 y 8 demuestran que el modelo local-first puro tiene costes ocultos significativos: fragilidad de persistencia, datos atados a un navegador/dispositivo, y superficie de ataque adicional por export/import. Esta investigacion evalua si un backend ligero ofrece mejor relacion coste/beneficio para el MVP.

### Opcion A: Supabase (Managed BaaS)

**Que es:** Backend-as-a-Service open source basado en PostgreSQL, con auth, storage, realtime y Edge Functions incluidos.

**Free tier (2026):**

| Recurso | Limite gratuito |
|---|---|
| Proyectos | 2 |
| Base de datos | 500 MB |
| Egress BD | 2 GB/mes |
| Auth (MAUs) | 50,000 |
| File storage | 1 GB |
| Edge Functions | 500,000 invocaciones/mes |
| API requests | Ilimitados |

**Limitacion critica del free tier:** Proyectos se pausan automaticamente tras 7 dias de inactividad. Para una app de habitos esto es problematico — un usuario que no abre la app en una semana encontraria el backend caido. Existen workarounds (GitHub Actions ping cada 5 dias, Vercel cron jobs) que consumen ~0.22% del free tier de GitHub Actions.

**Plan Pro:** $25/mes — 8GB BD, 100K MAUs, sin pausing. Es el salto minimo para produccion real.

**Compatibilidad con IA/vibe coding:**
- Supabase es parte del stack de referencia para vibe coding en 2026 (v0, Lovable, Bolt.new lo integran nativamente)
- PostgreSQL es el dialecto SQL que los LLMs generan con mayor precision
- Supabase tiene una pagina dedicada "Supabase for Vibe Coders" y ha crecido 700%+ durante el boom de AI coding
- Los agentes de IA (Claude Code, Cursor) generan codigo Supabase con alta calidad por su enorme presencia en datos de entrenamiento

**Soporte offline:** Supabase NO tiene soporte offline nativo. Para offline-first necesitas una capa adicional:
- **PowerSync** (Postgres-SQLite sync layer) — tiene free tier, se integra con Supabase Auth
- **RxDB con plugin Supabase** — sync bidireccional
- **Implementacion manual** — IndexedDB como cache + sync queue + service worker

_Fuentes: [Supabase Pricing](https://supabase.com/pricing), [Supabase for Vibe Coders](https://supabase.com/solutions/vibe-coders), [PowerSync + Supabase](https://supabase.com/partners/integrations/powersync), [Supabase Pause Prevention](https://github.com/travisvn/supabase-pause-prevention), [Best Vibecoding Tools with Supabase 2026](https://natively.dev/articles/vibecoding-supabase-tools)_

---

### Opcion B: PocketBase (Self-hosted)

**Que es:** Backend completo en un solo binario (Go + SQLite). Auth, BD, file storage, realtime API. Zero dependencias.

**Coste:**

| Opcion | Coste |
|---|---|
| Self-hosted en VPS (Hetzner, Vultr) | $4-7/mes |
| Google Cloud free tier (e2-micro) | $0 |
| Oracle Cloud Always Free (ARM) | $0 |
| PocketHost (managed) | Variable |

**Ventajas para MVP solo-dev:**
- Un solo binario, sin contenedores, sin configuracion compleja
- Auth + BD + file storage + realtime incluidos
- Control total sobre los datos (self-hosted)
- Escalable hasta ~10,000 usuarios en un VPS de $4/mes
- Migracion trivial (copiar un archivo SQLite)

**Limitaciones:**
- **Sin soporte offline nativo** — el SDK JS requiere conexion a internet para toda operacion
- **Solo escalado vertical** — un unico servidor, sin clustering nativo
- **Proyecto de un solo mantenedor** — sin empresa detras, sin soporte dedicado
- **Menos presencia en datos de entrenamiento de IA** que Supabase — los agentes generan codigo PocketBase con menor calidad
- Para offline necesitarias implementar cache local manualmente (Dexie.js + sync custom)

_Fuentes: [PocketBase FAQ](https://pocketbase.io/faq/), [PocketBase JS SDK](https://github.com/pocketbase/js-sdk), [PocketBase Scalability Discussion](https://github.com/pocketbase/pocketbase/discussions/2184), [Better Stack - PocketBase Guide](https://betterstack.com/community/guides/database-platforms/pocketbase-backend/)_

---

### Opcion C: Hibrido — Dexie.js (local) + Supabase (backend)

**Patron:** Dexie.js como base de datos local para operaciones inmediatas y offline. Supabase como fuente de verdad con sync.

**Flujo:**
1. Usuario interactua con la app -> operaciones contra Dexie.js (instantaneas)
2. Cuando hay conexion -> sync bidireccional con Supabase
3. Si no hay conexion -> las operaciones se encolan y sincronizan al reconectar
4. Cambio de dispositivo -> login en Supabase, datos se descargan a Dexie.js local

**Implementacion de sync:**

| Opcion | Complejidad | Coste adicional |
|---|---|---|
| PowerSync (managed sync layer) | Baja-Media | Free tier disponible |
| Sync manual (queue + service worker) | Media | $0 |
| RxDB plugin Supabase | Media | $0 (open source) |
| Dexie Cloud (reemplaza Supabase) | Baja | $0.12/user/mes en produccion |

**Ventajas del hibrido:**
- Mejor UX posible: respuesta instantanea (local) + seguridad de datos (servidor)
- Offline funcional de verdad
- Multi-dispositivo resuelto
- No necesitas export/import como red de seguridad
- No dependes de persist() como proteccion critica
- Auth resuelto (Supabase Auth)

**Desventajas:**
- Mayor complejidad inicial que local-first puro o server-only
- Resolucion de conflictos de sync (mitigable con last-write-wins para datos de habitos simples)
- Dos capas de datos que mantener

---

### Comparativa final

| Criterio | Local-first puro (Dexie.js) | Supabase solo | PocketBase solo | Hibrido (Dexie + Supabase) |
|---|---|---|---|---|
| **Coste MVP** | $0 | $0 (free tier) o $25/mes (Pro) | $0-7/mes | $0 (free tier) o $25/mes (Pro) |
| **Persistencia datos** | Fragil | Robusta | Robusta | Robusta |
| **Multi-dispositivo** | No | Si | Si | Si |
| **Offline** | Nativo | No | No | Si |
| **Complejidad setup** | Baja | Baja-Media | Baja | Media |
| **IA code generation** | Alta (Dexie conocido) | Muy Alta (Supabase dominante) | Media | Alta |
| **Auth incluido** | No | Si | Si | Si |
| **Escalabilidad** | N/A (cliente) | Alta (PostgreSQL managed) | Media (vertical only) | Alta |
| **Riesgo de plataforma** | Navegador puede borrar datos | Supabase pausing (free) o $25/mes | Mantenedor unico | Mismo que Supabase |

### Recomendacion

**El modelo hibrido (Dexie.js + Supabase) es la opcion optima** para este proyecto porque:

1. **Resuelve el problema fundamental:** Los datos del usuario estan seguros en el servidor. Borrar cache, cambiar dispositivo o navegador no implica perdida de datos.

2. **Mantiene offline funcional:** Dexie.js como cache local permite que la app funcione sin conexion — critico para una PWA.

3. **Supabase es el backend mas compatible con desarrollo IA en 2026:** Los agentes generan codigo Supabase con la mayor calidad del mercado. Es parte del stack de referencia de vibe coding.

4. **El free tier es suficiente para validar:** 50K MAUs y 500MB cubren de sobra un MVP. El pausing por inactividad se resuelve con un cron job trivial, o se acepta el coste de $25/mes si la app tiene traccion.

5. **Auth resuelto desde el dia 1:** Necesario para multi-dispositivo y para cualquier futura monetizacion.

6. **Elimina la necesidad de compensaciones:** No se requiere export/import cifrado como feature critica, ni UX para empujar instalacion PWA por miedo a perdida de datos, ni comunicacion ansiosa sobre donde viven los datos.

**Accion propuesta:** Revisar la decision arquitectonica del documento tecnico original. Reemplazar "local-first puro con Dexie.js" por "hibrido: Dexie.js (cache local + offline) + Supabase (auth + BD + fuente de verdad)".

---

## Fuentes Consultadas

- [MDN - Storage quotas and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
- [WebKit - Updates to Storage Policy](https://webkit.org/blog/14403/updates-to-storage-policy/)
- [Chrome DevTools - IndexedDB](https://developer.chrome.com/docs/devtools/storage/indexeddb)
- [web.dev - Persistent storage](https://web.dev/articles/persistent-storage)
- [Zerocrat - Zero-Knowledge AES-256 Encryption](https://zerocrat.com/advanced-encryption-zero-knowledge-aes-256-encryption-for-unrivaled-data-protection/)
- [Browsertech Digest - Encrypting offline storage](https://digest.browsertech.com/archive/browsertech-digest-encrypting-offline-storage-for/)
- [RxDB Encryption](https://rxdb.info/encryption.html)
- [GitHub - web-crypto-storage](https://github.com/willgm/web-crypto-storage)
- [Claude API Pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- [LLM API Pricing 2026](https://pricepertoken.com/)
- [Silicon Data - LLM Cost Guide](https://www.silicondata.com/blog/llm-cost-per-token)
- [CostGoat - Claude API Calculator](https://costgoat.com/pricing/claude-api)
- [Dexie Cloud Pricing](https://dexie.org/cloud/pricing)
- [Dexie Cloud Subscription Model](https://medium.com/dexie-js/dexie-cloud-subscription-model-cbf9a709ce7)
- [ElectricSQL Alternatives](https://electric-sql.com/docs/reference/alternatives)
- [PowerSync vs ElectricSQL](https://www.powersync.com/blog/electricsql-vs-powersync)
- [Replicache](https://replicache.dev/)
- [Brainhub - PWA on iOS 2025](https://brainhub.eu/library/pwa-on-ios)
- [MagicBell - PWA iOS Limitations](https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide)
- [MobiLoud - PWAs on iOS 2026](https://www.mobiloud.com/blog/progressive-web-apps-ios)
- [StatCounter - Mobile OS Spain](https://gs.statcounter.com/os-market-share/mobile/spain)
- [World Population Review - iPhone Market Share](https://worldpopulationreview.com/country-rankings/iphone-market-share-by-country)
- [Dev.to - Architecture Shift Local-First 2026](https://dev.to/the_nortern_dev/the-architecture-shift-why-im-betting-on-local-first-in-2026-1nh6)
- [Heavybit - Local-First Development](https://www.heavybit.com/library/article/local-first-development)
- [LogRocket - Offline-first frontend apps 2025](https://blog.logrocket.com/offline-first-frontend-apps-2025-indexeddb-sqlite/)
- [Supabase Pricing](https://supabase.com/pricing)
- [Supabase for Vibe Coders](https://supabase.com/solutions/vibe-coders)
- [Best Vibecoding Tools with Supabase 2026](https://natively.dev/articles/vibecoding-supabase-tools)
- [PowerSync + Supabase Integration](https://supabase.com/partners/integrations/powersync)
- [Supabase Pause Prevention](https://github.com/travisvn/supabase-pause-prevention)
- [PocketBase FAQ](https://pocketbase.io/faq/)
- [PocketBase JS SDK](https://github.com/pocketbase/js-sdk)
- [PocketBase Scalability Discussion](https://github.com/pocketbase/pocketbase/discussions/2184)
- [Better Stack - PocketBase Guide](https://betterstack.com/community/guides/database-platforms/pocketbase-backend/)
- [Supabase vs PocketBase Comparison](https://www.leanware.co/insights/supabase-vs-pocketbase)
- [Supabase Self-Hosting Docs](https://supabase.com/docs/guides/self-hosting)
- [PowerSync Supabase Guide](https://docs.powersync.com/integrations/supabase/guide)