# AGENTS.md — Schedula Codebase Guide

This file provides orientation for agentic coding agents working in this repository.

---

## Repository Layout

```
schedula/                   # Workspace root
├── config/                 # Django project settings (base, local, production)
│   └── settings/
│       ├── base.py         # Base settings (shared)
│       ├── local.py        # Development settings
│       └── production.py   # Production settings
├── schedula_core/          # Main Django app
│   ├── api/
│   │   ├── models/         # Model definitions
│   │   ├── serializers/    # DRF serializers
│   │   ├── services/       # Business logic (conflict detection, etc.)
│   │   ├── views/          # Viewsets and API views
│   │   └── urls.py         # API URL routing
│   ├── models.py           # Re-export file for models
│   └── tests.py            # Test cases
├── frontend/               # Next.js 16 app (App Router)
│   └── src/
│       ├── app/            # Route segments (layout.tsx, page.tsx, globals.css)
│       │   ├── login/      # Auth pages
│       │   ├── register/
│       │   └── meeting/    # Meeting feature routes
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

---

## Design System

The frontend follows the **"Midnight Meridian"** design system documented in `frontend/DESIGN.md`. Key principles:

- **Color Palette:** "Slate & Sapphire" foundation — never use pure black (#000000), always use `slate-900` or `slate-800`
- **Typography:** Manrope font exclusively, hierarchy enforced through weight (Bold 700/Extrabold 800)
- **Architecture:** Card-First with tonal layering
- **"No-Line" Rule:** Sectioning via background value shifts (`surface` → `surface-container` → `surface-container-high`), not borders
- **Border Radius:** `rounded-xl` (1rem) for major containers, `rounded-lg` (0.75rem) for internal components
- **Shadows:** `shadow-sm` for standard cards, `shadow-lg` (with blue tint) for FABs/high-priority elements
- **Text Alignment:** Always left-align text in dashboard cards — never center-align

---

## Form Validation Patterns

### Frontend (Zod + React Hook Form)

```tsx
// Schema definition
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Form setup
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
});

// Error display pattern
{fieldState.error && (
  <p className="text-xs font-medium text-destructive">
    {fieldState.error.message}
  </p>
)}
```

### Backend (DRF Serializers)

```python
# Single-field validation
def validate_end_time(self, value):
    if value and str(value) < self.initial_data.get("start_time"):
        raise serializers.ValidationError("End time cannot be before Start time.")
    return value

# Cross-field validation
def validate(self, attrs):
    if attrs.get("start_time") and attrs.get("end_time"):
        # Cross-field logic here
        pass
    return attrs
```

---

## Agent Behavior Rules

### Debugging & Problem-Solving

1. **Diagnose before prescribing.** Identify the single root cause before suggesting any fix. Do not offer a list of speculative changes.
2. **Understand existing patterns first.** Before changing code, understand *why* it was written that way. If a layout uses absolute positioning, a sizing element, or an unusual structure, assume there's a reason and figure it out before touching it.
3. **Minimal fixes only.** Change only what is broken. If one CSS property is wrong, fix that property—do not refactor the entire component structure.
4. **Never guess.** If you don't understand how something works, say so and ask clarifying questions. Do not suggest changes based on assumptions.
5. **One problem, one fix.** A single bug should have a single, targeted fix. If you find yourself suggesting 5+ changes for one issue, stop and re-evaluate—you probably don't understand the problem.
6. **Avoid overcomplicating.** Prefer the simplest solution. If the fix is "change `w-dvh` to `w-full`", say that. Do not turn it into a structural refactor.
