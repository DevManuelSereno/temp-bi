"use client";

import { AgentesConversationPanel } from "@/modules/agentes/components/agentes-conversation-panel";
import { AgentesInsightsBoard } from "@/modules/agentes/components/agentes-insights-board";
import { AgentesLoadingState } from "@/modules/agentes/components/agentes-loading-state";
import { getAgentesData } from "@/modules/agentes/services/agentes-service";
import { useAsyncData } from "@/shared/hooks/use-async-data";
import { ErrorState } from "@/shared/ui/states";
import type { AgentesDataSnapshot } from "@/types/agentes";
import { useCallback, useState } from "react";

export default function AgentesPage() {
  const { state, refetch } = useAsyncData<AgentesDataSnapshot>(useCallback(() => getAgentesData(), []));
  const [pergunta, setPergunta] = useState("");
  const [agenteAtivo, setAgenteAtivo] = useState<string | null>(null);
  const [mensagemConversa, setMensagemConversa] = useState<string | null>(null);

  if (state.status === "loading") {
    return (
      <div className="flex flex-col gap-6">
        <AgentesLoadingState />
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <ErrorState
        title="Erro ao carregar agentes"
        description={state.error}
        onRetry={refetch}
      />
    );
  }

  if (state.status !== "success") {
    return null;
  }

  const conversa = {
    ...state.data.conversa,
    agenteAtivo: agenteAtivo ?? state.data.conversa.agenteAtivo,
    mensagem: mensagemConversa ?? state.data.conversa.mensagem,
  };

  return (
    <div className="flex flex-col gap-6">
      <AgentesInsightsBoard columns={state.data.insightsColumns} />

      <AgentesConversationPanel
        conversa={conversa}
        sugestoes={state.data.sugestoes}
        pergunta={pergunta}
        onPerguntaChange={setPergunta}
        onAgenteAtivoChange={setAgenteAtivo}
        onLimparConversa={() => {
          setPergunta("");
          setMensagemConversa("");
        }}
        onUsarSugestao={setPergunta}
      />
    </div>
  );
}
