"use client";

import { ERPExpensesChart } from "@/modules/erp/components/erp-expenses-chart";
import { ERPRevenueChart } from "@/modules/erp/components/erp-revenue-chart";
import { ERPTransactionsTable } from "@/modules/erp/components/erp-transactions-table";
import {
  getERPExpensesByCategory,
  getERPMonthlySeries,
  getERPSummary,
  getERPTransactions,
} from "@/modules/erp/services/erp-service";
import { useAsyncData } from "@/shared/hooks/use-async-data";
import { KPIStatCard } from "@/shared/ui/kpi-stat-card";
import { DEFAULT_FILTERS, PageFilters, type PageFiltersState } from "@/shared/ui/page-filters";
import type { ERPExpenseCategory, ERPKPI, ERPMonthlyPoint, ERPTransaction } from "@/types/erp";
import { Select } from "antd";
import { useCallback, useState } from "react";

const STATUS_OPTIONS = [
  { label: "Todos os status", value: "all" },
  { label: "Pago", value: "pago" },
  { label: "Pendente", value: "pendente" },
  { label: "Vencido", value: "vencido" },
  { label: "Cancelado", value: "cancelado" },
];

const CATEGORIA_OPTIONS = [
  { label: "Todas as categorias", value: "all" },
  { label: "Procedimentos", value: "procedimentos" },
  { label: "Consultas", value: "consultas" },
  { label: "Produtos", value: "produtos" },
  { label: "Outros", value: "outros" },
];

export default function ERPPage() {
  const [filters, setFilters] = useState<PageFiltersState>(DEFAULT_FILTERS);
  const [status, setStatus] = useState("all");
  const [categoria, setCategoria] = useState("all");

  const { state: kpiState } = useAsyncData<ERPKPI[]>(useCallback(() => getERPSummary(), []));
  const { state: seriesState } = useAsyncData<ERPMonthlyPoint[]>(useCallback(() => getERPMonthlySeries(), []));
  const { state: expensesState } = useAsyncData<ERPExpenseCategory[]>(
    useCallback(() => getERPExpensesByCategory(), []),
  );
  const { state: txState } = useAsyncData<ERPTransaction[]>(useCallback(() => getERPTransactions(), []));

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
      <PageFilters
        showDateFilters={false}
        filters={filters}
        onFiltersChange={setFilters}
        extra={
          <>
            <Select
              value={status}
              onChange={setStatus}
              options={STATUS_OPTIONS}
              className="min-w-[170px]"
              size="small"
              placeholder="Status financeiro"
            />
            <Select
              value={categoria}
              onChange={setCategoria}
              options={CATEGORIA_OPTIONS}
              className="min-w-[170px]"
              size="small"
              placeholder="Categoria"
            />
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        {kpiLoading
          ? Array.from({ length: 6 }).map((_, i) => <KPIStatCard key={i} loading />)
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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ERPRevenueChart data={series} loading={seriesLoading} />
        <ERPExpensesChart data={expenses} loading={expensesLoading} />
      </div>

      <ERPTransactionsTable transactions={transactions} loading={txLoading} />
    </div>
  );
}
