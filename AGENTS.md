# AGENTS.md — AI Agent Implementation Manual

> **Canonical reference for AI agents working in this repository.**
> This version reflects the **current codebase state**.

---

## 1. Purpose

This document is the source of truth for architecture, conventions, and implementation constraints.
Use it to keep feature work consistent and low-risk.

---

## 2. Stack Overview

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js (App Router) | 16.1.6 | Client pages/components use `"use client"` |
| UI Library | React | 19.2.3 | Functional components only |
| Language | TypeScript | 5.x | Strict mode enabled |
| Styling | Tailwind CSS | 4.x | Tokens in `src/app/globals.css` with `@theme inline` |
| Component Library | Ant Design | 6.3.0 | Imported directly from `antd`, themed via `ConfigProvider` |
| Icons | Phosphor Icons React | 2.1.x | `@phosphor-icons/react` only |
| Charts | Recharts | 3.7.x | Always use CSS variable colors + `ResponsiveContainer` |
| Theming | next-themes | 0.4.6 | `attribute="class"`, `defaultTheme="light"`, `enableSystem={false}` |
| Utilities | clsx + tailwind-merge | latest | via `cn()` in `@/lib/utils` |
| Fonts | Google Fonts | Inter + Playfair Display | Loaded in `src/app/layout.tsx` |

### Not in stack (do not introduce without explicit request)

- React Query / TanStack Query / SWR
- Zustand / Redux / Jotai
- react-hook-form / Zod
- TanStack Table
- i18n libraries
- Axios in feature services (project standard is native `fetch` / `httpClient`)

---

## 3. Project Architecture

```text
src/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx                 # "/" (executive consolidated dashboard)
│   ├── campanhas/page.tsx       # "/campanhas"
│   ├── crm/page.tsx             # "/crm"
│   ├── erp/page.tsx             # "/erp"
│   ├── agentes/page.tsx         # "/agentes"
│   ├── visual/page.tsx          # "/visual" (associative mode)
│   └── settings/page.tsx        # "/settings"
│
├── modules/
│   ├── dashboard/
│   │   ├── components/
│   │   ├── services/
│   │   ├── mock/
│   │   └── hooks/               # legacy duplicate `use-async-data.ts` (do not use for new code)
│   ├── campanhas/
│   │   ├── components/
│   │   ├── services/
│   │   └── mock/
│   ├── crm/
│   │   ├── components/
│   │   ├── services/
│   │   └── mock/
│   ├── erp/
│   │   ├── components/
│   │   ├── services/
│   │   └── mock/
│   └── agentes/
│       ├── components/
│       └── mock/
│
├── shared/
│   ├── engine/                  # associative engine (pure functions + context + hooks)
│   ├── hooks/                   # shared hooks (`use-async-data.ts`)
│   ├── ui/                      # reusable UI building blocks
│   ├── lib/                     # constants and formatters
│   ├── config/                  # navigation config
│   └── theme/                   # next-themes + Antd theme provider
│
├── services/http/client.ts      # fetch-based HTTP abstraction
├── lib/utils.ts                 # `cn()`
└── types/                       # domain types
```

### Architecture rules

- Organize by feature under `modules/<feature>/`.
- `modules/*` can depend on `shared/*`, but **should not depend on other modules directly**.
- App pages (`src/app/*`) orchestrate modules and shared components.
- Reusable UI belongs in `src/shared/ui`.
- Use `@/` alias imports only.
- Type definitions live in `src/types/*`.
- There is currently **no** `src/components/ui` layer in this repo.

---

## 4. Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Folders | kebab-case | `modules/campanhas/` |
| Component files | kebab-case.tsx | `crm-pipeline-chart.tsx` |
| Shared hook files | `use-*.ts` | `use-async-data.ts` |
| Services | kebab-case `-service.ts` | `erp-service.ts` |
| Mock exports | `MOCK_` + UPPER_SNAKE_CASE | `MOCK_CRM_KPIS` |
| Constants | UPPER_SNAKE_CASE | `MOCK_DELAY_MS` |
| Components/functions | named exports | `export function ERPRevenueChart` |

### Default export policy

- **Next.js pages/layouts**: default export (required by framework).
- Other components/services/hooks: prefer named exports.

---

## 5. Data & Service Pattern

### HTTP client

Location: `src/services/http/client.ts`

```ts
export async function httpClient<T>(endpoint: string, config?: RequestConfig): Promise<T>
```

- Uses native `fetch`.
- Uses `process.env.NEXT_PUBLIC_API_URL` base URL.
- Sets `Content-Type: application/json`.
- Throws `HTTP Error {status}: {statusText}` on non-OK responses.

### Services

Location: `src/modules/<feature>/services/*-service.ts`

- Export named async functions.
- Return typed promises from `@/types/*`.
- Current state: services read from `mock/data.ts` with simulated delays.
- Future API migration should keep function interfaces stable.

### Current gap

- `modules/agentes` still consumes mock data directly from page level and has no service layer yet.

---

## 6. Tables Pattern

Project does not use TanStack Table.
Tables are hand-built components (div/list based) with explicit loading state.

