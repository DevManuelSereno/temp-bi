"use client";

import { getDataRecords } from "@/modules/dashboard/services/dashboard-service";
import { GHLOpportunitiesTable } from "@/modules/ghl/components/ghl-opportunities-table";
import { GHLPipelineChart } from "@/modules/ghl/components/ghl-pipeline-chart";
import { GHLWeeklyChart } from "@/modules/ghl/components/ghl-weekly-chart";
import {
    getGHLOpportunities,
    getGHLPipeline,
    getGHLSummary,
    getGHLWeeklySeries,
} from "@/modules/ghl/services/ghl-service";
import { AssociativeProvider } from "@/shared/engine/associative-context";
import { useAsyncData } from "@/shared/hooks/use-async-data";
import { FilterBar } from "@/shared/ui/filter-bar";
import { KPIStatCard } from "@/shared/ui/kpi-stat-card";
import { SectionHeader } from "@/shared/ui/section-header";
import type { GHLKPI, GHLOpportunity, GHLPipelineStage, GHLWeeklyPoint } from "@/types/ghl";
import { useCallback } from "react";

function GHLContent() {
    const { state: kpiState } = useAsyncData<GHLKPI[]>(useCallback(() => getGHLSummary(), []));
    const { state: pipelineState } = useAsyncData<GHLPipelineStage[]>(useCallback(() => getGHLPipeline(), []));
    const { state: weeklyState } = useAsyncData<GHLWeeklyPoint[]>(useCallback(() => getGHLWeeklySeries(), []));
    const { state: opState } = useAsyncData<GHLOpportunity[]>(useCallback(() => getGHLOpportunities(), []));

    const kpiLoading = kpiState.status === "loading";
    const kpis = kpiState.status === "success" ? kpiState.data : [];

    const pipelineLoading = pipelineState.status === "loading";
    const pipeline = pipelineState.status === "success" ? pipelineState.data : [];

    const weeklyLoading = weeklyState.status === "loading";
    const weekly = weeklyState.status === "success" ? weeklyState.data : [];

    const opLoading = opState.status === "loading";
    const opportunities = opState.status === "success" ? opState.data : [];

    return (
        <div className="flex flex-col gap-6">
            {/* ── Header ────────────────────────────────── */}
            <SectionHeader
                title="GHL — Pipeline Comercial"
                subtitle="CRM, funil de vendas e performance da equipe"
            />

            {/* ── Filtros ────────────────────────────────── */}
            <FilterBar />

            {/* ── KPI Row ────────────────────────────────── */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
                {kpiLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <KPIStatCard key={i} loading />
                    ))
                    : kpis.map((kpi) => (
                        <KPIStatCard
                            key={kpi.id}
                            kpi={{
                                id: kpi.id,
                                label: kpi.label,
                                value: kpi.value,
                                formattedValue: kpi.formattedValue,
                                previousValue: kpi.previousValue ?? kpi.value,
                                unit: kpi.unit,
                                trend: kpi.trend,
                                variationPercent: kpi.variationPercent,
                                sparklineData: kpi.sparklineData,
                                target: kpi.target,
                            }}
                        />
                    ))}
            </div>

            {/* ── Charts ─────────────────────────────────── */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <GHLPipelineChart stages={pipeline} loading={pipelineLoading} />
                <GHLWeeklyChart data={weekly} loading={weeklyLoading} />
            </div>

            {/* ── Opportunities ──────────────────────────── */}
            <GHLOpportunitiesTable
                opportunities={opportunities}
                loading={opLoading}
            />
        </div>
    );
}

export default function GHLPage() {
    const fetcher = useCallback(() => getDataRecords(), []);

    return (
        <AssociativeProvider fetcher={fetcher}>
            <GHLContent />
        </AssociativeProvider>
    );
}
