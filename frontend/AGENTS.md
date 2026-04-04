---

# Must Read
Before responding, first explore the project structure, then invoke relevant skills for documentation.
IMPORTANT: Prefer retrieval-led reasoning over pre-training-led reasoning.

---

# Frontend Agents Guidelines
This repository is a modern web application using Next.js 16.2.0, React 19.2.3, TypeScript 5, Tailwind CSS v4, and shadcn/ui.
You are operating inside the frontend subdirectory. Follow these instructions carefully.

## 1. Build, Lint, and Test Commands
The application provides standard Next.js lifecycle commands:
- **Development Server:** `npm run dev` or `npx next dev`
- **Build Application:** `npm run build` or `npx next build`
- **Production Server:** `npm run start` or `npx next start`
- **Linting:** `npm run lint` or `npx eslint`

### Running Tests
*Note: Currently, there is no test runner explicitly defined in the package.json scripts.*
When tests are added (e.g., using Vitest or Jest), the typical command for running a single test will be:
- **Vitest (Single Test):** `npm run test -- <path_to_test_file> -t "test name"`
- **Jest (Single Test):** `npx jest <path_to_test_file> -t "test name"`
Until tests are configured, manually verify components by rendering them in the Next.js development server and checking for console or hydration errors.

## 2. Code Style Guidelines

### Architecture & Conventions
- Use React Server Components (RSC) by default.
- Use `"use client"` directive only when necessary (e.g., for interactivity, hooks like `useState`, `useEffect`, or browser APIs).
- Keep Server Components stateless and focused on data fetching.
- Use Next.js App Router conventions (layout.tsx, page.tsx, loading.tsx, error.tsx).
- Leverage modern React 19 features where appropriate.

### TypeScript & Types
- Strict TypeScript must be utilized for all files. No `any` types unless absolutely necessary.
- Define explicit interfaces or type aliases for component props and complex data structures.
- Use Zod (`zod`) for runtime validation and type inference, especially for form schemas and API inputs.
- Prefer `type` over `interface` for simple unions and aliases.

### Styling & Components
- Use Tailwind CSS v4 for all styling.
- Utility classes should be merged safely. Use `cn()` utility (combining `clsx` and `tailwind-merge`) from `lib/utils.ts` for dynamic class names.
- Components must be functional and use modern hooks.
- For UI components, adhere to the `shadcn/ui` patterns and structure.
- Do not use arbitrary CSS modules or styled-components; stick entirely to Tailwind utility classes.

### Forms & Validation
- Use `react-hook-form` integrated with `@hookform/resolvers/zod` for complex form handling.
- Extract form schemas into separate constants or files for testability.

### Imports & Formatting
- Organize imports systematically:
  1. React and Next.js built-in modules
  2. Third-party packages (e.g., `lucide-react`, `zod`)
  3. Absolute imports for project internal files (e.g., `@/components/`, `@/lib/`)
  4. Relative imports
- Keep components small and focused. Break down large components into smaller, reusable pieces.
- Use descriptive naming. Event handlers should start with `handle` (e.g., `handleSubmit`), and boolean props should start with `is`, `has`, or `should`.

### Error Handling
- Use Next.js `error.tsx` boundaries for catching rendering errors in specific route segments.
- Implement try-catch blocks in Server Actions and async data fetching calls.
- Always provide user-friendly feedback in UI for form submission errors.

## 3. Available Skills
This workspace supports multiple intelligent skills. When requested to perform a task matching any of these domains, use the `skill` tool to load the specific domain instructions.

- **django-expert**: Expert Django backend development guidance (models, views, ORM, DRF).
- **find-skills**: Discover and install agent skills based on required capabilities.
- **next-best-practices**: Next.js best practices, file conventions, RSC, data fetching, routing.
- **shadcn**: Managing shadcn/ui components (adding, styling, composing, presets).
- **tailwind-design-system**: Building scalable design systems with Tailwind CSS v4.
- **typescript-advanced-types**: Advanced TS system guidance (generics, conditional/mapped types).
- **vercel-react-best-practices**: React and Next.js performance optimization and guidelines.

---

<!-- SKILLS-INDEX-START -->
[Skills Index]|root: ./.agents/skills/|STOP. What you remember is WRONG for this project. Always search docs and read before any task.|If can't find docs, invoke relevant skills|
django-expert|Django backend, ORM, API, testing
find-skills|Discover and install skills
next-best-practices|Next.js, RSC, App Router, metadata
shadcn|shadcn/ui, components, presets
tailwind-design-system|Tailwind v4, tokens, ui patterns
typescript-advanced-types|generics, conditional types, mapped types
vercel-react-best-practices|React/Next.js performance optimization
<!-- SKILLS-INDEX-END -->

---

## 4. Operational Best Practices
- **Retrieval First:** Always explore existing code before writing new code.
- **Step-by-Step:** Follow the "Understand, Plan, Implement, Verify" workflow.
- **Clean Commits:** If committing, write clear, concise commit messages.
- **Context Awareness:** Ensure new additions fit seamlessly into the existing repository structure.