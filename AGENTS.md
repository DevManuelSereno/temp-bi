# AGENTS.md — AI Agent Implementation Manual

> **Canonical reference for AI agents (Warp, Antigravity, Claude Code, etc.).**
> Every instruction below is derived from the actual codebase. Follow exactly.

---

## 1. Purpose

This document is the single source of truth for any AI agent working on this project.
It describes the real architecture, patterns, conventions, and constraints found in the codebase.
Use it to implement new features with maximum consistency, minimum risk, and total alignment.

---

## 2. Stack Overview

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js (App Router) | 16.x | RSC enabled, `"use client"` where needed |
| UI Library | React | 19.x | No class components — functions only |
| Language | TypeScript | 5.x | Strict mode enabled |
| Styling | Tailwind CSS | 4.x | `@theme inline` with CSS variables |
| Component Kit | shadcn/ui | `new-york` style, base `stone` | Installed via `shadcn` CLI, CSS variables enabled |
| Icons | Lucide React | latest | Only icon library allowed |
| Charts | Recharts | 3.x | CSS variable colors, `ResponsiveContainer` always |
| Theming | next-themes | 0.4.x | `attribute="class"`, `defaultTheme="light"` |
| CSS Merge | tailwind-merge + clsx | via `cn()` | `@/lib/utils` |
| Fonts | Google Fonts | Inter (body) + Playfair Display (headings) | Loaded via `next/font/google` |

### Not in the stack (do NOT introduce)

- React Query / TanStack Query / SWR
- Zustand / Redux / Jotai / any state management library
- react-hook-form / Zod (not yet adopted)
- TanStack Table (not yet adopted)
- Axios (project uses native `fetch` via `httpClient`)
- CSS Modules / Styled Components / Emotion
- i18n libraries (not yet adopted — UI is hardcoded in pt-BR)

---

## 3. Project Architecture

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (providers, fonts, AppShell)
│   ├── page.tsx                  # "/" — Executive dashboard (AssociativeProvider)
│   ├── globals.css               # Theme tokens, base layer, brand utilities
│   ├── visual/page.tsx           # "/visual" — Full visual dashboard (AssociativeProvider)
│   └── settings/page.tsx         # "/settings" — Theme & display preferences
│
├── modules/                      # Feature modules (domain-scoped)
│   └── dashboard/
│       ├── components/           # Domain-specific components
│       │   ├── acquisition-chart.tsx
│       │   ├── financial-chart.tsx
│       │   ├── funnel-chart.tsx
│       │   ├── top-items-table.tsx
│       │   ├── insights-list.tsx
│       │   ├── executive-row.tsx  # KPI grid (consumes associative engine)
│       │   └── action-center.tsx  # Prioritized insights panel
│       ├── services/             # Data-fetching service layer
│       └── mock/                 # Mock data (temporary, will be replaced by API)
│
├── shared/                       # Cross-module reusable code
│   ├── engine/                   # Associative BI engine
│   │   ├── associative-engine.ts # Pure functions (filter, aggregate, derive)
│   │   ├── associative-context.tsx # React Context + Provider (useReducer)
│   │   └── hooks.ts              # Consumer hooks (useFilteredKPIs, etc.)
│   ├── hooks/                    # Shared hooks
│   │   └── use-async-data.ts     # Generic async state hook
│   ├── ui/                       # Shared UI components
│   │   ├── app-shell.tsx
│   │   ├── chart-card.tsx
│   │   ├── kpi-stat-card.tsx
│   │   ├── filter-bar.tsx        # Associative filter bar
│   │   ├── associative-filter.tsx # Filter chips (green/white/gray)
│   │   ├── section-header.tsx
│   │   ├── insight-card.tsx
│   │   ├── data-freshness-badge.tsx
│   │   └── states.tsx            # EmptyState, ErrorState
│   ├── lib/                      # Constants, formatters, utilities
│   ├── config/                   # App configuration (navigation, etc.)
│   └── theme/                    # Theme provider and toggle
│
├── components/
│   └── ui/                       # shadcn/ui primitives (auto-generated)
│
├── services/
│   └── http/
│       └── client.ts             # HTTP client abstraction (fetch-based)
│
├── lib/
│   └── utils.ts                  # cn() utility
│
└── types/
    ├── dashboard.ts              # Dashboard types + DataRecord
    └── associative.ts            # Associative engine types