Reference files:

- `src/modules/dashboard/components/top-items-table.tsx`
- `src/modules/crm/components/crm-opportunities-table.tsx`
- `src/modules/erp/components/erp-transactions-table.tsx`
- `src/modules/campanhas/components/campanhas-campaigns-table.tsx`

Guidelines:

1. Accept typed rows and `loading?: boolean`.
2. Render skeleton rows in `loading` state.
3. Use `frame-card` container.
4. Use `cn()` for conditional classes.
5. Use formatters from `@/shared/lib/formatters`.

---

## 7. Form / Filter Pattern

No `react-hook-form` or schema library.

Current approach:

- Local state with `useState`.
- Components from `antd` (`Select`, `Button`, `Input`, `DatePicker`, etc.).
- Cross-filtering pages use associative hooks/context (`FilterBar`, `AssociativeProvider`).

---

## 8. i18n Pattern

- No i18n library.
- UI copy is in pt-BR.
- Root html language: `lang="pt-BR"`.
- Currency/date formatting uses helpers in `@/shared/lib/formatters` with `pt-BR` constants.

---

## 9. Styling & Theme Pattern

### Theme identities

- Light: **MicroRealismo** (`--background: #F4F4EF`, `--primary: #902828`, `--secondary: #BFAE8A`).
- Dark: **CriativosADS** (`--background: #121212`, `--card: #1E1F22`, `--primary: #B89050`).

Tokens live in `src/app/globals.css` (`:root` + `.dark`) and are mapped in `@theme inline`.

### Brand utilities

Defined in `globals.css`:

- `frame-card`
- `divider-soft`
- `cta-pill`
- `kpi-positive` / `kpi-negative`
- `filter-chip*` variants

### Color rules

- Prefer semantic classes/CSS variables (`text-success`, `var(--chart-1)`, etc.).
- Avoid hardcoded hex in feature components.

### Ant Design theme integration

- Theme handled by `src/shared/theme/antd-theme-provider.tsx` using `ConfigProvider`.
- Tokens are configured for light/dark and locale is `pt_BR`.
- Components are imported directly from `antd`.

### Icons

- Use `@phosphor-icons/react`.
- Do not introduce another icon set unless explicitly requested.

---

## 10. State Management Pattern

### Async state

Primary hook: `src/shared/hooks/use-async-data.ts`

```ts
export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };
```

Usage pattern:

```ts
const { state } = useAsyncData<Type[]>(useCallback(() => fetchSomething(), []));
const data = state.status === "success" ? state.data : [];
```

### Associative engine

Located in `src/shared/engine/`:

- `associative-engine.ts` (pure transforms)
- `associative-context.tsx` (provider + reducer)
- `hooks.ts` (consumer hooks)

Used by `/visual` page with `AssociativeProvider`.

### Current technical debt

- Duplicate hook exists at `src/modules/dashboard/hooks/use-async-data.ts`.
- Shared hook is the canonical one for new code.

---

## 11. Providers Hierarchy

From `src/app/layout.tsx`:

```tsx
<ThemeProvider>
  <AntdThemeProvider>
    <AppShell>{children}</AppShell>
  </AntdThemeProvider>
</ThemeProvider>
```

Notes:

- Associative provider is page-level where needed.
- Theme-dependent UI uses hydration-safe guard (`useSyncExternalStore`) in toggle/settings.

---

## 12. Do / Don't

### Do

- Add `"use client"` for hooks/state/browser APIs.
- Use `import type` for type-only imports.
- Use `@/` aliases.
- Use `cn()` for class merges.
- Use `frame-card` for card containers.
- Implement loading/success/error paths for async data.
- Keep text in pt-BR.
- Register new pages in `src/shared/config/navigation.ts`.

### Don't

- Don’t add new state/form/table/i18n libraries without explicit request.
- Don’t bypass service layer for data-fetching in new features.
- Don’t add module-to-module imports (move reusable pieces to `shared/`).
- Don’t hardcode visual tokens repeatedly when a semantic token/class exists.
- Don’t use `React.FC`.

---

## 13. New Feature Checklist

1. Add types in `src/types/<feature>.ts`.
2. Add mock data in `src/modules/<feature>/mock/data.ts`.
3. Add service file `src/modules/<feature>/services/<feature>-service.ts`.
4. Build components in `src/modules/<feature>/components/`.
5. Build page in `src/app/<feature>/page.tsx`.
6. Reuse/create shared UI in `src/shared/ui/` when needed by more than one feature.
7. Add navigation entry in `src/shared/config/navigation.ts`.

---

## 14. Output Contract for Agents

Every agent output should preserve:

| Requirement | Validation |
|---|---|
| Correct file placement | `types/`, `modules/*`, `shared/*` |
| No dependency drift | No new libs unless requested |
| Alias imports | Use `@/`, avoid deep relative imports |
| Type-safe code | `import type`, avoid `any` |
| Loading states | Present in async UI components |
| Visual consistency | `frame-card`, semantic tokens, chart vars |
| pt-BR UI | User-facing copy in pt-BR |
| Accessibility basics | `aria-label` on interactive controls |

