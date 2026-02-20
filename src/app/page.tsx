"use client";

import { RevenueTrendChart } from "@/modules/dashboard/components/revenue-trend-chart";
import { SimpleFunnelChart } from "@/modules/dashboard/components/simple-funnel-chart";
import { getGHLPipeline, getGHLSummary } from "@/modules/ghl/services/ghl-service";
import { getMetaAdsSummary } from "@/modules/meta-ads/services/meta-ads-service";
import { getOmieMonthlySeries, getOmieSummary } from "@/modules/omie/services/omie-service";
import { useAsyncData } from "@/shared/hooks/use-async-data";
import { KPIStatCard } from "@/shared/ui/kpi-stat-card";
import { SectionHeader } from "@/shared/ui/section-header";
import type { KPI } from "@/types/dashboard";
import type { GHLKPI, GHLPipelineStage } from "@/types/ghl";
import type { MetaAdsKPI } from "@/types/meta-ads";
import type { OmieKPI, OmieMonthlyPoint } from "@/types/omie";
import { useCallback } from "react";

/* ── KPI IDs to pick from each source ────────────────── */

const OMIE_PICK = ["receita-total", "lucro-total", "margem"];
const GHL_PICK = ["leads", "conversoes", "taxa-conversao"];
const META_PICK = ["investimento", "cpl", "roas"];

/* ── Map module KPI → dashboard KPI (for KPIStatCard) ── */

function toKPI(src: OmieKPI | GHLKPI | MetaAdsKPI): KPI {
  return {
    id: src.id,
    label: src.label,
    value: src.value,
    formattedValue: src.formattedValue,
    previousValue: src.previousValue ?? src.value,
    target: src.target,
    unit: src.unit,
    trend: src.trend,
    variationPercent: src.variationPercent,
    sparklineData: src.sparklineData,
  };
}

/* ── KPI Group ───────────────────────────────────────── */

function KPIGroup({
  title,
  kpis,
  loading,
}: {
  title: string;
  kpis: KPI[];
  loading: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </span>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
            <KPIStatCard key={i} loading />
          ))
          : kpis.map((kpi) => (
            <KPIStatCard key={kpi.id} kpi={kpi} />
          ))}
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────── */

export default function DashboardPage() {
  /* ── Data fetching ──────────────────────────────── */
  const { state: omieKpiState } = useAsyncData<OmieKPI[]>(useCallback(() => getOmieSummary(), []));
  const { state: ghlKpiState } = useAsyncData<GHLKPI[]>(useCallback(() => getGHLSummary(), []));
  const { state: metaKpiState } = useAsyncData<MetaAdsKPI[]>(useCallback(() => getMetaAdsSummary(), []));
  const { state: seriesState } = useAsyncData<OmieMonthlyPoint[]>(useCallback(() => getOmieMonthlySeries(), []));
  const { state: pipelineState } = useAsyncData<GHLPipelineStage[]>(useCallback(() => getGHLPipeline(), []));

  /* ── Derive state ───────────────────────────────── */
  const isDefined = <T,>(v: T | undefined): v is T => v !== undefined;

  const omieLoading = omieKpiState.status === "loading";
  const omieKpis = omieKpiState.status === "success"
    ? OMIE_PICK.map((id) => omieKpiState.data.find((k) => k.id === id)).filter(isDefined).map(toKPI)
    : [];

  const ghlLoading = ghlKpiState.status === "loading";
  const ghlKpis = ghlKpiState.status === "success"
    ? GHL_PICK.map((id) => ghlKpiState.data.find((k) => k.id === id)).filter(isDefined).map(toKPI)
    : [];

  const metaLoading = metaKpiState.status === "loading";
  const metaKpis = metaKpiState.status === "success"
    ? META_PICK.map((id) => metaKpiState.data.find((k) => k.id === id)).filter(isDefined).map(toKPI)
    : [];

  const seriesLoading = seriesState.status === "loading";
  const series = seriesState.status === "success" ? seriesState.data : [];

  const pipelineLoading = pipelineState.status === "loading";
  const pipeline = pipelineState.status === "success" ? pipelineState.data : [];

  return (
    <div className="flex flex-col gap-8">
      {/* ── Header ────────────────────────────────── */}
      <SectionHeader
        title="Resumo Executivo"
        subtitle="Visão consolidada — Financeiro, Comercial e Mídia"
      />

      {/* ── KPIs (3 groups × 3) ───────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <KPIGroup title="Financeiro · Omie" kpis={omieKpis} loading={omieLoading} />
        <KPIGroup title="Comercial · GHL" kpis={ghlKpis} loading={ghlLoading} />
        <KPIGroup title="Mídia · Meta Ads" kpis={metaKpis} loading={metaLoading} />
      </div>

      {/* ── Charts (2 only) ────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RevenueTrendChart data={series} loading={seriesLoading} />
        <SimpleFunnelChart stages={pipeline} loading={pipelineLoading} />
      </div>
    </div>
  );
}
