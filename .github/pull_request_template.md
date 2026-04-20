## Story / Contexto

<!-- Referencia a la story BMAD (ej: Story 1.1 — Init Project) o descripción del cambio si no hay story -->

## Cambios

<!-- Qué hace esta PR, 3-5 bullets max -->

- 
- 
- 

## Checklist de Code Review (BMAD)

### Funcional
- [ ] Cumple todos los criterios de aceptación de la story
- [ ] Validado manualmente en el preview deploy
- [ ] Funciona offline (si aplica)
- [ ] Validado en móvil real (si toca UI)

### Código
- [ ] `tsc --noEmit` sin errores
- [ ] `eslint` sin warnings
- [ ] Sin `console.log` ni código muerto
- [ ] Nombres expresivos y consistentes
- [ ] Funciones pequeñas, responsabilidad única

### Tests
- [ ] Tests añadidos/actualizados para lógica nueva
- [ ] Tests de componente para UI crítica (si aplica)
- [ ] `vitest run` pasa entero
- [ ] `playwright test` pasa si toca flujos críticos

### Datos y persistencia
- [ ] Schema de Dexie versionado si hay cambios
- [ ] Migraciones probadas con datos existentes

### PWA (si aplica)
- [ ] Service worker sigue funcionando
- [ ] Assets cacheados correctamente
- [ ] App sigue instalable sin regresiones

### Documentación
- [ ] `CLAUDE.md` actualizado si cambian convenciones
- [ ] `README.md` actualizado si cambian instrucciones
- [ ] Comentarios donde la lógica no es evidente

## Preview

<!-- URL del preview de Cloudflare Pages — Cloudflare la pega automáticamente como comentario -->

## Notas adicionales

<!-- Decisiones tomadas, trade-offs, cosas a revisar con lupa -->