"use client";

import { AgentesConversationPanel } from "@/modules/agentes/components/agentes-conversation-panel";
import { AgentesInsightsBoard } from "@/modules/agentes/components/agentes-insights-board";
import {
  MOCK_AGENTES_CONVERSA,
  MOCK_AGENTES_INSIGHTS,
  MOCK_SUGESTOES_RAPIDAS,
} from "@/modules/agentes/mock/data";
import { useState } from "react";

export default function AgentesPage() {
  const [pergunta, setPergunta] = useState("");
  const [agenteAtivo, setAgenteAtivo] = useState(MOCK_AGENTES_CONVERSA.agenteAtivo);
  const [mensagemConversa, setMensagemConversa] = useState(MOCK_AGENTES_CONVERSA.mensagem);

  const conversa = {
    ...MOCK_AGENTES_CONVERSA,
    agenteAtivo,
    mensagem: mensagemConversa,
  };

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
