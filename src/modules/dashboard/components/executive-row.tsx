"use client";

import { cn } from "@/lib/utils";
import { useFilteredKPIs } from "@/shared/engine/hooks";
import { KPIStatCard } from "@/shared/ui/kpi-stat-card";

interface ExecutiveRowProps {
    className?: string;
}

export function ExecutiveRow({ className }: ExecutiveRowProps) {
    const { kpis, loading } = useFilteredKPIs();

    if (loading) {
        return (
            <div className={cn("grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6", className)}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <KPIStatCard key={i} loading />
                ))}
            </div>
        );
    }

    return (
        <div className={cn("grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6", className)}>
            {kpis.map((kpi) => (
                <KPIStatCard key={kpi.id} kpi={kpi} />
            ))}
        </div>
    );
}
