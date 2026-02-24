"use client";

import { cn } from "@/lib/utils";

interface AgentesLoadingStateProps {
  message?: string;
  className?: string;
}

export function AgentesLoadingState({
  message = "Carregando agentes...",
  className,
}: AgentesLoadingStateProps) {
  return (
    <section
      role="status"
      aria-live="polite"
      aria-label="Carregamento de agentes"
      className={cn("frame-card relative flex min-h-10 items-center overflow-hidden !p-0", className)}
    >
      <div aria-hidden="true" className="absolute left-0 top-0 h-full w-1.5 bg-primary" />
      <p className="translate-y-[1px] px-3 py-2 text-center font-mono text-sm leading-none text-card-foreground sm:text-base">
        {message}
      </p>
    </section>
  );
}
