# Decisões de Arquitetura e Design

## Identidade Visual

### Tema Claro — MicroRealismo
- Background `#F4F4EF` (papel/off-white) evita o branco puro, reduzindo fadiga visual.
- Primary `#902828` (bordô) como cor de ação — contraste com o fundo quente.
- Secondary `#BFAE8A` (gold suave) como accent complementar.
- Radius `14px` — arredondamento premium sem ser infantil.

### Tema Escuro — CriativosADS
- Background `#121212` com cards `#1E1F22` — contraste sutil entre superfícies.
- Primary `#B89050` (gold) — premium e legível contra fundo escuro.
- Glow `rgba(184,144,80,.25)` nos CTAs — efeito sutil de destaque.
- Secondary `#381820` (bordô profundo) — complementar sem competir com o gold.

### Tipografia
- **Headings**: Playfair Display (serif) — editorial, sofisticação.
- **Body**: Inter (sans) — legibilidade, neutralidade.

## Arquitetura

### Modular por Feature
Optamos por `modules/dashboard/` com sub-pastas (components, hooks, services, mock) ao invés de pastas globais (`components/`, `hooks/`), porque:
1. Colocation: cada feature agrupa tudo que precisa.
2. Boundaries: módulos não importam de outros módulos diretamente.
3. Escalabilidade: adicionar `modules/reports/` ou `modules/marketing/` é trivial.

### Shared vs Modules
- `shared/ui/` contém componentes reutilizáveis (KPIStatCard, ChartCard, etc.).
- `modules/*/components/` contém componentes específicos do domínio (AcquisitionChart).
- Regra: se dois módulos precisam do mesmo componente → promove para `shared/`.

### Data Layer
- `modules/dashboard/services/` expõe funções async (`getKPIs()`, `getFunnelStages()`, etc.).
- Hoje lêem de `mock/data.ts`. Amanhã trocar para `httpClient.get("/api/kpis")`.
- Interface não muda → zero refactor nos componentes consumer.

### Async State Management
- `useAsyncData<T>` genérico: loading → success | error → refetch.
- Sem biblioteca externa (React Query, SWR) — propositalmente mínimo para MVP.
- Fácil migrar para React Query quando a complexidade justificar.

## Tailwind CSS v4
- Tokens definidos como CSS variables em `globals.css` `:root` e `.dark`.
- `@theme inline` mapeia variáveis para Tailwind colors.
- Brand utilities (`frame-card`, `cta-pill`, `divider-soft`) em `@layer components`.

## shadcn/ui
- Estilo `new-york`, base color `stone`.
- Variáveis CSS ativadas — todos os componentes shadcn respeitam os tokens de tema.
- Componentes não modificados diretamente; wrappers em `shared/ui/` quando necessário.

## Recharts
- Leve (~45KB gzip), boa DX com React.
- Tooltips estilizados com CSS variables para consistência de tema.
- CSS colors (`var(--chart-1)`) ao invés de hex hardcoded.
