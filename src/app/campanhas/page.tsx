"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AcquisitionChart } from "@/modules/dashboard/components/acquisition-chart";
import { getAcquisitionSeries } from "@/modules/dashboard/services/dashboard-service";
import { CampanhasCampaignsTable } from "@/modules/campanhas/components/campanhas-campaigns-table";
import { CampanhasTimeSeriesChart } from "@/modules/campanhas/components/campanhas-time-series-chart";
import { CampanhasTopCampaignsChart } from "@/modules/campanhas/components/campanhas-top-campaigns-chart";
import {
    getCampanhasCampaigns,
    getCampanhasSummary,
    getCampanhasTimeSeries,
} from "@/modules/campanhas/services/campanhas-service";
import { useAsyncData } from "@/shared/hooks/use-async-data";
import { KPIStatCard } from "@/shared/ui/kpi-stat-card";
import {
    DEFAULT_FILTERS,
    PageFilters,
    type PageFiltersState,
} from "@/shared/ui/page-filters";
import { SectionHeader } from "@/shared/ui/section-header";
import type { ChartSeries } from "@/types/dashboard";
import type { CampanhasCampaign, CampanhasKPI, CampanhasTimePoint } from "@/types/campanhas";
import { useCallback, useMemo, useState } from "react";

export default function CampanhasPage() {
    const [filters, setFilters] = useState<PageFiltersState>(DEFAULT_FILTERS);
    const [campanha, setCampanha] = useState("all");

    const { state: kpiState } = useAsyncData<CampanhasKPI[]>(useCallback(() => getCampanhasSummary(), []));
    const { state: seriesState } = useAsyncData<CampanhasTimePoint[]>(useCallback(() => getCampanhasTimeSeries(), []));
    const { state: campaignsState } = useAsyncData<CampanhasCampaign[]>(useCallback(() => getCampanhasCampaigns(), []));
    const { state: acquisitionState } = useAsyncData<ChartSeries[]>(useCallback(() => getAcquisitionSeries(), []));

    const kpiLoading = kpiState.status === "loading";
    const kpis = kpiState.status === "success" ? kpiState.data : [];
    const seriesLoading = seriesState.status === "loading";
    const series = seriesState.status === "success" ? seriesState.data : [];
    const campaignsLoading = campaignsState.status === "loading";
    const campaigns = campaignsState.status === "success" ? campaignsState.data : [];
    const acquisitionLoading = acquisitionState.status === "loading";
    const acquisitionSeries = acquisitionState.status === "success" ? acquisitionState.data : [];

    /* Build campaign options from loaded data */
    const campanhaOptions = useMemo(() => [
        { label: "Todas as campanhas", value: "all" },
        ...campaigns.map((c) => ({ label: c.name, value: c.id })),
    ], [campaigns]);

    return (
        <div className="flex flex-col gap-6">
            {/* ── Header ────────────────────────────────── */}
            <SectionHeader
                title="Campanhas — Performance"
                subtitle="Investimento, leads e métricas de mídia paga"
            />

            {/* ── Filtros ────────────────────────────────── */}
            <PageFilters
                filters={filters}
                onFiltersChange={setFilters}
                extra={
                    <Select value={campanha} onValueChange={setCampanha}>
                        <SelectTrigger className="h-7 w-[200px] text-xs">
                            <SelectValue placeholder="Campanha" />
                        </SelectTrigger>
                        <SelectContent>
                            {campanhaOptions.map((o) => (
                                <SelectItem key={o.value} value={o.value} className="text-xs">
                                    {o.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                }
            />

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
                <CampanhasTimeSeriesChart data={series} loading={seriesLoading} />
                <CampanhasTopCampaignsChart campaigns={campaigns} loading={campaignsLoading} />
            </div>

            {/* ── Aquisição por Canal ─────────────────────── */}
            <AcquisitionChart series={acquisitionSeries} loading={acquisitionLoading} />

            {/* ── Campaigns Table ────────────────────────── */}
            <CampanhasCampaignsTable
                campaigns={campaigns}
                loading={campaignsLoading}
            />
        </div>
    );
}