```

### Key architectural rules

- **Modular by feature.** Each feature lives inside `modules/<feature>/` with its own `components/`, `services/`, and `mock/` sub-folders.
- **Modules never import from other modules.** Cross-module code goes to `shared/`.
- **Shared promotion rule.** If two modules need the same component or hook → move it to `shared/ui/` or `shared/hooks/`.
- **`components/ui/` is reserved for shadcn/ui.** Never place custom components there. Never modify shadcn files directly — create wrappers in `shared/ui/` instead.
- **Shared hooks live in `shared/hooks/`.** The generic `useAsyncData<T>` hook is in `shared/hooks/use-async-data.ts`.
- **Types live in `src/types/`.** One file per domain (e.g., `dashboard.ts`, `associative.ts`).
- **Path alias `@/*`** maps to `./src/*`. Always use `@/` imports.

### Why modular by feature

The project chose `modules/<feature>/` with sub-folders (`components/`, `hooks/`, `services/`, `mock/`) over flat global folders (`components/`, `hooks/`) for three reasons:

1. **Colocation** — each feature groups everything it needs in one place.
2. **Boundaries** — modules never import from other modules directly, enforcing clean separation.
3. **Scalability** — adding `modules/reports/` or `modules/marketing/` is trivial and self-contained.

### Shared vs Modules rule

- `shared/ui/` contains **reusable** components needed by multiple modules (`KPIStatCard`, `ChartCard`, `FilterBar`, etc.).
- `modules/*/components/` contains **domain-specific** components (`AcquisitionChart`, `FunnelChart`, etc.).
- **Promotion rule:** if two modules need the same component → move it to `shared/`.

### Data Layer design

- `modules/<feature>/services/` exposes async functions (`getKPIs()`, `getFunnelStages()`, etc.).
- Today they read from `mock/data.ts`. Tomorrow, swap to `httpClient.get("/api/kpis")`.
- **The interface never changes** → zero refactor in consumer components.

### Async State Management philosophy

- `useAsyncData<T>` is a generic hook: `loading → success | error → refetch`.
- **No external library** (React Query, SWR) — intentionally minimal for MVP.
- Easy to migrate to React Query when complexity justifies it.

---

## 4. Feature Structure Pattern

When creating a new feature module (e.g., `reports`):

```
src/modules/reports/
├── components/
│   ├── report-table.tsx
│   └── report-filters.tsx
├── hooks/
│   └── use-report-data.ts
├── services/
│   └── report-service.ts
└── mock/
    └── data.ts
```

Then create the page in `src/app/reports/page.tsx`.

### Naming conventions

| Item | Convention | Example |
|---|---|---|
| Directories | kebab-case | `modules/dashboard/` |
| Component files | kebab-case.tsx | `acquisition-chart.tsx` |
| Hook files | kebab-case starting with `use-` | `use-async-data.ts` |
| Service files | kebab-case ending with `-service.ts` | `dashboard-service.ts` |
| Mock files | `data.ts` inside `mock/` | `mock/data.ts` |
| Type files | kebab-case.ts | `dashboard.ts` |
| Constants | UPPER_SNAKE_CASE | `MOCK_DELAY_MS`, `CHART_HEIGHT` |
| Mock data exports | `MOCK_` prefix, UPPER_SNAKE_CASE | `MOCK_KPIS`, `MOCK_TOP_ITEMS` |
| Component exports | PascalCase named exports | `export function AcquisitionChart` |
| Service exports | camelCase async functions | `export async function getKPIs()` |

---

## 5. API Consumption Pattern

### HTTP Client

Location: `src/services/http/client.ts`

```typescript
export async function httpClient<T>(
    endpoint: string,
    config: RequestConfig = {}
): Promise<T>
```

- Uses native `fetch`.
- Base URL from `process.env.NEXT_PUBLIC_API_URL`.
- Always sets `"Content-Type": "application/json"`.
- Throws on non-`ok` responses with `HTTP Error {status}: {statusText}`.
- Returns `response.json() as Promise<T>`.

### Service Layer

Location: `src/modules/<feature>/services/<feature>-service.ts`

- Each service file exports **named async functions** (not a class, not a default export).
- Each function returns a typed `Promise<T>` using types from `@/types/<domain>.ts`.
- **Today:** services read from `mock/data.ts` with a `delay()` to simulate async latency.
- **Tomorrow:** services will call `httpClient<T>("/api/endpoint")` — the interface stays the same.
- Always import types with `import type { ... }`.

Example pattern:

```typescript
import type { KPI } from "@/types/dashboard";
import { MOCK_KPIS } from "@/modules/dashboard/mock/data";
import { MOCK_DELAY_MS } from "@/shared/lib/constants";

