---
name: wax-admin-development
description: "Use when: extending wax-admin, adding admin modules, creating admin pages, wiring admin routes, implementing catalog/orders/clients/content features, or connecting services in wax-admin while preserving the mirrored client architecture."
---

# WAX Admin Development

## Goal

Grow `wax-admin` without breaking the architecture mirrored from `wax-client`.

## Read First

Before making large changes, review `docs/wax-admin-development-guide.md`.

## Core Rules

1. Keep `pages` thin.
2. Put real domain logic inside `features/<domain>`.
3. Put API access and transport concerns inside `services`.
4. Keep reusable cross-domain hooks in `lib`.
5. Reuse the base visual system from `src/app/index.css` before adding new style layers.

## Expected Folder Use

- `src/features/<domain>/components`: domain UI blocks.
- `src/features/<domain>/hooks`: domain state and queries.
- `src/features/<domain>/api`: domain API calls if you want module-local access wrappers.
- `src/features/<domain>/types`: domain-local typing.
- `src/pages`: route entry screens that compose feature pieces.
- `src/routes`: route config, guards and wrappers.
- `src/services`: shared clients, DTO mapping, transport utilities.

## When Adding a New Admin Screen

1. Add or update the path in `src/routes/routePaths.ts`.
2. Create the page in `src/pages`.
3. If the page has meaningful business behavior, create a feature module instead of placing everything inside the page.
4. Register the route in `src/routes/router.tsx`.
5. Update navigation config only if the screen should be visible in the main menu.

## Avoid

- Putting fetch logic directly in layouts.
- Using `AdminLayout` as a storage place for screen-specific state.
- Growing `src/app/index.css` with one-off hacks for every page.
- Mixing API calls, mapping logic and rendering in a single component.

## Good Outcome

The admin keeps a predictable structure, new modules are easy to find, and future teammates can connect real endpoints without refactoring the whole app shell.