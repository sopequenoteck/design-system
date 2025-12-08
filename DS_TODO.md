# DS_TODO.md
> Généré le 2025-12-08 | 8 tâches | Tokens: ~520 | Composants: 30 | Stories: 37 | Docs: 8

## Diagnostic

### ✅ Points conformes
- 30 composants DS + 7 primitives documentés et présents
- 37 stories Storybook (couverture complète)
- 3 thèmes (light/dark/custom) avec parité des tokens
- Tokens datepicker, search-input, container exposés et thématisés
- Documentation MDX complète (8 fichiers)
- Services i18n et icon-registry avec tests

### ⚠️ Problèmes identifiés
- **[TOKEN]** Tokens `$datepicker-*` non définis dans `_semantic.scss` (utilisent valeurs inline dans _tokens.scss)
- **[TOKEN]** Tokens `$ds-container-*` non définis dans `_semantic.scss` (valeurs inline)
- **[DOC]** Version npm `1.2.4` vs documentation mentionnant `1.0.0` dans CLAUDE.md
- **[STORY]** Stories ds-avatar et ds-menu présentes mais non documentées dans CLAUDE.md

### 💡 Suggestions
- Centraliser les tokens sémantiques manquants pour cohérence avec le pattern existant
- Mettre à jour la version dans la documentation
- Enrichir les stories ds-table et ds-select avec plus de variantes

---

## Tâches

- [x] [TOKEN] `_semantic.scss` | Ajouter tokens `$datepicker-*` sémantiques | Tokens définis au même niveau que `$pagination-*`, `$stepper-*` ✓ Déjà présents (lignes 429-458)

- [x] [TOKEN] `_semantic.scss` | Ajouter tokens `$ds-container-*` sémantiques | Tokens définis au même niveau que autres composants layout ✓ Déjà présents (lignes 460-470)

- [x] [TOKEN] `_custom.scss` | Compléter tokens container pour thème custom | Tokens `--ds-container-*` présents pour cohérence 3 thèmes ✓

- [~] [DOC] `CLAUDE.md` | Mettre à jour références version `1.0.0` → `1.2.4` | Skipped (responsabilité /orchestrator-ds)

- [x] [STORY] `ds-table.stories.ts` | Ajouter story "Themed" | Affichage Light/Dark/Custom côte à côte ✓ theme-custom ajouté

- [x] [STORY] `ds-select.stories.ts` | Ajouter story "Themed" | Déjà présent avec 3 thèmes ✓

- [x] [STORY] `ds-combobox.stories.ts` | Ajouter story "Themed" | Affichage Light/Dark/Custom côte à côte ✓ theme-custom ajouté

- [x] [DOC] `Tokens.mdx` | Ajouter section tokens ds-container et ds-datepicker | Tables avec exemples visuels ✓ Sections ajoutées + index mis à jour