function delay(ms: number = MOCK_DELAY_MS): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getKPIs(): Promise<KPI[]> {
    await delay();
    return MOCK_KPIS;
}
```

### Mock Data

Location: `src/modules/<feature>/mock/data.ts`

- Export typed constants with `MOCK_` prefix.
- Import types from `@/types/<domain>.ts`.
- Use realistic data that matches the actual expected API response shape.

---

## 6. Table Pattern

The project does **not** use TanStack Table. Tables are implemented as **custom components** with manual rendering.

### Current pattern (from `top-items-table.tsx`)

```
src/modules/dashboard/components/top-items-table.tsx
```

Structure:

1. Accept typed data array + `loading` prop.
2. If `loading`, render manual skeleton with `animate-pulse` divs inside `frame-card`.
3. Render items as a list of `div` rows inside `frame-card`, using `border-b border-border/50` as row dividers (skip last row).
4. Use `cn()` for conditional classes.
5. Use `Badge` from shadcn for badges and change indicators.
6. Use `formatVariation()` from `@/shared/lib/formatters` for formatted values.
7. Use Lucide icons (`TrendingUp`, `TrendingDown`, `Minus`) for trends.

### If you need to add a table

- Follow the manual rendering pattern above.
- Place the component in `modules/<feature>/components/`.
- Always handle `loading` state with skeleton placeholders.
- Keep the `frame-card` wrapper.
- Do NOT install TanStack Table unless explicitly asked.

---

## 7. Form Pattern

The project does **not** currently use react-hook-form or Zod.

### Current form-like patterns

Forms use standard React state with shadcn/ui primitives:

- `Select` + `SelectTrigger` + `SelectContent` + `SelectItem` for dropdowns (used in Settings page).
- `Button` for actions.
- State managed with `useState` or the associative engine.

### FilterBar (associative)

The `FilterBar` (`@/shared/ui/filter-bar`) uses the associative engine instead of local state:

```typescript
// No props needed — FilterBar connects to AssociativeContext internally
<FilterBar />
```

Internally it calls `useAssociativeFilters()` and renders `AssociativeFilter` chips for each dimension.

### If you need to add a form

- Use `useState` for form state.
- Use shadcn/ui form primitives (`Select`, `Button`, `Dialog`, etc.).
- Define the state type in `@/types/<domain>.ts`.
- Do NOT install react-hook-form or Zod unless explicitly asked.

---

## 8. i18n Pattern

The project does **not** use any i18n library. All UI text is **hardcoded in Brazilian Portuguese (pt-BR)**.

### Rules

- Write all user-facing strings in pt-BR.
- The root `<html>` tag uses `lang="pt-BR"`.
- Currency formatting uses `pt-BR` locale via `Intl.NumberFormat` (see `@/shared/lib/formatters.ts`).
- Date formatting uses `pt-BR` locale (see `formatDate()` and `formatRelativeTime()`).
- Constants `CURRENCY_LOCALE = "pt-BR"` and `CURRENCY_CODE = "BRL"` are in `@/shared/lib/constants.ts`.
- Do NOT introduce i18n libraries or translation files unless explicitly asked.

---

## 9. Styling Pattern (Tailwind + shadcn)

### Design Identity

The project has two named visual identities. Always respect the rationale behind each.

#### Light Theme — MicroRealismo

| Token | Value | Rationale |
|---|---|---|
| `--background` | `#F4F4EF` (papel/off-white) | Avoids pure white, reducing visual fatigue |
| `--primary` | `#902828` (bordô) | Action color — strong contrast against warm background |
| `--secondary` | `#BFAE8A` (gold suave) | Complementary accent |
| `--radius` | `14px` | Premium rounded feel without being childish |

