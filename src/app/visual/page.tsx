"use client";

import { AcquisitionChart } from "@/modules/dashboard/components/acquisition-chart";
import { FinancialChart } from "@/modules/dashboard/components/financial-chart";
import { FunnelChart } from "@/modules/dashboard/components/funnel-chart";
import { TopItemsTable } from "@/modules/dashboard/components/top-items-table";
{/* ── Insights (Removed) ─────────────────────── */ }

import {
    getDataFreshness,
    getDataRecords,
    getTopItems,
} from "@/modules/dashboard/services/dashboard-service";
import { AssociativeProvider } from "@/shared/engine/associative-context";
import { useFilteredFunnel, useFilteredKPIs, useFilteredSeries } from "@/shared/engine/hooks";
import { useAsyncData } from "@/shared/hooks/use-async-data";
import { DataFreshnessBadge } from "@/shared/ui/data-freshness-badge";
import { FilterBar } from "@/shared/ui/filter-bar";
import { KPIStatCard } from "@/shared/ui/kpi-stat-card";
import { SectionHeader } from "@/shared/ui/section-header";
import type { DataFreshness as DataFreshnessType, TopItem } from "@/types/dashboard";
import { useCallback } from "react";

function VisualContent() {
    const { kpis, loading: kpiLoading } = useFilteredKPIs();
    const { acquisitionSeries, financialSeries, loading: seriesLoading } = useFilteredSeries();
    const { stages, loading: funnelLoading } = useFilteredFunnel();

    const { state: topState } = useAsyncData<TopItem[]>(useCallback(() => getTopItems(), []));
    const { state: freshState } = useAsyncData<DataFreshnessType>(
        useCallback(() => getDataFreshness(), [])
    );

    const topLoading = topState.status === "loading";
    const topItems = topState.status === "success" ? topState.data : [];
    const freshness = freshState.status === "success" ? freshState.data : undefined;

    return (
        <div className="flex flex-col gap-6">
            {/* ── Header ────────────────────────────────── */}
            <SectionHeader
                title="Dashboard Visual"
                subtitle="Análise completa com filtros associativos"
                badge={freshness ? <DataFreshnessBadge freshness={freshness} /> : undefined}
            />

            {/* ── Filtros Associativos ───────────────────── */}
            <FilterBar />

            {/* ── KPI Cards ──────────────────────────────── */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
                {kpiLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <KPIStatCard key={i} loading />
                    ))
                    : kpis.map((kpi) => <KPIStatCard key={kpi.id} kpi={kpi} />)}
            </div>

            {/* ── Charts ─────────────────────────────────── */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <AcquisitionChart series={acquisitionSeries} loading={seriesLoading} />
                <FinancialChart series={financialSeries} loading={seriesLoading} />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <FunnelChart stages={stages} loading={funnelLoading} />
                <TopItemsTable items={topItems} loading={topLoading} />
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
