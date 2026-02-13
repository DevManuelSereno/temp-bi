"use client";

import { useCallback } from "react";
import { KPIStatCard } from "@/shared/ui/kpi-stat-card";
import { DataFreshnessBadge } from "@/shared/ui/data-freshness-badge";
import { AcquisitionChart } from "@/modules/dashboard/components/acquisition-chart";
import { FinancialChart } from "@/modules/dashboard/components/financial-chart";
import { useAsyncData } from "@/modules/dashboard/hooks/use-async-data";
import {
  getKPIs,
  getAcquisitionSeries,
  getFinancialSeries,
  getDataFreshness,
} from "@/modules/dashboard/services/dashboard-service";

export default function DashboardOverviewPage() {
  const { state: kpiState } = useAsyncData(useCallback(() => getKPIs(), []));
  const { state: acqState } = useAsyncData(useCallback(() => getAcquisitionSeries(), []));
  const { state: finState } = useAsyncData(useCallback(() => getFinancialSeries(), []));
  const { state: freshState } = useAsyncData(useCallback(() => getDataFreshness(), []));

  const isLoading =
    kpiState.status === "loading" ||
    acqState.status === "loading" ||
    finState.status === "loading";

  // Show first 4 KPIs on overview
  const kpis = kpiState.status === "success" ? kpiState.data.slice(0, 4) : [];

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight">
            Visão Geral
          </h1>
          <p className="text-sm text-muted-foreground">
            Resumo executivo do seu negócio
          </p>
        </div>
        {freshState.status === "success" && (
          <DataFreshnessBadge freshness={freshState.data} />
        )}
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? [...Array(4)].map((_, i) => (
            <KPIStatCard key={i} kpi={null as unknown as never} loading />
          ))
          : kpis.map((kpi) => <KPIStatCard key={kpi.id} kpi={kpi} />)}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AcquisitionChart
          series={acqState.status === "success" ? acqState.data : []}
          loading={isLoading}
        />
        <FinancialChart
          series={finState.status === "success" ? finState.data : []}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
