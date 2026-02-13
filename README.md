# Painel Premium — Dashboard de BI

Dashboard premium frontend-only com **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS v4**, **shadcn/ui** e **Recharts**.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript (strict) |
| Estilos | Tailwind CSS v4 + CSS Variables |
| Componentes | shadcn/ui (new-york) |
| Gráficos | Recharts |
| Tema | next-themes |
| Ícones | Lucide React |

## Início Rápido

```bash
# Instalar dependências
npm install

# Dev server
npm run dev

# Build
npm run build

# Lint
npm run lint
```

Acesse `http://localhost:3000` após `npm run dev`.

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Visão Geral — resumo executivo com 4 KPIs + 2 gráficos |
| `/visual` | Painel Visual — dashboard completo com 6 KPIs, 3 gráficos, funil, top 5, alertas |
| `/settings` | Configurações — troca de tema + preferências de visualização |

## Temas

- **MicroRealismo** (claro): fundo off-white `#F4F4EF`, bordô `#902828`, gold suave `#BFAE8A`
- **CriativosADS** (escuro): fundo charcoal `#121212`, gold `#B89050`, bordô profundo `#381820`, glow em CTAs

## Arquitetura

```
src/
├── app/                  # Next.js App Router (rotas, layout)
├── components/ui/        # Componentes shadcn/ui base  
├── modules/dashboard/    # Feature module
│   ├── components/       # Charts, tables, insights list
│   ├── hooks/            # useAsyncData
│   ├── services/         # Data access (mock → API)
│   └── mock/             # Dados mockados
├── shared/
│   ├── ui/               # AppShell, KPIStatCard, ChartCard, FilterBar, etc.
│   ├── lib/              # Utils, formatters, constants
│   ├── theme/            # ThemeProvider, ThemeToggle
│   └── config/           # Navegação, rotas
├── services/http/        # HTTP client abstraction
└── types/                # Tipos globais (KPI, SeriesPoint, etc.)
```

## Dados

Todos os dados são **mock** (arquivos TS). A camada de serviço (`modules/dashboard/services/`) usa interfaces async — swap direto para API quando disponível.
