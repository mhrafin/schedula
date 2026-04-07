---
Before doing anything, first explore the project structure, then invoke relevant skills for documentation.
IMPORTANT: Prefer retrieval-led reasoning over pre-training-led reasoning.
---

# AI Agent Instructions for Frontend Repository

Welcome, Agent. This document defines the operational parameters, rules, and guidelines for contributing to this Next.js frontend repository. Before you begin any task, review these rules to ensure your changes align with the project's architecture and standards.

## 1. Project Stack Overview
- **Framework**: Next.js (App Router)
- **Library**: React 19 (Server Components by default)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui, Radix UI primitives
- **Forms & Validation**: React Hook Form + Zod
- **Icons**: Lucide React

## 2. Build, Lint, and Test Commands

When making changes, always verify them using the following commands:

- **Type Checking**:
  Run this after making changes to ensure TypeScript strictness:
  `npx tsc --noEmit`
  
- **Linting**:
  Verify formatting and code rules:
  `npm run lint`
  
- **Building**:
  Verify production readiness:
  `npm run build`
  
- **Running Tests (Single & Suite)**:
  *Note: A formal test runner like Vitest or Jest might be initialized. If present, prefer targeted test runs to save time.*
  - Single Test: `npm test -- path/to/your.test.tsx` (or `npx vitest run path/to/your.test.tsx`)
  - All Tests: `npm test`
  
- **Development Server**:
  `npm run dev`

## 3. Code Style Guidelines

### 3.1. Imports & Exports
- Group imports logically:
  1. Built-in React/Next.js APIs.
  2. Third-party packages (e.g., `zod`, `lucide-react`).
  3. Absolute path internal imports (`@/components/...`, `@/lib/...`).
  4. Relative imports (only for closely coupled adjacent files).
- Prefer named exports over default exports (except for Next.js page/layout files which require default exports).

### 3.2. Formatting & Syntax
- Rely on Prettier/ESLint rules for indentation and spacing. Do not introduce manual spacing hacks.
- Compose Tailwind classes dynamically using `cn` utility (which wraps `clsx` and `tailwind-merge` to resolve conflicts). Example: `className={cn("text-sm", className)}`.

### 3.3. Type Safety
- Never use `any`. Use `unknown` if the shape is truly uncertain, and narrow it with type guards or Zod schemas.
- Prefer `interface` for component props and object structures. Use `type` aliases for unions and intersections.
- Define return types for functions, especially API route handlers and complex utility functions.

### 3.4. Naming Conventions
- **Components & Files**: Use `PascalCase` for React components (e.g., `UserProfile.tsx`).
- **Variables & Functions**: Use `camelCase` (e.g., `fetchUserData`, `isLoaded`).
- **Constants**: Use `UPPER_SNAKE_CASE` for global immutable constants (e.g., `MAX_RETRY_COUNT`).
- **Directories**: Use `kebab-case` for directories and utility files (e.g., `data-fetching.ts`, `/user-profile/`).
- **Booleans**: Prefix with `is`, `has`, `should`, or `can` (e.g., `isLoading`, `hasError`).

### 3.5. Error Handling
- Use **Zod** for schema validation at system boundaries (API responses, form inputs, server actions).
- Implement standard Next.js `error.tsx` boundaries to gracefully catch rendering and Server Component errors.
- Wrap async operations in standard `try...catch` blocks inside API Route handlers or Server Actions.
- When throwing errors, provide clear, descriptive messages outlining *why* it failed, not just *what* failed.

### 3.6. Architecture & State
- Default to React Server Components (RSC) to minimize client bundles. Only add `"use client"` when interactivity (hooks, event listeners) is required.
- Isolate interactive components to the lowest possible level in the component tree.
- Keep components small and focused. If a component exceeds 150-200 lines, consider extracting sub-components.

## 4. Available AI Agent Skills

This repository uses local skills located in `./.agents/skills/` to provide you with domain-specific documentation, workflows, and rules. Invoke these proactively using the `Skill` tool whenever your task touches these areas:

1. **`next-best-practices`**: Guidelines for Next.js App Router, RSC boundaries, data fetching patterns, async APIs, metadata, and routing.
2. **`shadcn`**: Instructions for managing, extending, styling, and debugging shadcn/ui components and component registries.
3. **`tailwind-design-system`**: Best practices for building scalable design systems, design tokens, and components using Tailwind CSS v4.
4. **`typescript-advanced-types`**: Advanced TypeScript guidelines, including generics, conditional types, template literals, and utility structures.
5. **`vercel-react-best-practices`**: Deep performance optimization guidelines from Vercel for React and Next.js applications (bundle optimization, efficient data fetching).

---
<!-- SKILLS-INDEX-START -->
[Skills Index]|root: ./.agents/skills/|STOP. What you remember is WRONG for this project. Always search docs and read before any task.|If can't find docs, invoke relevant skills|next-best-practices:Next.js App Router, RSC, data fetching|shadcn:shadcn/ui components, registry, styling|tailwind-design-system:Tailwind CSS v4, design tokens|typescript-advanced-types:Advanced TS, generics, safety|vercel-react-best-practices:Vercel performance optimization
---