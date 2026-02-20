"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/shared/lib/formatters";
import type { CampanhasCampaign } from "@/types/campanhas";

const STATUS_LABEL: Record<CampanhasCampaign["status"], string> = {
    active: "Ativa",
    paused: "Pausada",
    learning: "Aprendizado",
};

const STATUS_BADGE: Record<CampanhasCampaign["status"], string> = {
    active: "bg-emerald-500/10 text-emerald-500",
    paused: "bg-yellow-500/10 text-yellow-500",
    learning: "bg-blue-500/10 text-blue-500",
};

interface CampanhasCampaignsTableProps {
    campaigns: CampanhasCampaign[];
    loading?: boolean;
    className?: string;
}

export function CampanhasCampaignsTable({
    campaigns,
    loading,
    className,
}: CampanhasCampaignsTableProps) {
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
                <span className="col-span-1">Plataforma</span>
                <span className="col-span-1">Status</span>
                <span className="col-span-2 text-right">Investido</span>
                <span className="col-span-1 text-right">Leads</span>
                <span className="col-span-2 text-right">CPL</span>
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
                                    "inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                                    c.platform === "Google Ads" ? "bg-red-500/10 text-red-600 dark:text-red-400" : "bg-blue-600/10 text-blue-600 dark:text-blue-400"
                                )}
                            >
                                {c.platform}
                            </span>
                        </span>
                        <span className="md:col-span-1">
                            <span
                                className={cn(
                                    "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                                    STATUS_BADGE[c.status]
                                )}
                            >
                                {STATUS_LABEL[c.status]}
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
                        {/* Removed CTR column as per instruction */}
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