#### Dark Theme — CriativosADS

| Token | Value | Rationale |
|---|---|---|
| `--background` | `#121212` | Deep charcoal base |
| `--card` | `#1E1F22` | Subtle contrast between surfaces |
| `--primary` | `#B89050` (gold) | Premium, legible against dark background |
| Glow | `rgba(184,144,80,.25)` on CTAs | Subtle highlight effect via `box-shadow` |
| `--secondary` | `#381820` (bordô profundo) | Complements gold without competing |

All tokens are CSS custom properties in `src/app/globals.css` (`:root` for light, `.dark` for dark).
Tokens are exposed to Tailwind via `@theme inline` block.

### Typography

| Usage | Font | Family | Rationale |
|---|---|---|---|
| **Headings** (`h1`–`h6`) | Playfair Display (serif) | `font-serif` | Editorial feel, sophistication |
| **Body** text | Inter (sans) | `font-sans` | Readability, neutrality |

- Headings are applied globally in `@layer base` (no need to add `font-serif` manually on heading tags).
- Heading in components: `className="font-serif text-2xl font-bold tracking-tight"`.
- Section titles: `className="font-serif text-base font-semibold text-card-foreground"`.

### Tailwind CSS v4 decisions

- Tokens defined as CSS variables in `globals.css` `:root` and `.dark`.
- `@theme inline` maps CSS variables to Tailwind color classes.
- Brand utilities (`frame-card`, `cta-pill`, `divider-soft`) defined in `@layer components`.
- Never use Tailwind config file — all configuration lives in `globals.css`.

### Brand utility classes (defined in `@layer components`)

| Class | Purpose |
|---|---|
| `frame-card` | Premium card: `rounded-xl border border-border bg-card p-5 shadow-sm` with hover `shadow-md` |
| `divider-soft` | Subtle divider: `h-px w-full bg-border/60` |
| `cta-pill` | Gradient CTA button with `rounded-full`, hover brightness, dark mode glow (`box-shadow`) |
| `kpi-positive` | Green text for positive KPI trends: `text-success` |
| `kpi-negative` | Red text for negative KPI trends: `text-destructive` |
| `filter-chip` | Base chip: `rounded-full px-3 py-1 text-xs font-medium border` with transition |
| `filter-chip-selected` | Green chip: associative selected state (`--state-selected`) |
| `filter-chip-associated` | White/card chip: associative available state (`--state-associated`) |
| `filter-chip-excluded` | Gray chip: associative excluded state (`--state-excluded`, opacity 0.6) |

### Semantic color usage

| Purpose | Class/Variable |
|---|---|
| Positive trend | `text-success` / `var(--success)` |
| Negative trend | `text-destructive` / `var(--destructive)` |
| Warning | `text-warning` / `var(--warning)` |
| Muted text | `text-muted-foreground` |
| Card text | `text-card-foreground` |
| Chart colors | `var(--chart-1)` through `var(--chart-5)` |
| Associative selected | `var(--state-selected)` (green) |
| Associative associated | `var(--state-associated)` (white/card) |
| Associative excluded | `var(--state-excluded)` (gray/muted) |

### shadcn/ui decisions

- Style: `new-york`. Base color: `stone`.
- CSS variables: **enabled** — all shadcn components respect theme tokens automatically.
- Component path: `@/components/ui/`.
- Utility path: `@/lib/utils` (`cn()`).
- Icon library: `lucide`.
- **Components are never modified directly.** When customization is needed, create wrappers in `shared/ui/`.

### Installed shadcn components

