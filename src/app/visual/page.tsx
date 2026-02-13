"use client";

import { useState, useCallback } from "react";
import { KPIStatCard } from "@/shared/ui/kpi-stat-card";
import { FilterBar } from "@/shared/ui/filter-bar";
import { DataFreshnessBadge } from "@/shared/ui/data-freshness-badge";
import { AcquisitionChart } from "@/modules/dashboard/components/acquisition-chart";
import { FunnelChart } from "@/modules/dashboard/components/funnel-chart";
import { FinancialChart } from "@/modules/dashboard/components/financial-chart";
import { TopItemsTable } from "@/modules/dashboard/components/top-items-table";
import { InsightsList } from "@/modules/dashboard/components/insights-list";
import { useAsyncData } from "@/modules/dashboard/hooks/use-async-data";
import {
    getKPIs,
    getAcquisitionSeries,
    getFunnelStages,
    getFinancialSeries,
    getTopItems,
    getInsights,
    getDataFreshness,
} from "@/modules/dashboard/services/dashboard-service";
import type { FilterState } from "@/types/dashboard";

export default function VisualDashboardPage() {
    const [filters, setFilters] = useState<FilterState>({ period: "30d" });

    const { state: kpiState } = useAsyncData(useCallback(() => getKPIs(), []));
    const { state: acqState } = useAsyncData(useCallback(() => getAcquisitionSeries(), []));
    const { state: funnelState } = useAsyncData(useCallback(() => getFunnelStages(), []));
    const { state: finState } = useAsyncData(useCallback(() => getFinancialSeries(), []));
    const { state: topState } = useAsyncData(useCallback(() => getTopItems(), []));
    const { state: insightsState } = useAsyncData(useCallback(() => getInsights(), []));
    const { state: freshState } = useAsyncData(useCallback(() => getDataFreshness(), []));

    const isLoading =
        kpiState.status === "loading" ||
        acqState.status === "loading" ||
        funnelState.status === "loading";

    const kpis = kpiState.status === "success" ? kpiState.data : [];

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-serif text-2xl font-bold tracking-tight">
                        Painel Visual
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Dashboard completo — métricas, funil e insights
                    </p>
                </div>
                {freshState.status === "success" && (
                    <DataFreshnessBadge freshness={freshState.data} />
                )}
            </div>

            {/* Filters */}
            <FilterBar filters={filters} onFilterChange={setFilters} />

            {/* ── Row 1: KPIs ──────────────────────────────── */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
                {isLoading
                    ? [...Array(6)].map((_, i) => (
                        <KPIStatCard key={i} kpi={null as unknown as never} loading />
                    ))
                    : kpis.map((kpi) => <KPIStatCard key={kpi.id} kpi={kpi} />)}
            </div>

            {/* ── Row 2: 3 Charts side by side ─────────────── */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <AcquisitionChart
                    series={acqState.status === "success" ? acqState.data : []}
                    loading={isLoading}
                />
                <FunnelChart
                    stages={funnelState.status === "success" ? funnelState.data : []}
                    loading={isLoading}
                />
                <FinancialChart
                    series={finState.status === "success" ? finState.data : []}
                    loading={isLoading}
                />
            </div>

            {/* ── Row 3: Top 5 + Alerts ────────────────────── */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <TopItemsTable
                    items={topState.status === "success" ? topState.data : []}
                    loading={topState.status === "loading"}
                />
                <InsightsList
                    insights={insightsState.status === "success" ? insightsState.data : []}
                    loading={insightsState.status === "loading"}
                />
            </div>
        </div>
    );
}
