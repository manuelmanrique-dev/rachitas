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

44 +## Vector 1: Fragilidad de IndexedDB como Almacenamiento Principal
45 +
46 +### Veredicto: RIESGO REAL - El documento original SUBESTIMA el problema
47 +
48 +### Hallazgos verificados
49 +
50 +**Chrome:** "Clear browsing data" con la opcion por defecto incluye IndexedDB junto con cookies, cache y otros datos + temporales. La API `chrome.browsingData` confirma que IndexedDB es un tipo de dato eliminable. Ademas, la opcion "c
+lear on exit" tambien elimina IndexedDB, haciendo que el usuario parezca un visitante nuevo la proxima vez que abre
+el navegador.
51 +_Fuente: [Chrome DevTools - IndexedDB](https://developer.chrome.com/docs/devtools/storage/indexeddb), [Chrome Browsi
+ng Data API](https://developer.chrome.com/docs/extensions/reference/api/browsingData)_
52 +
53 +**Safari/iOS:** Safari aplica una politica de eviccion de 7 dias: si un origen no tiene interaccion del usuario (cli
+ck o tap) en los ultimos 7 dias de uso del navegador, sus datos creados desde script seran eliminados. Esto incluye
+IndexedDB. **Excepcion critica:** esta politica NO aplica a PWAs instaladas en la pantalla de inicio.
54 +_Fuente: [WebKit - Updates to Storage Policy](https://webkit.org/blog/14403/updates-to-storage-policy/)_
55 +
56 +**Safari PWA:** Las PWAs instaladas tienen un limite de almacenamiento de ~50MB, significativamente menor que Chrome + (cientos de MB). PWAs inactivas pierden todos los datos cacheados despues de 7 dias.
57 +_Fuente: [MDN - Storage quotas and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/S
+torage_quotas_and_eviction_criteria)_
58 +
59 +### Mitigacion disponible: Storage API persist()
60 +
61 +`navigator.storage.persist()` solicita almacenamiento persistente que solo puede ser eliminado por el usuario de for
+ma explicita. Soporte actual:
62 +- **Chrome/Chromium:** Maneja automaticamente el permiso sin mostrar prompts al usuario
63 +- **Safari 17.0+** (iOS 17+): Soporte completo de Storage API. WebKit concede la peticion basandose en heuristicas,
+incluyendo si el sitio se abre como Home Screen Web App
64 +- **Requisito:** Solo disponible en contexto seguro (HTTPS)
65 +_Fuente: [web.dev - Persistent storage](https://web.dev/articles/persistent-storage), [Dexie.js StorageManager docs]
+(https://dexie.org/docs/StorageManager)_
66 +
67 +### Analisis critico
68 +
69 +| Escenario | Riesgo sin mitigacion | Riesgo con persist() |
70 +|---|---|---|
71 +| Usuario borra "todo el historial" en Chrome | **ALTO** - datos eliminados | **ALTO** - persist() NO protege contra + borrado manual explicito |
72 +| Safari 7 dias sin uso (no PWA) | **ALTO** - eviccion automatica | **BAJO** - persist() protege |
73 +| Safari PWA instalada | **BAJO** - exenta de eviccion | **BAJO** - doble proteccion |
74 +| Cambio de dispositivo/navegador | **TOTAL** - sin recuperacion | **TOTAL** - persist() no ayuda |
75 +| Disco lleno, navegador necesita espacio | **ALTO** - eviccion por presion | **BAJO** - persist() protege |
76 +
77 +**Conclusion Vector 1:** La probabilidad de perdida de datos calificada como "Baja" en el documento original es **in
+correcta**. Para usuarios que no instalan la PWA (la mayoria de usuarios nuevos), el riesgo es **Alto**. El usuario
+promedio SI borra datos del navegador periodicamente. Y el escenario de cambio de dispositivo es 100% perdida sin sy
+nc.
78 +
79 +**Recomendacion:** Implementar `navigator.storage.persist()` como minimo obligatorio en Sprint 1, y ofrecer exportac
+ion manual de datos (JSON) como feature del MVP. Comunicar al usuario de forma transparente que sus datos viven en e
+l dispositivo.
80 +
81 +---
82 +
83 +## Vector 2: Privacidad Real vs. Privacidad Percibida
84 +
85 +### Veredicto: DEBILIDAD REAL pero con mitigaciones viables
86 +
87 +### Hallazgos verificados
88 +
89 +**Problema confirmado:** IndexedDB almacena datos en texto plano por defecto. Cualquier persona con acceso al dispos
+itivo puede ver los datos desde DevTools del navegador sin ningun tipo de autenticacion.
90 +_Fuente: [MindStick - IndexedDB security considerations](https://www.mindstick.com/interview/34312/what-are-the-secu
+rity-and-privacy-considerations-when-using-indexeddb)_
91 +
92 +**Soluciones de encriptacion disponibles:**
93 +
94 +1. **Web Crypto API + AES-GCM:** Encriptacion nativa del navegador. Se puede aplicar encriptacion simetrica (AES-GCM
+) a cada dato al entrar/salir de la base de datos. Usa PBKDF2 para derivacion de claves y AES-GCM para encriptacion.
95 +_Fuente: [Zerocrat - Zero-Knowledge AES-256 Encryption](https://zerocrat.com/advanced-encryption-zero-knowledge-aes-
+256-encryption-for-unrivaled-data-protection/)_
96 +
97 +2. **Librerias existentes:**
98 + - `web-crypto-storage`: Tiny promise-based crypto keyval storage usando IndexedDB + Web Crypto API nativo
99 + - `secure-webstore` (AKASHA): IndexedDB store con encriptacion integrada
100 + - **RxDB** incluye plugin de encriptacion integrado
101 + _Fuente: [GitHub - web-crypto-storage](https://github.com/willgm/web-crypto-storage), [RxDB Encryption](https://r
+xdb.info/encryption.html)_
102 +
103 +3. **Problema del almacenamiento de claves:** Almacenar la clave de encriptacion en localStorage o IndexedDB permite + que un infostealer obtenga la clave del disco. Soluciones parciales:
104 + - Guardar la clave en una cookie (en navegadores con app-bound encryption, la cookie esta encriptada en disco)
105 + - Derivar la clave de una contrasena del usuario (mas seguro, pero requiere que el usuario recuerde algo)
106 + - Usar WebAuthn/passkeys para desbloqueo biometrico
107 + _Fuente: [Browsertech Digest - Encrypting offline storage](https://digest.browsertech.com/archive/browsertech-dig
+est-encrypting-offline-storage-for/)_
108 +
109 +### Analisis critico
110 +
111 +La encriptacion de IndexedDB es **tecnicamemte viable** pero anade complejidad significativa:
112 +- Impacto en rendimiento de lectura/escritura
113 +- El problema de almacenamiento de claves no tiene solucion perfecta en el navegador
114 +- Un atacante con acceso fisico al dispositivo Y conocimiento tecnico podria eventualmente extraer datos, pero el li
+stón se eleva considerablemente
115 +
116 +**Conclusion Vector 2:** El documento original presenta "privacidad por diseno" de forma engañosa. Local-first != pr
+ivacidad. Pero la encriptacion con Web Crypto API es una mitigacion real y viable para el MVP. El nivel de proteccio
+n resultante es comparable al de muchas apps nativas que almacenan datos sin encriptar en SQLite.
117 +
118 +**Recomendacion:** Implementar encriptacion basica con Web Crypto API para datos sensibles (notas personales, reflex
+iones). No necesario para datos de habitos basicos. Documentar honestamente el modelo de amenazas en la politica de
+privacidad.
119 +
120 +---
121 +
122 +## Vector 3: "Coste Cero" que No es Coste Cero
123 +
124 +### Veredicto: OMISION CRITICA en el documento original
125 +
126 +### Hallazgos verificados - Pricing LLM APIs (Marzo 2026)
127 +
128 +| Modelo | Input/1M tokens | Output/1M tokens | Coste por 1K tokens (output) |
129 +|---|---|---|---|
130 +| Claude Haiku 4.5 | $1.00 | $5.00 | $0.005 |
131 +| Claude Sonnet 4.6 | $3.00 | $15.00 | $0.015 |
132 +| Claude Opus 4.6 | $5.00 | $25.00 | $0.025 |
133 +| GPT-5 mini | $0.25 | $2.00 | $0.002 |
134 +| GPT-5.2 | $1.75 | $14.00 | $0.014 |
135 +| Gemini 2.5 Pro | $1.25 | $10.00 | $0.010 |
136 +
137 +_Fuentes: [Claude API Pricing](https://platform.claude.com/docs/en/about-claude/pricing), [LLM API Pricing 2026](htt
+ps://pricepertoken.com/), [Silicon Data - LLM Cost Guide](https://www.silicondata.com/blog/llm-cost-per-token)_
138 +
139 +### Estimacion de coste por sesion de coaching
140 +
141 +Una conversacion de coaching de habitos tipica (saludo + contexto + reflexion + recomendacion) implica aproximadamen
+te:
142 +
143 +| Componente | Tokens estimados |
144 +|---|---|
145 +| System prompt + contexto de habitos | ~500-1,000 input |
146 +| Mensaje del usuario | ~100-200 input |
147 +| Respuesta del agente | ~300-800 output |
148 +| **Total por intercambio** | ~600-1,200 input + ~300-800 output |
149 +
150 +Para una sesion tipica de 3-5 intercambios:
151 +
152 +| Modelo | Coste por sesion (5 intercambios) | Coste mensual (1 sesion/dia) |
153 +|---|---|---|
154 +| Claude Haiku 4.5 | ~$0.005 - $0.025 | ~$0.15 - $0.75 |
155 +| Claude Sonnet 4.6 | ~$0.015 - $0.075 | ~$0.45 - $2.25 |
156 +| GPT-5 mini | ~$0.002 - $0.010 | ~$0.06 - $0.30 |
157 +
158 +**Optimizaciones disponibles:**
159 +- Batch API de Anthropic: 50% descuento
160 +- Prompt caching: hasta 90% reduccion en input tokens para system prompts consistentes
161 +_Fuente: [CostGoat - Claude API Pricing Calculator](https://costgoat.com/pricing/claude-api)_
162 +
163 +### Analisis critico
164 +
165 +El coste es **real pero bajo** para el usuario individual:
166 +- Con GPT-5 mini o Claude Haiku: $0.06-$0.75/mes — insignificante
167 +- Con Claude Sonnet: $0.45-$2.25/mes — noticeable pero razonable
168 +- Con Opus: hasta $7.50/mes — comparable a una suscripcion
169 +
170 +**Conclusion Vector 3:** El documento original tiene razon en que la infraestructura del desarrollador es $0, pero * +*omite por completo** que el usuario paga tokens. Esta omision es problematica porque:
171 +1. El coste debe comunicarse al usuario ANTES de que configure su API key
172 +2. Modelos baratos (Haiku, GPT-5 mini) hacen el coste negligible, pero la UX debe guiar hacia estos
173 +3. El prompt caching reduce costes dramaticamente y debe implementarse desde el inicio
174 +
175 +**Recomendacion:** Incluir en la UX del onboarding BYO-AI: estimador de coste mensual segun modelo elegido. Recomend
+ar Haiku/GPT-5 mini como default. Implementar prompt caching obligatorio.
176 +
177 +---
178 +
179 +## Vector 4: Dexie Cloud Pricing y Alternativas de Sync
180 +
181 +### Veredicto: INFORMACION INCOMPLETA en el documento original
182 +
183 +### Hallazgos verificados - Dexie Cloud Pricing (2026)
184 +
185 +| Tier | Coste | Incluye |
186 +|---|---|---|
187 +| Free | $0 | 3 usuarios, 100MB storage |
188 +| Production | $3/mes por pack de 25 seats | = $0.12/usuario/mes |
189 +| Storage adicional | Coste separado | Segun necesidad |
190 +
191 +*Fuente: [Dexie Cloud Pricing](https://dexie.org/cloud/pricing), [Dexie Cloud Subscription Model](https://medium.com
+/dexie-js/dexie-cloud-subscription-model-cbf9a709ce7)*
192 +
193 +**Nota importante:** El free tier de 3 usuarios es solo para desarrollo/testing, no para produccion real. La transic
+ion a produccion requiere $3/mes minimo (25 seats). Evaluacion de 30 dias disponible para nuevos usuarios sin ocupar + seats.
194 +
195 +### Alternativas de sync investigadas
196 +
197 +| Solucion | Modelo | Coste | Complejidad |
198 +|---|---|---|---|
199 +| **Dexie Cloud** | Managed sync | $0.12/user/mes | Baja (integrado con Dexie.js) |
200 +| **PowerSync** | Sync + PostgreSQL | Self-hosted o managed | Media-Alta |
201 +| **Replicache** | Sync protocol + backend propio | Gratis <$200k ARR | Alta (assembly required) |
202 +| **ElectricSQL** | CRDT + PostgreSQL | Open source | Media |
203 +| **RxDB** | Plugin sync + backend | Open source | Media |
204 +| **CRDTs (Yjs/Automerge)** | Peer-to-peer o servidor | Open source | Alta |
205 +
206 +*Fuentes: [ElectricSQL Alternatives](https://electric-sql.com/docs/reference/alternatives), [PowerSync vs ElectricSQ
+L](https://www.powersync.com/blog/electricsql-vs-powersync), [Replicache](https://replicache.dev/)*
207 +
208 +### Analisis critico
209 +
210 +Dexie Cloud **es** una opcion razonable para sync si se planifica:
211 +- A $0.12/user/mes, 1,000 usuarios activos = $120/mes — manejable
212 +- Pero es un **cambio de modelo economico**: de $0 infraestructura a coste variable por usuario
213 +- La integracion con Dexie.js existente es la mas sencilla de todas las opciones
214 +
215 +**Conclusion Vector 4:** El documento original menciona Dexie Cloud como "el camino natural" sin explicitar que:
216 +1. El free tier (3 usuarios) no sirve para produccion
217 +2. Requiere presupuesto de $0.12/user/mes en produccion
218 +3. Es la opcion mas facil pero no la unica — alternativas open-source existen (con mas trabajo)
219 +
220 +**Recomendacion:** Mantener Dexie.js para local-first MVP. Si/cuando se necesite sync, Dexie Cloud es la opcion de m
+enor friccion. Pero planificar el modelo economico ANTES de prometer sync multi-dispositivo a los usuarios. Consider
+ar exportacion/importacion manual como sync "pobre" para el MVP.
221 +
222 +---
223 +
224 +## Vector 5: PWA en iOS - Estado Actual y Limitaciones
225 +
226 +### Veredicto: RIESGO REAL pero en mejora - el documento original NO evalua adecuadamente
227 +
228 +### Hallazgos verificados (2025-2026)
229 +
230 +**Limitaciones confirmadas de PWA en iOS:**
231 +
232 +1. **Instalacion solo desde Safari:** Los usuarios que lleguen por Chrome u otro navegador en iOS no pueden instalar + la PWA. Deben abrir en Safari y usar "Añadir a pantalla de inicio".
233 +*Fuente: [Brainhub - PWA on iOS 2025](https://brainhub.eu/library/pwa-on-ios)*
234 +
235 +2. **Push Notifications:** Disponibles desde iOS 16.4, PERO:
236 + - Solo funcionan para PWAs instaladas en la pantalla de inicio
237 + - El prompt de permiso debe activarse en respuesta a interaccion del usuario
238 + - No soportan: Time Sensitive notifications, Live Activities, ni notificaciones provisionales
239 + *Fuente: [MagicBell - PWA iOS Limitations](https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-comp
+lete-guide)*
240 +
241 +3. **Sin Background Sync:** iOS no soporta Background Sync API, Periodic Background Sync, ni Background Fetch para P
+WAs. Sin timeline de implementacion. La PWA no puede actualizar contenido en segundo plano.
242 +*Fuente: [Brainhub - PWA on iOS 2025](https://brainhub.eu/library/pwa-on-ios)*
243 +
244 +4. **Acceso limitado a hardware:** Geolocation soportada, pero USB, Bluetooth y otros sensores limitados o no dispon
+ibles.
245 +
246 +**Mejoras recientes (2025-2026):**
247 +- Safari 18.4: Declarative Web Push y Screen Wake Lock
248 +- **iOS 26:** Cada sitio anadido a la pantalla de inicio ahora se abre por defecto como web app — mejora significati
+va en la experiencia de instalacion
249 +_Fuente: [MobiLoud - PWAs on iOS 2026](https://www.mobiloud.com/blog/progressive-web-apps-ios)_
250 +
251 +### Cuota de mercado iOS en mercado objetivo
252 +
253 +| Region | iOS | Android |
254 +|---|---|---|
255 +| España | ~25% | ~75% |
256 +| America Latina (promedio) | ~15-25% | ~75-85% |
257 +| Global | ~28-29% | ~71-72% |
258 +
259 +_Fuentes: [StatCounter - Mobile OS Spain](https://gs.statcounter.com/os-market-share/mobile/spain), [World Populatio
+n Review - iPhone Market Share](https://worldpopulationreview.com/country-rankings/iphone-market-share-by-country), +[TekRevol - Android vs iOS 2026](https://www.tekrevol.com/blogs/android-vs-ios-statistics/)_
260 +
261 +### Analisis critico
262 +
263 +Para una app de habitos hispanohablante:
264 +- **~20-25% del publico objetivo usa iOS** — no es despreciable
265 +- La experiencia PWA en iOS ha mejorado sustancialmente en 2025-2026
266 +- **iOS 26 es un game-changer**: abrir como web app por defecto reduce friccion
267 +- Las limitaciones mas graves (sin background sync) afectan a recordatorios de habitos — feature core del producto
268 +- Push notifications funcionan pero requieren instalacion previa — embudo de conversion adicional
269 +
270 +**Conclusion Vector 5:** El riesgo es real pero **en declive activo**. Apple esta mejorando el soporte PWA, no empeo
+rándolo. Las limitaciones mas criticas para una app de habitos son:
271 +1. Sin background sync = no puedes enviar recordatorios inteligentes en iOS
272 +2. Push requiere instalacion previa = menor alcance que Android
273 +3. Instalacion solo desde Safari = friccion en onboarding
274 +
275 +**Recomendacion:** PWA sigue siendo viable como estrategia MVP para el mercado hispanohablante donde Android domina
+(~75-85%). Para iOS, aceptar las limitaciones en MVP y considerar wrapper nativo (Capacitor/TWA) como evolucion post
+-MVP si la traccion lo justifica. Implementar el flujo de instalacion PWA con UX optimizada para Safari.
276 +
277 +---
278 +
279 +## Vector 6: Local-First vs. Features Sociales Planificadas
280 +
281 +### Veredicto: CONTRADICCION ARQUITECTONICA REAL pero gestionable con planificacion
282 +
283 +### Hallazgos verificados
284 +
285 +**Estado del arte local-first + colaboracion (2026):**
286 +
287 +El ecosistema local-first ha evolucionado significativamente hacia soporte de features colaborativas:
288 +
289 +1. **CRDTs como puente:** Los Conflict-free Replicated Data Types (CRDTs) son el patron principal para combinar loca
+l-first con colaboracion. Frameworks como Yjs, Automerge 2.0 y Y-Sweet permiten edicion colaborativa con resolucion
+automatica de conflictos.
290 +*Fuente: [Dev.to - Architecture Shift Local-First 2026](https://dev.to/the_nortern_dev/the-architecture-shift-why-im
+-betting-on-local-first-in-2026-1nh6)*
291 +
292 +2. **Sync engines invisibles:** La tendencia 2026 es el "invisible sync engine" — aplicaciones completamente offline
+-capable que sincronizan de forma transparente cuando hay conexion. Herramientas como ElectricSQL y Replicache sirve
+n como motor de sync entre instancia local y backend.
293 +*Fuente: [Heavybit - Local-First Development](https://www.heavybit.com/library/article/local-first-development)*
294 +
295 +3. **Patron hibrido:** Local-first con cloud opcional. Los datos personales viven en el dispositivo; los datos compa
+rtidos viven en un servidor. No es todo-o-nada.
296 +*Fuente: [alexop.dev - What is Local-First Web Development](https://alexop.dev/posts/what-is-local-first-web-develop
+ment/)*
297 +
298 +### Features del brainstorming vs. viabilidad local-first
299 +
300 +| Feature planificada | Compatible local-first | Requiere servidor | Complejidad de migracion |
301 +|---|---|---|---|
302 +| Tracking de habitos | SI | NO | N/A |
303 +| Rachas y gamificacion | SI | NO | N/A |
304 +| Agente IA conversacional | SI (API call directo) | NO (BYO-AI) | N/A |
305 +| Memoria del agente IA | SI (local) | PARCIAL (si multi-device) | Baja |
306 +| Habitos colaborativos | NO | SI | **Alta** |
307 +| Compartir logros | NO | SI | **Media** |
308 +| Leaderboards/competencia | NO | SI | **Alta** |
309 +| Backup/sync multi-dispositivo | NO | SI | **Media** (Dexie Cloud) |
310 +
311 +### Analisis critico
312 +
313 +La contradiccion es real pero **no es un blocker para el MVP**:
314 +
315 +1. **Las features core del MVP son 100% compatibles con local-first:** tracking, rachas, gamificacion, agente IA (BY
+O-AI). No hay conflicto aqui.
316 +
317 +2. **Las features sociales son post-MVP:** habitos colaborativos, compartir logros, leaderboards — todas son feature
+s de crecimiento, no de producto minimo viable.
318 +
319 +3. **El patron hibrido existe:** No es necesario elegir entre local-first puro y servidor puro. Se puede empezar loc
+al-first y anadir una capa de sync/social despues. Esto es exactamente lo que hacen apps como Obsidian (local-first
++ Obsidian Sync opcional).
320 +
321 +4. **El coste real de la migracion:** Anadir features sociales no requiere "reescribir desde cero" si la arquitectur
+a tiene buena separacion de concerns (service layer). Requiere anadir un backend y un motor de sync, no tirar el fro
+ntend.
322 +
323 +**Conclusion Vector 6:** El documento original deberia explicitar que features sociales requieren backend adicional
+y que eso no es un "upgrade facil". Pero la decision de empezar local-first para el MVP **es correcta** porque:
324 +- Las features core no necesitan servidor
325 +- El time-to-market se reduce drasticamente
326 +- Se puede validar la propuesta de valor antes de invertir en infraestructura
327 +- El patron hibrido (local + sync opcional) es un camino probado
328 +
329 +**Recomendacion:** Mantener local-first para MVP. Disenar el service layer con la interfaz de sync en mente (pero si
+n implementarla). Documentar explicitamente que features sociales = backend + presupuesto de infraestructura. No pro
+meter features sociales en el roadmap sin presupuesto asociado.
330 +
331 +---
332 +
333 +## Respuesta a la Pregunta Central
334 +
335 +> Es la arquitectura local-first la decision correcta dado lo que queremos construir, o fue elegida para optimizar c
+oste de infraestructura a expensas de la propuesta de valor del producto?
336 +
337 +### Veredicto: LOCAL-FIRST ES CORRECTA PARA EL MVP, CON CONDICIONES
338 +
339 +**La arquitectura local-first ES la decision correcta para el MVP** porque:
340 +
341 +1. **Las features core del MVP no necesitan servidor:** Tracking de habitos, rachas, gamificacion, y agente IA conve
+rsacional (BYO-AI) funcionan al 100% en local-first.
342 +
343 +2. **Valida antes de gastar:** Permite validar la propuesta de valor (coaching IA para habitos) sin coste de infraes
+tructura. Si nadie quiere el producto, no has gastado en servidores.
344 +
345 +3. **Time-to-market:** Un solo desarrollador puede lanzar MVP en semanas, no meses.
346 +
347 +4. **El patron hibrido es viable:** La evolucion de local-first a local-first + sync es un camino probado (Obsidian, + Excalidraw, Linear).
348 +
349 +**PERO el documento original falla en:**
350 +
351 +1. **Subestimar el riesgo de perdida de datos** (probabilidad "Baja" cuando es "Alta" para usuarios no-instalados)
352 +2. **Omitir el coste real BYO-AI** trasladado al usuario
353 +3. **Presentar "privacidad por diseno" sin explicar que IndexedDB es texto plano**
354 +4. **No explicitar el coste de Dexie Cloud** y la transicion de modelo economico
355 +5. **No evaluar adecuadamente las limitaciones PWA en iOS** para el mercado objetivo
356 +6. **No documentar que features sociales = backend + presupuesto** como decision consciente
357 +
358 +### Acciones correctivas para el documento tecnico
359 +
360 +| Accion | Prioridad | Sprint |
361 +|---|---|---|
362 +| Implementar `navigator.storage.persist()` | **Critica** | Sprint 1 |
363 +| Exportacion/importacion manual de datos (JSON) | **Alta** | Sprint 1-2 |
364 +| UX transparente sobre almacenamiento local | **Alta** | Sprint 1 |
365 +| Estimador de coste BYO-AI en onboarding | **Alta** | Sprint 4 |
366 +| Prompt caching para reducir costes IA | **Alta** | Sprint 4 |
367 +| Encriptacion Web Crypto para datos sensibles | **Media** | Sprint 2-3 |
368 +| Flujo instalacion PWA optimizado para Safari | **Media** | Sprint 1-2 |
369 +| Documentar roadmap social = backend requerido | **Media** | Pre-Sprint 1 |
| UX que priorice instalacion de PWA para proteger datos | **Alta** | Sprint 1 |
| Exportacion cifrada (Web Crypto + AES-GCM) obligatoria | **Alta** | Sprint 1-2 |
| Importacion con validacion de esquema y sanitizacion | **Alta** | Sprint 1-2 |
370 +
371 +---
372 +
373 +## Vector 7: Persistencia sin Instalacion de PWA

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
374 +
375 +- [MDN - Storage quotas and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_
+quotas_and_eviction_criteria)
376 +- [WebKit - Updates to Storage Policy](https://webkit.org/blog/14403/updates-to-storage-policy/)
377 +- [Chrome DevTools - IndexedDB](https://developer.chrome.com/docs/devtools/storage/indexeddb)
378 +- [web.dev - Persistent storage](https://web.dev/articles/persistent-storage)
379 +- [Zerocrat - Zero-Knowledge AES-256 Encryption](https://zerocrat.com/advanced-encryption-zero-knowledge-aes-256-enc
+ryption-for-unrivaled-data-protection/)
380 +- [Browsertech Digest - Encrypting offline storage](https://digest.browsertech.com/archive/browsertech-digest-encryp
+ting-offline-storage-for/)
381 +- [RxDB Encryption](https://rxdb.info/encryption.html)
382 +- [GitHub - web-crypto-storage](https://github.com/willgm/web-crypto-storage)
383 +- [Claude API Pricing](https://platform.claude.com/docs/en/about-claude/pricing)
384 +- [LLM API Pricing 2026](https://pricepertoken.com/)
385 +- [Silicon Data - LLM Cost Guide](https://www.silicondata.com/blog/llm-cost-per-token)
386 +- [CostGoat - Claude API Calculator](https://costgoat.com/pricing/claude-api)
387 +- [Dexie Cloud Pricing](https://dexie.org/cloud/pricing)
388 +- [Dexie Cloud Subscription Model](https://medium.com/dexie-js/dexie-cloud-subscription-model-cbf9a709ce7)
389 +- [ElectricSQL Alternatives](https://electric-sql.com/docs/reference/alternatives)
390 +- [PowerSync vs ElectricSQL](https://www.powersync.com/blog/electricsql-vs-powersync)
391 +- [Replicache](https://replicache.dev/)
392 +- [Brainhub - PWA on iOS 2025](https://brainhub.eu/library/pwa-on-ios)
393 +- [MagicBell - PWA iOS Limitations](https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide
+)
394 +- [MobiLoud - PWAs on iOS 2026](https://www.mobiloud.com/blog/progressive-web-apps-ios)
395 +- [StatCounter - Mobile OS Spain](https://gs.statcounter.com/os-market-share/mobile/spain)
396 +- [World Population Review - iPhone Market Share](https://worldpopulationreview.com/country-rankings/iphone-market-s
+hare-by-country)
397 +- [Dev.to - Architecture Shift Local-First 2026](https://dev.to/the_nortern_dev/the-architecture-shift-why-im-bettin
+g-on-local-first-in-2026-1nh6)
398 +- [Heavybit - Local-First Development](https://www.heavybit.com/library/article/local-first-development)
399 +- [LogRocket - Offline-first frontend apps 2025](https://blog.logrocket.com/offline-first-frontend-apps-2025-indexeddb-sqlite/)
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
