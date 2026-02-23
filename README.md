# Painel Premium - Dashboard de BI

Dashboard premium frontend-only com **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS v4**, **Ant Design** e **Recharts**.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript (strict) |
| Estilos | Tailwind CSS v4 + CSS Variables |
| Componentes | Ant Design |
| Graficos | Recharts |
| Tema | next-themes |
| Icones | Phosphor Icons |

## Inicio Rapido

```bash
# Instalar dependencias
npm install

# Dev server
npm run dev

# Build
npm run build

# Lint
npm run lint
```

Acesse `http://localhost:3000` apos `npm run dev`.

## Paginas

| Rota | Descricao |
|---|---|
| `/` | Visao Geral - resumo executivo com KPIs e graficos |
| `/visual` | Painel Visual - dashboard completo |
| `/settings` | Configuracoes - troca de tema e preferencias de visualizacao |
| `/campanhas` | Performance de campanhas |
| `/crm` | Pipeline comercial |
| `/erp` | Visao financeira |

## Temas

- **MicroRealismo** (claro): fundo off-white `#F4F4EF`, bordo `#902828`, gold suave `#BFAE8A`
- **CriativosADS** (escuro): fundo charcoal `#121212`, gold `#B89050`, bordo profundo `#381820`

## Arquitetura

```
src/
|-- app/                 # Next.js App Router (rotas, layout)
|-- modules/             # Modulos por feature
|-- shared/              # UI reutilizavel, hooks, engine, config
|-- services/http/       # HTTP client abstraction
`-- types/               # Tipos globais
```

## Dados

Todos os dados sao mockados em arquivos TS. A camada de servico segue interface async para troca direta por API quando necessario.
