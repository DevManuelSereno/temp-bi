"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/shared/lib/formatters";
import type { CRMOpportunity } from "@/types/crm";

const STAGE_BADGE_COLORS: Record<string, string> = {
    Lead: "bg-muted text-muted-foreground",
    Qualificado: "bg-chart-1/15 text-chart-1",
    Agendado: "bg-chart-2/15 text-chart-2",
    Compareceu: "bg-chart-3/15 text-chart-3",
    Convertido: "bg-chart-4/15 text-chart-4",
};

interface CRMOpportunitiesTableProps {
    opportunities: CRMOpportunity[];
    loading?: boolean;
    className?: string;
}

export function CRMOpportunitiesTable({
    opportunities,
    loading,
    className,
}: CRMOpportunitiesTableProps) {
    if (loading) {
        return (
            <div className={cn("frame-card", className)}>
                <div className="flex flex-col gap-3">
                    <Skeleton className="h-5 w-44" />
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between gap-4">
                            <Skeleton className="h-4 w-36" />
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={cn("frame-card flex flex-col gap-4", className)}>
            <h3 className="font-serif text-base font-semibold text-card-foreground">
                Oportunidades Recentes
            </h3>

            {/* Header row */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
                <span className="col-span-3">Nome</span>
                <span className="col-span-2">Etapa</span>
                <span className="col-span-3">Responsável</span>
                <span className="col-span-2 text-right">Valor</span>
                <span className="col-span-2 text-right">Atualizado</span>
            </div>

            <div className="flex flex-col gap-0">
                {opportunities.map((op, i) => (
                    <div
                        key={op.id}
                        className={cn(
                            "grid grid-cols-1 sm:grid-cols-12 gap-2 items-center py-3",
                            i < opportunities.length - 1 && "border-b border-border/50"
                        )}
                    >
                        <span className="col-span-3 text-sm font-medium text-card-foreground truncate">
                            {op.name}
                        </span>
                        <span className="col-span-2">
                            <span
                                className={cn(
                                    "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                                    STAGE_BADGE_COLORS[op.stage] ?? "bg-muted text-muted-foreground"
                                )}
                            >
                                {op.stage}
                            </span>
                        </span>
                        <span className="col-span-3 text-sm text-muted-foreground truncate">
                            {op.assignee}
                        </span>
                        <span className="col-span-2 text-sm font-semibold text-card-foreground text-right">
                            {op.value > 0 ? formatCurrency(op.value) : "—"}
                        </span>
                        <span className="col-span-2 text-xs text-muted-foreground text-right">
                            {formatDate(op.updatedAt)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
