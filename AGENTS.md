# AGENTS.md

## Project overview

`lowflow-design` is a low-code workflow designer built with Vue 3, TypeScript, and Vite. It uses Element Plus for UI, Pinia for state, UnoCSS and SCSS for styling, and `vite-plugin-mock` for local user and role APIs.

The core is not a conventional form page. It is the recursively editable workflow tree in `src/views/flowDesign/`. Understand the node structure and parent-child relationships before making changes so a UI fix does not corrupt the workflow JSON.

## Common commands

CI uses pnpm, so use pnpm by default. The repository also contains `package-lock.json`; do not refresh both lockfiles.

```bash
pnpm install
pnpm dev
pnpm type-check
pnpm build
pnpm build:test
```

- `pnpm build` runs both type checking and the production build.
- `pnpm lint` includes `--fix` and rewrites files. Run it only when you intend to review those changes.
- `pnpm format` rewrites all of `src/`; do not run it for an isolated change.
- There is currently no automated test script. Do not add a test framework for one small change; at minimum, run the type checker and manually verify the affected workflow-editing path.

## Directory responsibilities

- `src/views/home/index.vue`: demo page and `FlowDesign` integration example.
- `src/views/flowDesign/index.vue`: designer state, node insertion/deletion, zoom, validation, and provided context.
- `src/views/flowDesign/nodes/`: node types, recursive rendering, and node cards.
- `src/views/flowDesign/panels/`: node property drawer and type-specific configuration panels.
- `src/components/`: user/role selectors, advanced filters, dynamic form rendering, and SVG icons.
- `src/api/` and `src/mock/`: Axios wrapper, business APIs, and local mocks.
- `src/languages/`: `zh-CN` and `en-US` translations.
- `src/stores/`: Pinia stores, currently centered on persisted language state.
- `src/styles/`: global styles and Element Plus theme overrides.

## Vue and TypeScript conventions

- Use the Composition API, `<script setup lang="ts">`, and typed `defineProps`/`defineEmits`/`defineModel` contracts.
- Keep SFC sections ordered as `<script>`, `<template>`, `<style>`, and use PascalCase component filenames.
- Keep source state minimal, derive values with pure `computed` properties, and reserve `watch` for side effects.
- Use props down / events up for ordinary components. The existing workflow designer contract intentionally mutates the supplied `process` and active node objects; do not replace that state model during unrelated work.
- Keep pure functions as utilities. Put reusable stateful or lifecycle-aware logic in `src/hooks/useXxx.ts`.
- Prefer the `@/` alias. `Render` and `SvgIcon` already use TSX; use `.vue` SFCs for other UI by default.
- Vite plugins auto-import/register Vue and Vue Router APIs, Element Plus APIs, and components under `src/components/*/*`. Continue to import feature-local `flowDesign` components explicitly.
- Do not manually edit `src/typings/auto-imports.d.ts` or `src/typings/components.d.ts`; Vite plugins generate them.
- Do not add a dependency for work that a few lines of native TypeScript, Vue, or an existing dependency can handle.

## Workflow model invariants

Treat `src/views/flowDesign/nodes/type.ts` as the source of truth for workflow types:

- Every node `id` must be unique across the whole tree.
- Linear successors use `next`, and the successor's `pid` must equal the current node's `id`.
- Branch nodes store condition nodes in `branches`; each condition node's `pid` points to its gateway.
- An exclusive gateway must retain at least two condition branches, with the final branch acting as the default condition. Preserve this meaning when inserting, sorting, or deleting branches.
- When deleting a node, repair `next`/`pid` links and remove validation errors for that node and its descendants from `nodesError`.
- Default names for new nodes participate in locale switching. Once a user edits a name, changing the locale must not overwrite it.

When adding a node type, check at least:

1. The union and data interfaces in `nodes/type.ts`.
2. The component map in `nodes/TreeNode.vue` and entry in `nodes/Add.vue`.
3. The node component and its validation logic.
4. The panel map in `panels/index.vue` and the matching panel.
5. Creation defaults, deletion, traversal, and naming behavior in `flowDesign/index.vue`.
6. All user-visible strings in both locale files.

## UI, styling, and internationalization

- Prefer existing UnoCSS shortcuts for simple layouts. Put complex component styles in the same SFC using `scoped lang="scss"`.
- Only themes, resets, and Element Plus overrides belong in `src/styles/`. Use `:deep()` sparingly.
- Route all new user-visible text through `vue-i18n` and update both `zh-CN` and `en-US`.
- Use stable primitive `:key` values for lists. Do not put `v-for` and `v-if` on the same element.
- Never render unsanitized external or user content with `v-html`.

## APIs and environment variables

- Call business APIs through the shared Axios instance in `src/api/index.ts` to preserve common error notifications and the `ResultData<T>` response shape.
- Development and test API URLs come from `VITE_API_URL`. Every `VITE_` variable is exposed to the client, so never store secrets in one.
- When changing user or role APIs, update or verify `src/mock/` so local selectors continue to work.

## Definition of done

1. Keep the change small and preserve the workflow model invariants above.
2. Run `pnpm type-check`. Also run `pnpm build` for changes involving builds, routing, styles, or Vite configuration.
3. Manually verify the affected node insertion, editing, deletion, branch ordering, read-only mode, locale switching, or download path.
4. Review `git diff`; do not commit `dist/`, environment secrets, unrelated formatting, or generated-file noise.
