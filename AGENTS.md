# AGENTS.md

## Scripts
- `npm run build:lib` : build ds-angular library
- `npm test` : run all tests
- `npm run test:headless` : headless Chrome tests
- `npm run test:coverage` : tests with coverage report
- `ng test ds-angular --include="**/my.component.spec.ts"` : run single test file
- `npm run storybook` : start Storybook (port 6006)
- `npm run build-storybook` : build static Storybook
- `npx tsc --noEmit` : TypeScript type check
- `npm run lint` : run linter (if configured)

## Code Style
- Imports order: Angular → third-party → local modules
- TypeScript strict mode, no `any`, explicit types everywhere
- Components prefix `ds`, class/file PascalCase ↔ kebab-case filenames
- CSS BEM naming with `ds-` prefix
- Use `@Input()`/`@Output()` Angular decorators
- Format code via Prettier/EditorConfig settings
- Handle errors explicitly, avoid silent failures
