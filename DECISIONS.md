# Decisoes de Arquitetura e Design

## Identidade Visual

### Tema Claro - MicroRealismo
- Background `#F4F4EF` (papel/off-white) para reduzir fadiga visual.
- Primary `#902828` (bordo) como cor principal de acao.
- Secondary `#BFAE8A` (gold suave) como acento complementar.
- Radius `14px` para linguagem premium.

### Tema Escuro - CriativosADS
- Background `#121212` e cards `#1E1F22` para contraste sutil.
- Primary `#B89050` (gold) para destaque em fundo escuro.
- Glow `rgba(184,144,80,.25)` em CTAs.
- Secondary `#381820` (bordo profundo).

### Tipografia
- Headings: Playfair Display (serif).
- Body: Inter (sans).

## Arquitetura

### Modular por Feature
Optamos por `modules/<feature>/` com subpastas (components, services, mock) para:
1. Colocation da feature.
2. Limites claros entre dominios.
3. Escalabilidade para novas areas.

### Shared vs Modules
- `shared/ui/` contem componentes reutilizaveis.
- `modules/*/components/` contem componentes de dominio.
- Regra: se dois modulos precisam, promover para `shared/`.

### Data Layer
- `modules/*/services/` expoe funcoes async tipadas.
- Hoje le de mocks.
- Amanhã pode trocar por API sem alterar consumo.

### Async State
- Hook principal: `useAsyncData<T>`.
- Sem bibliotecas externas de estado assinc.

## UI e Estilo

- Biblioteca de componentes: **Ant Design**.
- Tema global via `ConfigProvider` com tokens alinhados aos temas light/dark.
- Tailwind segue responsavel por layout, espacamento e utilitarios visuais de marca.
- Cartoes e superficies usam classe `frame-card`.

## Graficos

- Recharts para visualizacoes.
- Cores por CSS variables (`var(--chart-N)`).
- Tooltips e eixos padronizados para consistencia entre temas.
