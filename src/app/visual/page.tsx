"use client";

import {
    getDataFreshness,
    getDataRecords,
} from "@/modules/dashboard/services/dashboard-service";
import { AssociativeProvider } from "@/shared/engine/associative-context";
import { useFilteredKPIs } from "@/shared/engine/hooks";
import { useAsyncData } from "@/shared/hooks/use-async-data";
import { DataFreshnessBadge } from "@/shared/ui/data-freshness-badge";
import { KPIStatCard } from "@/shared/ui/kpi-stat-card";
import { SectionHeader } from "@/shared/ui/section-header";
import type { DataFreshness as DataFreshnessType } from "@/types/dashboard";
import { useCallback } from "react";

function VisualContent() {
    const { kpis, loading: kpiLoading } = useFilteredKPIs();

    const { state: freshState } = useAsyncData<DataFreshnessType>(
        useCallback(() => getDataFreshness(), [])
    );

    const freshness = freshState.status === "success" ? freshState.data : undefined;

    return (
        <div className="flex flex-col gap-6">
            {/* ── Header ────────────────────────────────── */}
            <SectionHeader
                title="Dashboard Visual"
                subtitle="KPIs com filtros associativos"
                badge={freshness ? <DataFreshnessBadge freshness={freshness} /> : undefined}
            />

            {/* ── KPI Cards ──────────────────────────────── */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
                {kpiLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <KPIStatCard key={i} loading />
                    ))
                    : kpis.map((kpi) => <KPIStatCard key={kpi.id} kpi={kpi} />)}
            </div>
        </div>
    );
}

export default function VisualPage() {
    const fetcher = useCallback(() => getDataRecords(), []);

    return (
        <AssociativeProvider fetcher={fetcher}>
            <VisualContent />
        </AssociativeProvider>
    );
}
