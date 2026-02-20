"use client";

import { cn } from "@/lib/utils";
import { useFilteredKPIs } from "@/shared/engine/hooks";
import { SemicircleGaugeCard } from "@/shared/ui/semicircle-gauge-card";

/** KPI ids that are percent-based and suitable for gauges */
const GAUGE_KPI_IDS = ["margem", "show-rate", "ocupacao"] as const;

const GAUGE_COLORS: Record<string, string> = {
    margem: "var(--chart-2)",
    "show-rate": "var(--chart-3)",
    ocupacao: "var(--chart-4)",
};

const GAUGE_SUBTITLES: Record<string, string> = {
    margem: "Meta: 35%",
    "show-rate": "Meta: 80%",
    ocupacao: "Meta: 85%",
};

interface GaugeSidebarProps {
    className?: string;
}

export function GaugeSidebar({ className }: GaugeSidebarProps) {
    const { kpis, loading } = useFilteredKPIs();

    if (loading) {
        return (
            <div className={cn("flex flex-col gap-4", className)}>
                {GAUGE_KPI_IDS.map((id) => (
                    <SemicircleGaugeCard key={id} title="" value={0} loading />
                ))}
            </div>
        );
    }

    const gaugeKpis = GAUGE_KPI_IDS
        .map((id) => kpis.find((k) => k.id === id))
        .filter(Boolean);

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {gaugeKpis.map((kpi) =>
                kpi ? (
                    <SemicircleGaugeCard
                        key={kpi.id}
                        title={kpi.label}
                        value={kpi.value}
                        subtitle={GAUGE_SUBTITLES[kpi.id]}
                        color={GAUGE_COLORS[kpi.id]}
                    />
                ) : null
            )}
        </div>
    );
}
