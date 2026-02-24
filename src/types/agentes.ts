export type PrioridadeAgente = "high" | "medium";

export interface AgenteInsightItem {
  id: string;
  titulo: string;
  analise: string;
  acao: string;
  metrica: string;
  prioridade: PrioridadeAgente;
}

export interface AgenteInsightColumn {
  id: string;
  itens: AgenteInsightItem[];
  alertas: string[];
}

export interface AgenteConversa {
  agenteAtivo: string;
  mensagem: string;
  provedor: string;
  modelo: string;
}

export interface SugestaoRapida {
  id: string;
  label: string;
}
