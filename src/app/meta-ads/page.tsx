"use client";

import { AcquisitionChart } from "@/modules/dashboard/components/acquisition-chart";
import { getAcquisitionSeries, getDataRecords } from "@/modules/dashboard/services/dashboard-service";
import { MetaAdsCampaignsTable } from "@/modules/meta-ads/components/meta-ads-campaigns-table";
import { MetaAdsTimeSeriesChart } from "@/modules/meta-ads/components/meta-ads-time-series-chart";
import { MetaAdsTopCampaignsChart } from "@/modules/meta-ads/components/meta-ads-top-campaigns-chart";
import {
    getMetaAdsCampaigns,
    getMetaAdsSummary,
    getMetaAdsTimeSeries,
} from "@/modules/meta-ads/services/meta-ads-service";
import { AssociativeProvider } from "@/shared/engine/associative-context";
import { useAsyncData } from "@/shared/hooks/use-async-data";
import { FilterBar } from "@/shared/ui/filter-bar";
import { KPIStatCard } from "@/shared/ui/kpi-stat-card";
import { SectionHeader } from "@/shared/ui/section-header";
import type { ChartSeries } from "@/types/dashboard";
import type { MetaAdsCampaign, MetaAdsKPI, MetaAdsTimePoint } from "@/types/meta-ads";
import { useCallback } from "react";

function MetaAdsContent() {
    const { state: kpiState } = useAsyncData<MetaAdsKPI[]>(useCallback(() => getMetaAdsSummary(), []));
    const { state: seriesState } = useAsyncData<MetaAdsTimePoint[]>(useCallback(() => getMetaAdsTimeSeries(), []));
    const { state: campaignsState } = useAsyncData<MetaAdsCampaign[]>(useCallback(() => getMetaAdsCampaigns(), []));

    const kpiLoading = kpiState.status === "loading";
    const kpis = kpiState.status === "success" ? kpiState.data : [];

    const seriesLoading = seriesState.status === "loading";
    const series = seriesState.status === "success" ? seriesState.data : [];

    const campaignsLoading = campaignsState.status === "loading";
    const campaigns = campaignsState.status === "success" ? campaignsState.data : [];

    const { state: acquisitionState } = useAsyncData<ChartSeries[]>(useCallback(() => getAcquisitionSeries(), []));
    const acquisitionLoading = acquisitionState.status === "loading";
    const acquisitionSeries = acquisitionState.status === "success" ? acquisitionState.data : [];

    return (
        <div className="flex flex-col gap-6">
            {/* ── Header ───────────────────────────────────────── */}
            <SectionHeader
                title="Meta Ads — Performance"
                subtitle="Investimento, leads e métricas de mídia paga"
            />

            {/* ── Filtros ────────────────────────────────────────── */}
            <FilterBar />

            {/* ── KPI Row ────────────────────────────────────────── */}
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

            {/* ── Charts ────────────────────────────────────────── */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <MetaAdsTimeSeriesChart data={series} loading={seriesLoading} />
                <MetaAdsTopCampaignsChart campaigns={campaigns} loading={campaignsLoading} />
            </div>

            {/* ── Aquisição por Canal ───────────────────────────── */}
            <AcquisitionChart series={acquisitionSeries} loading={acquisitionLoading} />

            {/* ── Campaigns Table ────────────────────────────────── */}
            <MetaAdsCampaignsTable
                campaigns={campaigns}
                loading={campaignsLoading}
            />
        </div>
    );
}

export default function MetaAdsPage() {
    const fetcher = useCallback(() => getDataRecords(), []);

    return (
        <AssociativeProvider fetcher={fetcher}>
            <MetaAdsContent />
        </AssociativeProvider>
    );
}
