"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getInsights } from "@/modules/dashboard/services/dashboard-service";
import { useAsyncData } from "@/shared/hooks/use-async-data";
import { InsightCard } from "@/shared/ui/insight-card";
import { SectionHeader } from "@/shared/ui/section-header";
import type { Insight } from "@/types/dashboard";
import { useCallback } from "react";

interface ActionCenterProps {
    className?: string;
}

export function ActionCenter({ className }: ActionCenterProps) {
    const { state } = useAsyncData<Insight[]>(useCallback(() => getInsights(), []));

    const loading = state.status === "loading";
    const insights = state.status === "success" ? state.data : [];

    const sorted = [...insights].sort((a, b) => {
        const order = { critical: 0, warning: 1, positive: 2, info: 3 };
        return order[a.severity] - order[b.severity];
    });

    const criticalCount = sorted.filter((i) => i.severity === "critical" || i.severity === "warning").length;

    if (loading) {
        return (
            <div className={cn("frame-card flex flex-col gap-4", className)}>
                <Skeleton className="h-5 w-40" />
                <div className="flex flex-col gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-20 w-full rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={cn("frame-card flex flex-col gap-4", className)}>
            <SectionHeader
                title="Centro de Ações"
                subtitle="Anomalias e oportunidades detectadas"
                badge={
                    criticalCount > 0 ? (
                        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-[10px]">
                            {criticalCount} ação{criticalCount > 1 ? "ões" : ""} pendente{criticalCount > 1 ? "s" : ""}
                        </Badge>
                    ) : undefined
                }
            />
            <div className="flex flex-col gap-2">
                {sorted.map((insight) => (
                    <InsightCard key={insight.id} insight={insight} />
                ))}
            </div>
        </div>
    );
}
