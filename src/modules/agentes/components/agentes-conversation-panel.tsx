"use client";

import { cn } from "@/lib/utils";
import type { AgenteConversa, SugestaoRapida } from "@/types/agentes";
import { Button, Input, Select } from "antd";

interface AgentesConversationPanelProps {
  conversa: AgenteConversa;
  sugestoes: SugestaoRapida[];
  pergunta: string;
  onPerguntaChange: (value: string) => void;
  onAgenteAtivoChange: (value: string) => void;
  onLimparConversa: () => void;
  onUsarSugestao: (value: string) => void;
  className?: string;
}

const AGENTE_OPTIONS = [
  { label: "Mesa de Agentes", value: "Mesa de Agentes" },
  { label: "Agente de Mídia", value: "Agente de Mídia" },
  { label: "Agente CRM", value: "Agente CRM" },
];

export function AgentesConversationPanel({
  conversa,
  sugestoes,
  pergunta,
  onPerguntaChange,
  onAgenteAtivoChange,
  onLimparConversa,
  onUsarSugestao,
  className,
}: AgentesConversationPanelProps) {
  return (
    <section className={cn("frame-card relative overflow-hidden", className)} aria-label="Conversa com agentes">
      <div aria-hidden="true" className="absolute left-0 top-4 h-9 w-1 rounded-r-md bg-primary" />

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-success">Conversa com Agentes</h3>
          <p className="font-mono text-sm text-card-foreground">Agente ativo: {conversa.agenteAtivo}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={conversa.agenteAtivo}
            options={AGENTE_OPTIONS}
            onChange={onAgenteAtivoChange}
            size="large"
            className="!h-9 !w-[220px]"
            aria-label="Selecionar agente ativo"
          />
          <Button
            size="large"
            onClick={onLimparConversa}
            className="!h-9 !px-4 !text-xs !font-semibold"
            aria-label="Limpar conversa"
          >
            LIMPAR CONVERSA
          </Button>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-border bg-background/50 p-3">
        <div className="max-h-[360px] overflow-y-auto pr-2 font-mono text-[13px] leading-6 text-card-foreground whitespace-pre-wrap">
          {conversa.mensagem}
        </div>
        <div className="mt-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          {conversa.provedor} - {conversa.modelo}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Sugestões rápidas</h4>
        <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-3">
          {sugestoes.map((sugestao) => (
            <Button
              key={sugestao.id}
              type="default"
              onClick={() => onUsarSugestao(sugestao.label)}
              className="!h-auto !min-h-9 !min-w-0 !justify-start !px-3 !py-2 !text-left !text-[11px] !font-semibold !uppercase !tracking-[0.08em] [&>span]:block [&>span]:w-full [&>span]:whitespace-normal [&>span]:break-words"
              aria-label={`Usar sugestão: ${sugestao.label}`}
            >
              {sugestao.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-[1fr_176px]">
        <Input.TextArea
          autoSize={{ minRows: 3, maxRows: 10 }}
          value={pergunta}
          onChange={(event) => onPerguntaChange(event.target.value)}
          placeholder="Digite sua pergunta para o agente ativo..."
          aria-label="Mensagem para agentes"
          className="!rounded-xl [textarea]:!resize-none"
        />
        <Button type="primary" className="!h-auto !min-h-12 !text-xs !font-semibold !tracking-[0.08em]" aria-label="Enviar mensagem">
          ENVIAR
        </Button>
      </div>
    </section>
  );
}
