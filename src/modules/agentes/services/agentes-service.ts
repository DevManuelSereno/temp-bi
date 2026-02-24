import {
  MOCK_AGENTES_CONVERSA,
  MOCK_AGENTES_INSIGHTS,
  MOCK_SUGESTOES_RAPIDAS,
} from "@/modules/agentes/mock/data";
import { AGENTES_PAGE_LOADER_MS } from "@/shared/lib/constants";
import type { AgentesDataSnapshot } from "@/types/agentes";

function delay(ms: number = AGENTES_PAGE_LOADER_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAgentesData(): Promise<AgentesDataSnapshot> {
  await delay();
  return {
    insightsColumns: MOCK_AGENTES_INSIGHTS,
    conversa: MOCK_AGENTES_CONVERSA,
    sugestoes: MOCK_SUGESTOES_RAPIDAS,
  };
}
