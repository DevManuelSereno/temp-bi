"use client";

import { cn } from "@/lib/utils";
import type { AgenteInsightColumn, PrioridadeAgente } from "@/types/agentes";
import { Tag } from "antd";

interface AgentesInsightsBoardProps {
  columns: AgenteInsightColumn[];
  className?: string;
}

const PRIORIDADE_CLASS: Record<PrioridadeAgente, string> = {
  high: "border-destructive/20 bg-destructive/10 text-destructive",
  medium: "border-warning/30 bg-warning/10 text-warning",
};

const PRIORIDADE_LABEL: Record<PrioridadeAgente, string> = {
  high: "HIGH",
  medium: "MEDIUM",
};

export function AgentesInsightsBoard({ columns, className }: AgentesInsightsBoardProps) {
  return (
    <section className={cn("grid grid-cols-1 gap-4 xl:grid-cols-2", className)} aria-label="Insights dos agentes">
      {columns.map((column) => (
        <article key={column.id} className="frame-card flex flex-col gap-0 !p-0">
          {column.itens.map((item) => (
            <div key={item.id} className="border-b border-border/70 px-4 py-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-mono text-sm font-medium text-card-foreground sm:text-base">{item.titulo}</h3>
                <Tag bordered className={cn("!m-0 rounded-md px-1.5 py-0 text-[10px]", PRIORIDADE_CLASS[item.prioridade])}>
                  {PRIORIDADE_LABEL[item.prioridade]}
                </Tag>
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.08em] text-muted-foreground">{item.analise}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.08em] text-muted-foreground">{item.acao}</p>
              <p className="mt-2 text-xs text-muted-foreground">{item.metrica}</p>
            </div>
          ))}

          <div className="px-4 py-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Alertas</h4>
            <ul className="mt-2 space-y-1.5">
              {column.alertas.map((alerta) => (
                <li key={alerta} className="font-mono text-xs text-card-foreground">
                  - {alerta}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </section>
  );
}
