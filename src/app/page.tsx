"use client";

import { cn } from "@/lib/utils";
import { FunnelChart } from "@/modules/dashboard/components/funnel-chart";
import { InsightsList } from "@/modules/dashboard/components/insights-list";
import { TopItemsTable } from "@/modules/dashboard/components/top-items-table";
import { getInsights, getTopItems } from "@/modules/dashboard/services/dashboard-service";
import { getGHLPipeline, getGHLSummary } from "@/modules/ghl/services/ghl-service";
import { LeadTypesPieChart } from "@/modules/meta-ads/components/lead-types-pie-chart";
import { getMetaAdsLeadTypes, getMetaAdsSummary } from "@/modules/meta-ads/services/meta-ads-service";
import { OmieRevenueChart } from "@/modules/omie/components/omie-revenue-chart";
import { getOmieMonthlySeries, getOmieSummary } from "@/modules/omie/services/omie-service";
import { useAsyncData } from "@/shared/hooks/use-async-data";
import { formatCompact } from "@/shared/lib/formatters";
import { KPIStatCard } from "@/shared/ui/kpi-stat-card";
import { RevenueTargetCounter } from "@/shared/ui/revenue-target-counter";
import { SectionHeader } from "@/shared/ui/section-header";
import type { FunnelStage, Insight, KPI, TopItem } from "@/types/dashboard";
import type { GHLKPI, GHLPipelineStage } from "@/types/ghl";
import type { MetaAdsKPI, MetaAdsLeadTypeBreakdown } from "@/types/meta-ads";
import type { OmieKPI, OmieMonthlyPoint } from "@/types/omie";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useCallback } from "react";

/* ── KPI IDs to pick from each source ────────────────── */

const OMIE_PICK = ["receita-total", "lucro-total", "margem"];
const GHL_PICK = ["leads", "conversoes", "taxa-conversao"];
const META_PICK = ["investimento", "cpl", "roas"];

/* ── Leads Target ──────────────────────────────────────── */

const LEADS_TARGET = 1500;
const currentLeads = 1400;

