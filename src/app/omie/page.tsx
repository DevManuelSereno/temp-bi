"use client";

import { OmieExpensesChart } from "@/modules/omie/components/omie-expenses-chart";
import { OmieRevenueChart } from "@/modules/omie/components/omie-revenue-chart";
import { OmieTransactionsTable } from "@/modules/omie/components/omie-transactions-table";
import {
    getOmieExpensesByCategory,
    getOmieMonthlySeries,
    getOmieSummary,
    getOmieTransactions,
} from "@/modules/omie/services/omie-service";
import { useAsyncData } from "@/shared/hooks/use-async-data";
import { KPIStatCard } from "@/shared/ui/kpi-stat-card";
import { SectionHeader } from "@/shared/ui/section-header";
import type { OmieExpenseCategory, OmieKPI, OmieMonthlyPoint, OmieTransaction } from "@/types/omie";
import { useCallback } from "react";

export default function OmiePage() {
    const { state: kpiState } = useAsyncData<OmieKPI[]>(useCallback(() => getOmieSummary(), []));
    const { state: seriesState } = useAsyncData<OmieMonthlyPoint[]>(useCallback(() => getOmieMonthlySeries(), []));
    const { state: expensesState } = useAsyncData<OmieExpenseCategory[]>(useCallback(() => getOmieExpensesByCategory(), []));
    const { state: txState } = useAsyncData<OmieTransaction[]>(useCallback(() => getOmieTransactions(), []));

    const kpiLoading = kpiState.status === "loading";
    const kpis = kpiState.status === "success" ? kpiState.data : [];

    const seriesLoading = seriesState.status === "loading";
    const series = seriesState.status === "success" ? seriesState.data : [];

    const expensesLoading = expensesState.status === "loading";
    const expenses = expensesState.status === "success" ? expensesState.data : [];

    const txLoading = txState.status === "loading";
    const transactions = txState.status === "success" ? txState.data : [];

    return (
        <div className="flex flex-col gap-6">
            {/* ── Header ────────────────────────────────── */}
            <SectionHeader
                title="Omie — Financeiro"
                subtitle="Visão consolidada de receitas, despesas e resultados"
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
                <OmieRevenueChart data={series} loading={seriesLoading} />
                <OmieExpensesChart data={expenses} loading={expensesLoading} />
            </div>

            {/* ── Transactions ───────────────────────────── */}
            <OmieTransactionsTable
                transactions={transactions}
                loading={txLoading}
            />
        </div>
    );
}
