import type { AgenteConversa, AgenteInsightColumn, SugestaoRapida } from "@/types/agentes";

export const MOCK_AGENTES_INSIGHTS: AgenteInsightColumn[] = [
  {
    id: "atribuicao",
    itens: [
      {
        id: "atrib-high",
        titulo: "Aprimorar a análise de canais de atribuição",
        analise: "Revisar o fluxo do modelo de atribuição",
        acao: "Aprimoramento de insights e decisões",
        metrica: "ROI",
        prioridade: "high",
      },
      {
        id: "atrib-medium",
        titulo: "Identificar campanhas de alto impacto",
        analise: "Analisar resultados das principais campanhas",
        acao: "Aumento no investimento onde há retorno",
        metrica: "Receita",
        prioridade: "medium",
      },
    ],
    alertas: [
      "Necessária atenção às métricas de conversão em tempo real",
      "Validar os dados de desempenho frequentemente",
    ],
  },
  {
    id: "custos",
    itens: [
      {
        id: "cost-high",
        titulo: "Reduzir custos de aquisição",
        analise: "Ajustar orçamentos e estratégias de investimento",
        acao: "Melhorar a margem de lucro",
        metrica: "CAC",
        prioridade: "high",
      },
      {
        id: "cost-medium",
        titulo: "Aumentar a eficiência do custo por lead",
        analise: "Análise de custo em canais de baixo desempenho",
        acao: "Aumentar ROI total",
        metrica: "CPL",
        prioridade: "medium",
      },
    ],
    alertas: [
      "Monitorar continuamente a evolução dos custos",
      "Potenciais variações de gastos inesperadas nas campanhas",
    ],
  },
];

export const MOCK_AGENTES_CONVERSA: AgenteConversa = {
  agenteAtivo: "Mesa de Agentes",
  mensagem:
    "Prioridade operacional nas próximas 48h: estancar desperdício e corrigir a base de mensuração/qualidade (match rate), para que as decisões de orçamento e CRM sejam confiáveis.\n\n- Tráfego (Alice) -> executar corte imediato e realocar com controle: reduzir investimento nas campanhas com ROAS abaixo da meta e manter monitoramento diário para novos ajustes.\n- Atribuição (Carla) -> mapear a origem real de \"Sem Campanha\", validar eventos de lead e padronizar nomenclaturas das campanhas em todos os canais.\n- CRM (Bruno) -> corrigir o processo de captura de contatos para elevar match rate e recuperar capacidade de contato do time comercial.\n- Financeiro (Daniel) -> definir regras operacionais para investimento por canal versus leads e receita atribuída, evitando variações bruscas sem controle.\n- Ritual de coordenação (Mesa) -> reunião única de 45 min hoje para aprovar cortes e definir o que pode receber realocação controlada.",
  provedor: "OPENAI",
  modelo: "GPT-5.2",
};

export const MOCK_SUGESTOES_RAPIDAS: SugestaoRapida[] = [
  {
    id: "prioridade-48h",
    label: "Qual prioridade operacional das próximas 48h?",
  },
  {
    id: "plano-impacto",
    label: "Monte um plano coordenado por impacto e urgência.",
  },
  {
    id: "conflitos",
    label: "Quais conflitos entre agentes devo resolver primeiro?",
  },
];