`avatar`, `badge`, `button`, `card`, `dialog`, `dropdown-menu`, `scroll-area`, `select`, `separator`, `sheet`, `skeleton`, `tooltip`.

### Recharts decisions

- Chosen for being lightweight (~45KB gzip) with good React DX.
- Tooltips are styled with CSS variables for theme consistency.
- Always use `var(--chart-N)` CSS colors instead of hardcoded hex.

### Rules

- Always use `cn()` from `@/lib/utils` for conditional/merged class names.
- Always use CSS variable colors — never hardcode hex values in components.
- Always use `frame-card` for card containers, not raw `Card` from shadcn.
- Always use `var(--chart-N)` for Recharts colors.
- Use `rounded-xl` (matches `--radius: 14px`).
- Border radius tiers: `--radius-sm` through `--radius-4xl`.

---

## 10. State Management Pattern

### No external state library

The project intentionally avoids React Query, SWR, Zustand, or Redux.
State is managed with React built-ins: `useState`, `useReducer`, `useMemo`, `useCallback`, and Context API.

### `useAsyncData<T>` hook

Location: `src/shared/hooks/use-async-data.ts`

```typescript
export function useAsyncData<T>(fetcher: () => Promise<T>) {
    // Returns { state: AsyncState<T>, refetch: () => void }
}
```

How `AsyncState<T>` works:

```typescript
export type AsyncState<T> =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; error: string };
```

### Usage pattern for non-associative data

```typescript
const { state: topState } = useAsyncData<TopItem[]>(useCallback(() => getTopItems(), []));
const topItems = topState.status === "success" ? topState.data : [];
```

### Associative Engine

The project has an associative BI engine (similar to Qlik) in `src/shared/engine/`.

#### Architecture

| File | Purpose |
|---|---|
| `associative-engine.ts` | Pure functions: `filterRecords`, `computeDimensions`, `aggregateKPIs`, `aggregateAcquisitionSeries`, `aggregateFinancialSeries`, `aggregateFunnelStages`, `deriveAssociativeData` |
| `associative-context.tsx` | React Context + Provider using `useReducer` + `useMemo`. Loads data via `useAsyncData` internally. |
| `hooks.ts` | Consumer hooks: `useAssociativeFilters()`, `useAssociativeSelector()`, `useFilteredKPIs()`, `useFilteredSeries()`, `useFilteredFunnel()`, `useFilteredRecords()` |

#### Types (`src/types/associative.ts`)

- `AssociativeValueState`: `"selected" | "associated" | "excluded"`
- `DimensionValue`: `{ id, label, state }`
- `Dimension`: `{ id, label, field, values }`
- `DimensionDefinition`: `{ id, label, field }` (configured in `constants.ts`)
- `AssociativeAction`: Union type for reducer (`TOGGLE_VALUE`, `CLEAR_DIMENSION`, `CLEAR_ALL`, `SET_DATA`)
- `DerivedAssociativeData`: `{ filteredRecords, dimensions, kpis, acquisitionSeries, financialSeries, funnelStages, hasActiveFilters }`

#### Data model

`DataRecord` (`src/types/dashboard.ts`) is the flat normalized record for the engine:

```typescript
export interface DataRecord {
    date: string;
    channel: string;
    unit: string;
    leads: number;
    qualified: number;
    appointments: number;
    showed: number;
    conversions: number;
    revenue: number;
    cost: number;
}
```

#### Usage pattern in pages

Pages wrap their content with `AssociativeProvider` and pass a `fetcher`:

```typescript
export default function DashboardPage() {
    const fetcher = useCallback(() => getDataRecords(), []);
    return (
        <AssociativeProvider fetcher={fetcher}>
            <DashboardContent />
        </AssociativeProvider>
    );
}

function DashboardContent() {
    const { kpis, loading } = useFilteredKPIs();
    const { acquisitionSeries, financialSeries } = useFilteredSeries();
    const { stages } = useFilteredFunnel();
    // Render with derived data...
}
```

#### Associative visual pattern

