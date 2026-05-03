---
name: conventions
description: Coding conventions for this project — component patterns, styling, state management boundaries, formatting. Read before writing any code.
---

# Conventions

## Components

- Functional components only, no class components
- Prefer arrow functions for handlers and helpers. Page/route components can stay as `function` declarations so the `Route` export can sit at the top of the file
- Named exports for components; route files export a `Route` constant from `createFileRoute(...)`
- Tests co-located: `Component.test.tsx` next to `Component.tsx`

## Routing

- File-based routing with TanStack Router. Every route is a folder with `index.tsx` inside — folder path becomes URL path
- Route-local components, hooks, and tests live in the route folder. Shared components go in `src/components/`
- Use `<Link>` from `@tanstack/react-router` for internal navigation, never `<a>`
- `src/routeTree.gen.ts` is generated — never edit it by hand

## Styling

- Tailwind utility classes only — no custom CSS, no inline styles
- Shadcn semantic colors (`bg-primary`, `text-muted-foreground`) — never raw colors like `bg-blue-500`
- Shadcn/ui components live in `src/components/ui/`. Add more with `pnpm dlx shadcn@latest add <name>`

## State Management

- Server data → TanStack Query. Client-only state → Zustand. Never mix.
- Never duplicate server data into Zustand stores
- One Zustand store per domain in `src/stores/`
- API fetch functions live in `src/lib/api.ts`
- Never `useEffect` + `fetch` — always `useQuery`
- Invalidate related queries after mutations, don't manually update cache

## Naming

- Booleans are prefixed: `isFavorite`, `isLoading`, `hasErrors`, `canEdit`, `shouldRender`. Never bare nouns like `favorite` or `loading`.

## Formatting

- Biome: tab indentation, double quotes
- Run `pnpm check` before committing