function getLeadsTone(current: number) {
  if (current <= 1200) return "destructive";
  if (current < 1500) return "warning";
  return "success";
}

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
            <div key={i} className="min-w-0 overflow-hidden">
              <KPIStatCard loading className="h-full w-[455px]" />
            </div>
          ))
          : kpis.map((kpi) => (
            <div key={kpi.id} className="min-w-0 overflow-hidden">
              <KPIStatCard kpi={kpi} className="h-full w-[455px]" />
            </div>
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
  const { state: insightState } = useAsyncData<Insight[]>(useCallback(() => getInsights(), []));

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

  const { state: metaLeadTypesState } = useAsyncData<MetaAdsLeadTypeBreakdown[]>(useCallback(() => getMetaAdsLeadTypes(), []));

  const seriesLoading = seriesState.status === "loading";
  const series = seriesState.status === "success" ? seriesState.data : [];

  const pipelineLoading = pipelineState.status === "loading";
  const pipeline = pipelineState.status === "success" ? pipelineState.data : [];

  const insightLoading = insightState.status === "loading";
  const insights = insightState.status === "success" ? insightState.data : [];

  const { state: topItemsState } = useAsyncData<TopItem[]>(useCallback(() => getTopItems(), []));
  const topItemsLoading = topItemsState.status === "loading";
  const topItems = topItemsState.status === "success" ? topItemsState.data : [];

  return (
    <div className="flex flex-col gap-8">
      {/* ── Header ────────────────────────────────── */}
      <SectionHeader
        title="Resumo Executivo"
        subtitle="Visão consolidada — Financeiro, Comercial e Mídia"
      />

      {/* ── Revenue Target ────────────────────────── */}
      <RevenueTargetCounter
        current={omieKpis.find(k => k.id === "receita-total")?.value ?? 0}
        target={400000}
        loading={omieLoading}
        className="w-[1390px]"
      />

      {/* ── Leads Target ──────────────────────────── */}
      {(() => {
        if (omieLoading) {
          return <div className="frame-card animate-pulse h-[100px] w-[1390px]" />;
        }
        const leadsProgress = Math.min((currentLeads / LEADS_TARGET) * 100, 100);
        const leadsDiff = LEADS_TARGET - currentLeads;
        const leadsIsMet = leadsDiff <= 0;
        const leadsTone = getLeadsTone(currentLeads);
        const LeadsIcon = leadsTone === "success" ? CheckCircle2 : (leadsTone === "warning" ? AlertTriangle : AlertCircle);
        const leadsTextColor = leadsTone === "destructive" ? "text-destructive" : leadsTone === "warning" ? "text-warning" : "text-success";
        return (
          <div className="frame-card flex flex-col justify-center gap-2 py-4 px-6 relative overflow-hidden w-[1390px]">
            <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20 transition-all duration-1000" style={{ width: `${leadsProgress}%`, color: 'currentColor' }} />
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Meta de Leads (Mês)
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <LeadsIcon className={cn("h-5 w-5", leadsTextColor)} />
                  <h2 className={cn("text-xl font-bold font-serif tracking-tight", leadsTextColor)}>
                    {leadsIsMet
                      ? `Meta batida ✅ +${formatCompact(Math.abs(leadsDiff))} acima da meta`
                      : `Faltam ${formatCompact(leadsDiff)} leads para bater a meta`
                    }
                  </h2>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full bg-muted/50", leadsTextColor)}>
                  {leadsTone === "success" ? "Excelente" : (leadsTone === "warning" ? "Em progresso" : "Atenção")}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
              <span>Atual: <strong className="text-foreground">{formatCompact(currentLeads)}</strong></span>
              <span>Meta: <strong>{formatCompact(LEADS_TARGET)}</strong></span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full mt-2 overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-1000 ease-out rounded-full",
                  leadsTone === "destructive" && "bg-destructive",
                  leadsTone === "warning" && "bg-warning",
                  leadsTone === "success" && "bg-success"
                )}
                style={{ width: `${leadsProgress}%` }}
              />
            </div>
          </div>
        );
      })()}

      {/* ── Omie Section (Financeiro) ───────────────── */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Financeiro · Omie
        </span>
        <div className="grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-6 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3 shrink-0">
            {omieLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="min-w-0 overflow-hidden">
                  <KPIStatCard loading className="h-full w-[455px]" />
                </div>
              ))
              : omieKpis.map((kpi) => (
                <div key={kpi.id} className="min-w-0 overflow-hidden">
                  <KPIStatCard kpi={kpi} className="h-full w-[455px]" />
                </div>
              ))}
          </div>

          <OmieRevenueChart
            data={series}
            loading={seriesLoading}
            className="h-full min-h-[400px]"
          />
        </div>
      </div>

      {/* ── GHL Section (Comercial) ─────────────────── */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Comercial · GHL
        </span>
        <div className="grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-6 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3 shrink-0">
            {ghlLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="min-w-0 overflow-hidden">
                  <KPIStatCard loading className="h-full w-[455px]" />
                </div>
              ))
              : ghlKpis.map((kpi) => (
                <div key={kpi.id} className="min-w-0 overflow-hidden">
                  <KPIStatCard kpi={kpi} className="h-full w-[455px]" />
                </div>
              ))}
          </div>

          <FunnelChart
            stages={pipeline as FunnelStage[]}
            loading={pipelineLoading}
            className="h-full min-h-[400px]"
          />
        </div>
      </div>

      {/* ── Meta Ads Section (Mídia) ────────────────── */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Mídia · Meta Ads
        </span>
        <div className="grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-6 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3 shrink-0">
            {metaLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="min-w-0 overflow-hidden">
                  <KPIStatCard loading className="h-full w-[455px]" />
                </div>
              ))
              : metaKpis.map((kpi) => (
                <div key={kpi.id} className="min-w-0 overflow-hidden">
                  <KPIStatCard kpi={kpi} className="h-full w-[455px]" />
                </div>
              ))}
          </div>

          <LeadTypesPieChart
            data={metaLeadTypesState.status === "success" ? metaLeadTypesState.data : []}
            loading={metaLeadTypesState.status === "loading"}
            className="h-full min-h-[400px]"
          />
        </div>
      </div>

      {/* ── Top 5 Procedimentos ─────────────────────── */}
      <TopItemsTable items={topItems} loading={topItemsLoading} />

      {/* ── Insights ───────────────────────────────── */}
      <InsightsList insights={insights} loading={insightLoading} />
    </div>
  );
}