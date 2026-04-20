# Convenciones del proyecto

## Ramas

**Formato:** `<tipo>/<epic>-<story>-<slug-descriptivo>`

Ejemplos:
- `feat/1-1-init-project` — story 1.1 del epic 1 (scaffold inicial)
- `feat/2-3-heatmap-view` — story 2.3 (vista heatmap)
- `fix/dark-mode-contrast` — fix puntual sin story asociada
- `chore/update-deps` — mantenimiento general
- `docs/readme-deploy-section` — documentación

**Tipos permitidos:** `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `build`, `ci`, `perf`, `style`, `revert`.

**Reglas:**
- Una rama = una story BMAD (o un cambio atómico).
- Se crea desde `main` actualizada.
- Se borra automáticamente al mergear.

## Commits

Seguimos [Conventional Commits 1.0](https://www.conventionalcommits.org/).

**Formato:** `<tipo>(<scope opcional>): <descripción en imperativo>`

Ejemplos:
feat(db): add habit schema v1 with streak tracking
fix(heatmap): correct cell color in dark mode
docs: update README with deploy instructions
chore(deps): bump vite to 6.1
refactor(hooks): extract useHabitStats to dedicated file