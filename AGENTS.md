# AGENTS.md — Schedula Codebase Guide

This file provides orientation for agentic coding agents working in this repository.

---

## Repository Layout

```
schedula/                   # Workspace root
├── config/                 # Django project settings (base, local, production)
├── schedula_core/          # Main Django app (models, views, serializers, services)
├── frontend/               # Next.js 16 app (App Router)
│   └── src/
│       ├── app/            # Route segments (layout.tsx, page.tsx, globals.css)
│       ├── components/
│       │   ├── ui/         # shadcn/ui primitives (Button, Input, Label, …)
│       │   └── meeting/    # Feature-level components
│       └── lib/
│           └── utils.ts    # cn() helper (clsx + tailwind-merge)
├── manage.py
├── Pipfile / Pipfile.lock  # Python deps (pipenv)
└── db.sqlite3              # SQLite dev database
```

---

## Frontend Commands

All commands run from the `frontend/` directory.

| Task | Command |
|------|---------|
| Dev server | `npm run dev` → http://localhost:3000 |
| Production build | `npm run build` |
| Start production | `npm run start` |
| Lint (entire project) | `npm run lint` |
| Type-check only | `npx tsc --noEmit` |

**No test framework is configured yet.** To add one, install and configure Vitest or Jest.

---

## Backend Commands

All commands run from the workspace root (`schedula/`).

| Task | Command |
|------|---------|
| Dev server | `pipenv run python manage.py runserver` |
| Run all tests | `pipenv run python manage.py test` |
| Run a single test class | `pipenv run python manage.py test schedula_core.tests.MyTestClass` |
| Run a single test method | `pipenv run python manage.py test schedula_core.tests.MyTestClass.my_test_method` |
| Migrations | `pipenv run python manage.py makemigrations && pipenv run python manage.py migrate` |
| Django shell | `pipenv run python manage.py shell` |

---

## Tech Stack

**Frontend:** Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4 · shadcn/ui (new-york style) · Radix UI · Lucide React · React Compiler (enabled) · Zod + React Hook Form (validation)

**Backend:** Python 3.12 · Django 6 · Django REST Framework · Djoser (token auth) · drf-spectacular (OpenAPI) · django-cors-headers · icalendar · SQLite (dev)

---

## Frontend Code Style

### TypeScript

- **Strict mode is on** (`"strict": true` in `tsconfig.json`). No `any`, no implicit `any`, no non-null assertion shortcuts.
- Import types with the `type` keyword: `import { type VariantProps } from "class-variance-authority"`.
- Derive prop types from `cva` definitions: `VariantProps<typeof buttonVariants>`.
- Extend native element props via `React.ComponentProps<"input">` rather than writing custom interfaces.
- Use `Readonly<{ children: React.ReactNode }>` for layout props.
- No dedicated `types/` directory — define types inline or co-located with their module.

### Imports

- Use the `@/` path alias for all imports from `src/` (configured in `tsconfig.json`).
- Do **not** mix `@/` alias imports with relative `../` imports in the same file. Prefer `@/` everywhere.
- No barrel `index.ts` files — import from the full file path.
- Group order (no blank lines between groups is acceptable in shadcn primitives; feature files may add them for clarity):
  1. React / Next.js framework imports
  2. Third-party library imports
  3. Internal `@/` alias imports

### Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| React component (function) | PascalCase | `CreateMeetingForm` |
| Next.js page component | PascalCase | `Page` (not lowercase `page`) |
| Component file | kebab-case | `create-form.tsx` |
| Route segment folder | lowercase | `meeting/create/` |
| CSS custom property | `--kebab-case` | `--color-background` |
| Utility/lib file | kebab-case | `utils.ts` |

### Components

- **Function components only** — no class components.
- **Server Components by default.** Add `"use client"` only when using browser APIs, event handlers, or React hooks.
- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`). Do **not** manually add `useMemo` or `useCallback` — the compiler handles memoization.
- Use `cva` (class-variance-authority) for variant-based className management.
- Use the `cn()` utility (`clsx` + `tailwind-merge`) for all className merging.
- Follow the shadcn/ui `asChild` / Radix `Slot` pattern for polymorphic rendering.
- Add `data-slot="<name>"` attributes to root elements of shadcn primitives (e.g., `data-slot="button"`) for CSS targeting.
- Spread remaining props onto the underlying element: `<button {...props} />`.
- **Icon Placement in Buttons**: Icons inside `Button` components (or other flex containers) should be positioned inline using the container's standard flex layout (e.g., using `gap-x`, `flex-none`, etc.). Do not incorrectly assume icons should be absolutely positioned just because of leftover padded classes (like `pl-10`) or surrounding container elements. Prefer stripping out crufty positioning classes over forcing absolute positioning on standard inline icons.

### Styling

- **Tailwind CSS v4** — configured via PostCSS (`postcss.config.mjs`), not a `tailwind.config.js`.
- Design tokens are CSS custom properties defined in `src/app/globals.css` under `@theme`.
- Never write raw hex/rgb colors in JSX — reference CSS variables or Tailwind utility classes.
- Use `tw-animate-css` utilities for animations rather than custom keyframes where possible.

### Error Handling (Frontend)

- No `error.tsx` or error boundary patterns exist yet — add them as features grow.
- Validate all external data (API responses) before rendering; do not assume shape without type guards.

---

## Backend Code Style

### Python / Django

- **Snake_case** for all Python files, folders, functions, variables, and model fields.
- **PascalCase** for classes (models, serializers, viewsets).
- Model field names and URL patterns: `kebab-case` for URL slugs, `snake_case` for Python identifiers.
- Keep business logic in `schedula_core/api/services/` — views should delegate to service functions.
- Keep `models.py` at the app root as a re-export file; define actual model code in `api/models/`.

### Serializers & Validation

- Use `serializers.ValidationError` with a human-readable message for field-level and cross-field errors.
- Implement `validate_<field>()` for single-field validation and `validate()` for cross-field logic.
- Use `get_object_or_404` in views instead of bare `Model.objects.get()`.

### Error Handling (Backend)

- Let DRF's default exception handler format validation errors.
- Raise `serializers.ValidationError` early in validation methods rather than returning `None` with side effects.
- Do not silence email errors (`fail_silently=False`).

---

## Project-Specific Conventions

- **No Prettier configured** — formatting is not enforced by tooling. Maintain consistency with surrounding code when editing a file.
- **ESLint flat config** (`eslint.config.mjs`) extends `next/core-web-vitals` and `next/typescript`. Do not disable ESLint rules without a comment explaining why.
- **shadcn/ui components** live in `src/components/ui/`. Add new primitives via `npx shadcn add <component>` rather than writing them from scratch.
- **No state management library** is installed. Use React's built-in `useState`/`useReducer`/Context for local/shared state until complexity justifies adding one.
- **CORS** is configured to allow `http://localhost:3000` — keep the frontend dev server on that port.
- The `@/` alias resolves to `frontend/src/`. Always use it for intra-frontend imports.
