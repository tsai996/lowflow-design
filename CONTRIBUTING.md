# Contributing to lowflow-design

Thank you for helping improve `lowflow-design`. Bug reports, documentation fixes, translations, tests, and focused code changes are welcome in English or Chinese.

## Before you start

- Search existing issues before opening a new one.
- Use the bug or feature template and remove credentials or private workflow data.
- Report security problems privately as described in [SECURITY.md](SECURITY.md).
- Keep each pull request focused on one problem.

## Development setup

Use Node.js 22 and pnpm 10.34.4.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Before submitting a pull request, run:

```bash
pnpm type-check
pnpm build
pnpm audit --prod --audit-level high --registry=https://registry.npmjs.org
```

## Workflow changes

The recursively editable workflow tree in `src/views/flowDesign/` is the core of the project. Changes must preserve these rules:

- Every node ID is unique.
- A linear successor's `pid` equals its parent's ID.
- Condition branches point to their gateway and an exclusive gateway keeps at least two branches.
- The final exclusive branch remains the default condition.
- Deleting a node repairs links and removes validation errors for its descendants.
- Locale changes do not overwrite names edited by users.

When adding a node type, update its types, renderer, add menu, panel, defaults, traversal, deletion, validation, and both locale files.

## Pull requests

- Branch from `main`; do not commit directly to generated release or Pages branches.
- Add or update both `zh-CN` and `en-US` strings for user-visible text.
- Include screenshots for visible UI changes.
- Do not commit `dist/`, secrets, unrelated formatting, or generated declaration noise.
- Explain the root cause, user impact, and verification performed.

By contributing, you agree that your contribution is licensed under the repository's MIT License and that you will follow the [Code of Conduct](CODE_OF_CONDUCT.md).
