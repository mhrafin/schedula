# AGENTS.md — Schedula Frontend

This file provides orientation for agentic coding agents working in the Next.js frontend. For backend (Django) guidance and repository-wide context, see the root `../AGENTS.md`.

---

## Quick Reference

| Task | Command |
|------|---------|
| Dev server | `npm run dev` → http://localhost:3000 |
| Production build | `npm run build` |
| Lint | `npm run lint` |
| Lint specific file | `npx eslint src/path/to/file.tsx` |
| Type-check | `npx tsc --noEmit` |

**No test framework configured.** Add Vitest or Jest when needed.

---

## Directory Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (Manrope font, globals)
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Design tokens, Tailwind theme
│   │   ├── login/page.tsx      # Auth pages
│   │   ├── register/page.tsx
│   │   └── meeting/            # Meeting feature routes
│   │       └── create/page.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── ...
│   │   └── meeting/            # Feature-specific components
│   │       └── create-form.tsx
│   └── lib/
│       └── utils.ts            # cn() helper
├── components.json             # shadcn/ui config (new-york style)
├── next.config.ts              # React Compiler enabled
├── postcss.config.mjs          # Tailwind v4 via PostCSS
├── tsconfig.json               # Strict mode, @/ alias
└── eslint.config.mjs           # Flat config: next/core-web-vitals + typescript
```

---

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** with React Compiler (no manual `useMemo`/`useCallback`)
- **TypeScript 5** (strict mode)
- **Tailwind CSS v4** (PostCSS, no `tailwind.config.js`)
- **shadcn/ui** (new-york style) + **Radix UI**
- **Lucide React** for icons
- **Zod + React Hook Form** for form validation

---

## TypeScript

- **Strict mode is on.** No `any`, no implicit `any`, no non-null assertions without justification.
- Import types with `type` keyword:
  ```tsx
  import { type VariantProps } from "class-variance-authority"
  ```
- Derive prop types from `cva`:
  ```tsx
  VariantProps<typeof buttonVariants>
  ```
- Extend native elements via `React.ComponentProps<"element">`:
  ```tsx
  function Input({ className, ...props }: React.ComponentProps<"input">) {
  ```
- Use `Readonly<{ children: React.ReactNode }>` for layout props.
- Define types inline or co-located — no dedicated `types/` directory.

---

## Imports

- **Always use `@/` alias** for imports from `src/`. Never mix with `../` relative imports.
- **No barrel `index.ts` files.** Import from full file paths.
- **Group order:**
  1. React / Next.js framework imports
  2. Third-party library imports  
  3. Internal `@/` alias imports

**Correct:**
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
```

**Incorrect:**
```tsx
import { cn } from "../lib/utils"  // Don't use relative paths
```

---

## Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| React component | PascalCase | `CreateMeetingForm` |
| Page component | PascalCase | `Page`, `LoginPage` |
| Component file | kebab-case | `create-form.tsx` |
| Route folder | lowercase | `meeting/create/` |
| CSS custom property | `--kebab-case` | `--color-background` |
| Utility file | kebab-case | `utils.ts` |

---

## Components

### Server vs Client Components

- **Server Components by default.** Only add `"use client"` when needed:
  - Using `useState`, `useEffect`, or other hooks
  - Using event handlers (`onClick`, `onChange`, etc.)
  - Using browser APIs

### Component Patterns

- **Function components only** — no class components.
- **React Compiler is enabled.** Do NOT manually add `useMemo` or `useCallback`.
- Use `cva` for variant-based className management.
- Use `cn()` (`clsx` + `tailwind-merge`) for all className merging.
- Follow shadcn/ui `asChild` / Radix `Slot` pattern for polymorphic rendering.
- Add `data-slot="<name>"` to root elements of UI primitives.
- Spread remaining props onto the underlying element.

**Example component structure:**
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "default-classes",
    },
    size: {
      default: "size-classes",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

function Component({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof componentVariants>) {
  return (
    <div
      data-slot="component"
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Component, componentVariants }
```

### Icon Placement in Buttons

Icons inside `Button` (or other flex containers) should use the container's flex layout with `gap`. Do NOT use absolute positioning for inline icons.

**Correct:**
```tsx
<Button>
  <SendHorizontal className="size-4 flex-none" />
  Submit
</Button>
```

**Incorrect:**
```tsx
<Button className="pl-10 relative">
  <SendHorizontal className="absolute left-3" />
  Submit
</Button>
```

For input icons that should overlay the field, use absolute positioning with padding:
```tsx
<div className="relative">
  <Video className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
  <Input className="pl-10" placeholder="..." />
</div>
```

---

## Styling

### Tailwind CSS v4

- Configured via PostCSS (`postcss.config.mjs`), not `tailwind.config.js`.
- Design tokens are CSS custom properties in `src/app/globals.css` under `@theme`.
- **Never write raw hex/rgb colors.** Use CSS variables or Tailwind utilities.

### Design System: Midnight Meridian

See `DESIGN.md` for full details. Key rules:

**Color:**
- Never use pure black (`#000000`). Use `slate-900` or `slate-800`.
- Surface hierarchy: `surface` → `surface-container` → `surface-container-high`

**"No-Line" Rule:**
- Section content via background shifts, not borders.
- Borders allowed only for internal component nesting or ghost boundaries (`outline-variant`).

**Border Radius:**
- `rounded-xl` (1rem) for major containers
- `rounded-lg` (0.75rem) for internal components

**Shadows:**
- `shadow-card` (shadow-sm) for standard cards
- `shadow-elevated` (shadow-lg with blue tint) for FABs/high-priority

**Typography:**
- Manrope font exclusively
- Hierarchy via weight: `font-bold` (700), `font-extrabold` (800)
- Always left-align text in dashboard cards

**Custom Utilities:**
```css
.text-display      /* 24px Bold - Page titles */
.text-body-large   /* 16px Semibold - Card titles */
.text-body-standard /* 14px Medium - Descriptions */
.text-label        /* 12px Bold uppercase - Timestamps */
.bg-surface-container
.bg-surface-container-high
.shadow-card
.shadow-elevated
.bg-gradient-primary
```

---

## Form Validation

### Pattern: Zod + React Hook Form

```tsx
"use client";

import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Handle submission
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...field}
              id={field.name}
              aria-invalid={!!fieldState.error}
            />
            {fieldState.error && (
              <p className="text-xs font-medium text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </form>
  );
}
```

---

## Adding shadcn/ui Components

Add new primitives via CLI — do not write from scratch:

```bash
npx shadcn add button
npx shadcn add input
npx shadcn add dialog
```

Components are installed to `src/components/ui/`. Customize after installation if needed.

---

## ESLint

- Flat config at `eslint.config.mjs`
- Extends `next/core-web-vitals` and `next/typescript`
- Do not disable rules without a comment explaining why

---

## Error Handling

- No `error.tsx` boundaries exist yet — add as features grow.
- Validate all API responses before rendering.
- Use type guards; do not assume data shape.

---

## Agent Behavior Rules

1. **Diagnose before prescribing.** Find the root cause before suggesting fixes.
2. **Understand existing patterns.** If code uses absolute positioning or unusual structure, understand why before changing it.
3. **Minimal fixes only.** Fix what's broken — don't refactor surrounding code.
4. **Never guess.** Ask clarifying questions rather than making assumptions.
5. **One problem, one fix.** If suggesting 5+ changes for one issue, re-evaluate.
6. **Prefer simplicity.** The simplest solution is usually correct.
