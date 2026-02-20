"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatCurrency, formatPercent } from "@/shared/lib/formatters";
import type { MetaAdsCampaign } from "@/types/meta-ads";

const STATUS_LABELS: Record<MetaAdsCampaign["status"], string> = {
    active: "Ativa",
    paused: "Pausada",
    completed: "Finalizada",
};

const STATUS_BADGE: Record<MetaAdsCampaign["status"], string> = {
    active: "bg-success/15 text-success",
    paused: "bg-warning/15 text-warning",
    completed: "bg-muted text-muted-foreground",
};

interface MetaAdsCampaignsTableProps {
    campaigns: MetaAdsCampaign[];
    loading?: boolean;
    className?: string;
}

export function MetaAdsCampaignsTable({
    campaigns,
    loading,
    className,
}: MetaAdsCampaignsTableProps) {
    if (loading) {
        return (
            <div className={cn("frame-card", className)}>
                <div className="flex flex-col gap-3">
                    <Skeleton className="h-5 w-40" />
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between gap-4">
                            <Skeleton className="h-4 w-44" />
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
                Campanhas
            </h3>

            {/* Header row */}
            <div className="hidden md:grid md:grid-cols-12 gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
                <span className="col-span-3">Campanha</span>
                <span className="col-span-1">Status</span>
                <span className="col-span-2 text-right">Investido</span>
                <span className="col-span-1 text-right">Leads</span>
                <span className="col-span-2 text-right">CPL</span>
                <span className="col-span-1 text-right">CTR</span>
                <span className="col-span-2 text-right">ROAS</span>
            </div>

            <div className="flex flex-col gap-0">
                {campaigns.map((c, i) => (
                    <div
                        key={c.id}
                        className={cn(
                            "grid grid-cols-2 md:grid-cols-12 gap-2 items-center py-3",
                            i < campaigns.length - 1 && "border-b border-border/50"
                        )}
                    >
                        <span className="col-span-2 md:col-span-3 text-sm font-medium text-card-foreground truncate">
                            {c.name}
                        </span>
                        <span className="md:col-span-1">
                            <span
                                className={cn(
                                    "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                                    STATUS_BADGE[c.status]
                                )}
                            >
                                {STATUS_LABELS[c.status]}
                            </span>
                        </span>
                        <span className="md:col-span-2 text-sm text-card-foreground text-right">
                            {formatCurrency(c.spend)}
                        </span>
                        <span className="md:col-span-1 text-sm font-semibold text-card-foreground text-right">
                            {c.leads}
                        </span>
                        <span className="md:col-span-2 text-sm text-muted-foreground text-right">
                            {formatCurrency(c.cpl)}
                        </span>
                        <span className="md:col-span-1 text-sm text-muted-foreground text-right">
                            {formatPercent(c.ctr)}
                        </span>
                        <span className={cn(
                            "md:col-span-2 text-sm font-semibold text-right",
                            c.roas >= 4 ? "kpi-positive" : c.roas < 2 ? "kpi-negative" : "text-card-foreground"
                        )}>
                            {c.roas.toFixed(1)}x
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