| State | Color | CSS Variable | Meaning |
|---|---|---|---|
| Selected | Green | `--state-selected` | User clicked this value |
| Associated | White/Card | `--state-associated` | Has data matching current selection |
| Excluded | Gray | `--state-excluded` | No data matches current selection |

### Rules

- Always wrap the fetcher in `useCallback(() => ..., [])` to prevent infinite re-renders.
- Always handle `loading` state explicitly (pass `loading` prop to child components).
- Always handle the `"success"` case with a data fallback (e.g., `[]`).
- Skeleton components handle loading states — pass `loading={true}` to trigger them.
- Pages are `"use client"` when using `useAsyncData` or associative hooks.
- For pages with cross-filtering, wrap content in `AssociativeProvider`.
- Use `useFilteredKPIs()`, `useFilteredSeries()`, etc. instead of `useAsyncData` for associative data.
- Use `useAsyncData` only for non-associative data (e.g., `getTopItems()`, `getInsights()`).

### Theme state

- Managed by `next-themes` via `ThemeProvider` in `src/shared/theme/theme-provider.tsx`.
- Toggle via `useTheme()` from `next-themes`.
- `attribute="class"`, `defaultTheme="light"`, `enableSystem={false}`.
- Always check `mounted` state before rendering theme-dependent UI.

### Provider hierarchy (in `layout.tsx`)

```
<ThemeProvider>
  <TooltipProvider delayDuration={300}>
    <AppShell>{children}</AppShell>
  </TooltipProvider>
</ThemeProvider>
```

> Note: `AssociativeProvider` is **per-page**, not in `layout.tsx`. Each page wraps its own content with `AssociativeProvider` and passes the appropriate `fetcher`.

---

## 11. Do / Don't Rules

### ✅ DO

- Use `"use client"` directive on any component that uses hooks, state, or browser APIs.
- Use `import type { ... }` for type-only imports.
- Use `@/` path alias for all imports.
- Use `cn()` for conditional class merging.
- Use `frame-card` class for all card containers.
- Use `font-serif` for headings (automatically applied via `@layer base`).
- Use CSS variables (`var(--chart-1)`, `var(--primary)`, etc.) for colors.
- Use `Skeleton` from shadcn for loading states (or `animate-pulse` divs for custom skeletons).
- Use named exports for all components and functions.
- Use `as const` for constant arrays/objects.
- Use formatters from `@/shared/lib/formatters` (`formatCurrency`, `formatCompact`, `formatPercent`, `formatVariation`, `formatDate`, `formatRelativeTime`).
- Place domain-specific components in `modules/<feature>/components/`.
- Place reusable UI in `shared/ui/`.
- Define types in `src/types/<domain>.ts`.
- Define constants in `src/shared/lib/constants.ts`.
- Wrap `useAsyncData` fetchers in `useCallback`.
- Handle all three states: loading, success, error.
- Add `aria-label` and `aria-hidden` attributes for accessibility.
- Register new pages in `src/shared/config/navigation.ts`.
- Wrap associative pages with `AssociativeProvider` and use `useFilteredKPIs()` etc.
- Use `SectionHeader` from `@/shared/ui/section-header` for consistent section titles.
- Use `InsightCard` from `@/shared/ui/insight-card` for insight/alert displays.

### ❌ DON'T

- Don't install new state management libraries (React Query, Zustand, Redux, etc.).
- Don't install form libraries (react-hook-form, Zod) unless explicitly asked.
- Don't install table libraries (TanStack Table) unless explicitly asked.
- Don't install i18n libraries unless explicitly asked.
- Don't use `axios` — use `httpClient` from `@/services/http/client.ts`.
- Don't modify files in `src/components/ui/` — those are shadcn auto-generated.
- Don't import between modules (`modules/a/` must not import from `modules/b/`).
- Don't use `export default` for components or services (use named exports).
- Don't hardcode hex colors in components — use CSS variables or Tailwind tokens.
- Don't skip loading/skeleton states.
- Don't use `useEffect` for data fetching directly — use `useAsyncData` or the associative engine.
- Don't put `useAsyncData` or feature-specific hooks inside `modules/*/hooks/` — use `shared/hooks/`.
- Don't create global `components/` files outside shadcn's `ui/` — use `shared/ui/` instead.
- Don't use `Card` from shadcn directly — use `frame-card` class.
- Don't write UI text in English — use pt-BR.
- Don't use CSS Modules, Styled Components, or Emotion.
- Don't use `React.FC` — use plain function declarations with typed props.

