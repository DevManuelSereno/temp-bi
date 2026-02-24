"use client";

import { AgentesConversationPanel } from "@/modules/agentes/components/agentes-conversation-panel";
import { AgentesInsightsBoard } from "@/modules/agentes/components/agentes-insights-board";
import { AgentesLoadingState } from "@/modules/agentes/components/agentes-loading-state";
import {
  MOCK_AGENTES_CONVERSA,
  MOCK_AGENTES_INSIGHTS,
  MOCK_SUGESTOES_RAPIDAS,
} from "@/modules/agentes/mock/data";
import { AGENTES_PAGE_LOADER_MS } from "@/shared/lib/constants";
import { useEffect, useState } from "react";

export default function AgentesPage() {
  const [mostrarLoader, setMostrarLoader] = useState(true);
  const [pergunta, setPergunta] = useState("");
  const [agenteAtivo, setAgenteAtivo] = useState(MOCK_AGENTES_CONVERSA.agenteAtivo);
  const [mensagemConversa, setMensagemConversa] = useState(MOCK_AGENTES_CONVERSA.mensagem);

  useEffect(() => {
    const timer = window.setTimeout(() => setMostrarLoader(false), AGENTES_PAGE_LOADER_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const conversa = {
    ...MOCK_AGENTES_CONVERSA,
    agenteAtivo,
    mensagem: mensagemConversa,
  };

  if (mostrarLoader) {
    return (
      <div className="flex flex-col gap-6">
        <AgentesLoadingState />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <AgentesInsightsBoard columns={MOCK_AGENTES_INSIGHTS} />

      <AgentesConversationPanel
        conversa={conversa}
        sugestoes={MOCK_SUGESTOES_RAPIDAS}
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
