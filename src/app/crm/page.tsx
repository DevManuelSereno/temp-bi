"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CRMOpportunitiesTable } from "@/modules/crm/components/crm-opportunities-table";
import { CRMPipelineChart } from "@/modules/crm/components/crm-pipeline-chart";
import { CRMWeeklyChart } from "@/modules/crm/components/crm-weekly-chart";
import {
    getCRMOpportunities,
    getCRMPipeline,
    getCRMSummary,
    getCRMWeeklySeries,
} from "@/modules/crm/services/crm-service";
import { useAsyncData } from "@/shared/hooks/use-async-data";
import { KPIStatCard } from "@/shared/ui/kpi-stat-card";
import {
    DEFAULT_FILTERS,
    PageFilters,
    type PageFiltersState,
} from "@/shared/ui/page-filters";
import { SectionHeader } from "@/shared/ui/section-header";
import type { CRMKPI, CRMOpportunity, CRMPipelineStage, CRMWeeklyPoint } from "@/types/crm";
import { useCallback, useState } from "react";

/* ── Mock options ─────────────────────────────────── */
const STATUS_LEAD_OPTIONS = [
    { label: "Todos os status", value: "all" },
    { label: "Novo", value: "novo" },
    { label: "Em contato", value: "em_contato" },
    { label: "Qualificado", value: "qualificado" },
    { label: "Proposta enviada", value: "proposta" },
    { label: "Ganho", value: "ganho" },
    { label: "Perdido", value: "perdido" },
];

const RESPONSAVEL_OPTIONS = [
    { label: "Todos os responsáveis", value: "all" },
    { label: "Ana Paula", value: "ana_paula" },
    { label: "Carlos Lima", value: "carlos_lima" },
    { label: "Fernanda Rocha", value: "fernanda_rocha" },
    { label: "Marcos Vinicius", value: "marcos_vinicius" },
];

export default function CRMPage() {
    const [filters, setFilters] = useState<PageFiltersState>(DEFAULT_FILTERS);
    const [statusLead, setStatusLead] = useState("all");
    const [responsavel, setResponsavel] = useState("all");

    const { state: kpiState } = useAsyncData<CRMKPI[]>(useCallback(() => getCRMSummary(), []));
    const { state: pipelineState } = useAsyncData<CRMPipelineStage[]>(useCallback(() => getCRMPipeline(), []));
    const { state: weeklyState } = useAsyncData<CRMWeeklyPoint[]>(useCallback(() => getCRMWeeklySeries(), []));
    const { state: opState } = useAsyncData<CRMOpportunity[]>(useCallback(() => getCRMOpportunities(), []));

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
                title="CRM — Pipeline Comercial"
                subtitle="CRM, funil de vendas e performance da equipe"
            />

            {/* ── Filtros ────────────────────────────────── */}
            <PageFilters
                filters={filters}
                onFiltersChange={setFilters}
                extra={
                    <>
                        <Select value={statusLead} onValueChange={setStatusLead}>
                            <SelectTrigger className="h-7 w-[170px] text-xs">
                                <SelectValue placeholder="Status do lead" />
                            </SelectTrigger>
                            <SelectContent>
                                {STATUS_LEAD_OPTIONS.map((o) => (
                                    <SelectItem key={o.value} value={o.value} className="text-xs">
                                        {o.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={responsavel} onValueChange={setResponsavel}>
                            <SelectTrigger className="h-7 w-[170px] text-xs">
                                <SelectValue placeholder="Responsável" />
                            </SelectTrigger>
                            <SelectContent>
                                {RESPONSAVEL_OPTIONS.map((o) => (
                                    <SelectItem key={o.value} value={o.value} className="text-xs">
                                        {o.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </>
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
                <CRMPipelineChart stages={pipeline} loading={pipelineLoading} />
                <CRMWeeklyChart data={weekly} loading={weeklyLoading} />
            </div>

            {/* ── Opportunities ──────────────────────────── */}
            <CRMOpportunitiesTable
                opportunities={opportunities}
                loading={opLoading}
            />
        </div>
    );
}