---

## 12. Agent Implementation Guidelines

### Adding a new feature (step by step)

1. **Define types** in `src/types/<feature>.ts`.
2. **Create mock data** in `src/modules/<feature>/mock/data.ts` with `MOCK_` prefix exports.
3. **Create service** in `src/modules/<feature>/services/<feature>-service.ts` — export async functions that read from mock data.
4. **Create components** in `src/modules/<feature>/components/` — each component is a `"use client"` file with a named export, accepting typed props including `loading?: boolean`.
5. **Create page** in `src/app/<feature>/page.tsx` — use `"use client"`. If the page needs cross-filtering: wrap with `AssociativeProvider` and use `useFilteredKPIs()` etc. Otherwise use `useAsyncData` directly.
6. **Register navigation** in `src/shared/config/navigation.ts` — add a `NavItem` with Lucide icon.
7. **If a component is reusable** across features → place it in `src/shared/ui/`.
8. **If the feature adds new dimensions** → add to `DIMENSION_DEFINITIONS` in `@/shared/lib/constants.ts`.

### Adding a new chart

1. Create component in `modules/<feature>/components/<chart-name>.tsx`.
2. Use `ChartCard` wrapper from `@/shared/ui/chart-card` (provides title, subtitle, loading skeleton, actions dropdown).
3. Use `ResponsiveContainer` from Recharts with `width="100%" height={CHART_HEIGHT}`.
4. Use `var(--chart-N)` CSS variables for colors.
5. Style Recharts `Tooltip` with the standard `contentStyle`:
   ```typescript
   contentStyle={{
       backgroundColor: "var(--card)",
       border: "1px solid var(--border)",
       borderRadius: "var(--radius)",
       fontSize: 12,
       color: "var(--card-foreground)",
   }}
   ```
6. Use formatters from `@/shared/lib/formatters` for axis tick formatting.
7. Set `tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}` on axes.
8. Set `axisLine={false}` and `tickLine={false}` on YAxis.

### Adding a new shared component

1. Place in `src/shared/ui/<component-name>.tsx`.
2. Use `"use client"` if it uses hooks or interactivity.
3. Accept `className?: string` prop, merge with `cn()`.
4. Accept `loading?: boolean` prop, render skeleton when true.
5. Use `frame-card` for card wrappers.
6. Use Lucide icons only.
7. Use shadcn primitives from `@/components/ui/`.

### Adding a new shadcn component

Run: `npx shadcn@latest add <component-name>`

This auto-generates the file in `src/components/ui/`. Do not edit it afterward.

---

## 13. Output Contract for Agents

Every agent output MUST comply with this contract:

| Requirement | Validation |
|---|---|
| Files placed in correct locations | Types in `types/`, services in `modules/*/services/`, components in `modules/*/components/` or `shared/ui/` |
| No new dependencies introduced | Unless the user explicitly approves installation |
| All imports use `@/` alias | No relative imports like `../../` |
| All type imports use `import type` | Separate from value imports |
| All components use named exports | `export function X()`, not `export default` |
| All client components have `"use client"` | At the top of the file |
| All cards use `frame-card` class | Not raw `<Card>` from shadcn |
| All colors use CSS variables | No hardcoded hex in component files |
| Loading states implemented | Skeleton or `animate-pulse` for every async data component |
| i18n: text in pt-BR | All user-facing strings |
| Formatters reused | Use existing functions from `@/shared/lib/formatters` |
| Constants centralized | Use/add to `@/shared/lib/constants.ts` |
| No cross-module imports | `modules/a` never imports from `modules/b` |
| Navigation registered | New pages added to `@/shared/config/navigation.ts` |
| Accessibility basics | `aria-label` on interactive elements, `aria-hidden` on decorative icons |
