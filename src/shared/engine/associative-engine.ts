import { formatCompact, formatCurrency, formatPercent } from "@/shared/lib/formatters";
import type {
    AssociativeState,
    AssociativeValueState,
    DerivedAssociativeData,
    Dimension,
    DimensionDefinition,
    DimensionValue,
} from "@/types/associative";
import type { ChartSeries, DataRecord, FunnelStage, KPI } from "@/types/dashboard";

/* ══════════════════════════════════════════════════════
   Associative Engine — Pure Functions (zero React)
   ══════════════════════════════════════════════════════ */

/* ── Filter records by active selections ──────────── */

export function filterRecords(
    records: DataRecord[],
    selections: Record<string, Set<string>>,
    dimensionDefs: DimensionDefinition[],
    excludeDimensionId?: string
): DataRecord[] {
    return records.filter((record) => {
        for (const [dimId, selectedValues] of Object.entries(selections)) {
            if (dimId === excludeDimensionId) continue;
            if (selectedValues.size === 0) continue;

            const dimDef = dimensionDefs.find((d) => d.id === dimId);
            if (!dimDef) continue;

            const recordValue = String(record[dimDef.field]);
            if (!selectedValues.has(recordValue)) return false;
        }
        return true;
    });
}

/* ── Compute dimension value states ───────────────── */

export function computeDimensions(
    allRecords: DataRecord[],
    selections: Record<string, Set<string>>,
    dimensionDefs: DimensionDefinition[]
): Dimension[] {
    const hasAnySelection = Object.values(selections).some((s) => s.size > 0);

    return dimensionDefs.map((def) => {
        const allValues = new Set<string>();
        for (const record of allRecords) {
            allValues.add(String(record[def.field]));
        }

        const filteredByOthers = filterRecords(allRecords, selections, dimensionDefs, def.id);
        const availableValues = new Set<string>();
        for (const record of filteredByOthers) {
            availableValues.add(String(record[def.field]));
        }

        const selectedSet = selections[def.id] || new Set<string>();

        const values: DimensionValue[] = Array.from(allValues)
            .sort()
            .map((valueId) => {
                let state: AssociativeValueState;
                if (selectedSet.has(valueId)) {
                    state = "selected";
                } else if (!hasAnySelection || availableValues.has(valueId)) {
                    state = "associated";
                } else {
                    state = "excluded";
                }
                return { id: valueId, label: valueId, state };
            });

        return { id: def.id, label: def.label, field: def.field, values };
    });
}

/* ── Aggregate helpers ────────────────────────────── */

interface Totals {
    leads: number;
    qualified: number;
    appointments: number;
    showed: number;
    conversions: number;
    revenue: number;
    cost: number;
}

const ZERO_TOTALS: Totals = {
    leads: 0, qualified: 0, appointments: 0,
    showed: 0, conversions: 0, revenue: 0, cost: 0,
};

function aggregateTotals(records: DataRecord[]): Totals {
    return records.reduce(
        (acc, r) => ({
            leads: acc.leads + r.leads,
            qualified: acc.qualified + r.qualified,
            appointments: acc.appointments + r.appointments,
            showed: acc.showed + r.showed,
            conversions: acc.conversions + r.conversions,
            revenue: acc.revenue + r.revenue,
            cost: acc.cost + r.cost,
        }),
        { ...ZERO_TOTALS }
    );
}

function aggregateByDate(records: DataRecord[]): Record<string, Totals> {
    const byDate: Record<string, Totals> = {};
    for (const r of records) {
        if (!byDate[r.date]) byDate[r.date] = { ...ZERO_TOTALS };
        byDate[r.date].leads += r.leads;
        byDate[r.date].qualified += r.qualified;
        byDate[r.date].appointments += r.appointments;
        byDate[r.date].showed += r.showed;
        byDate[r.date].conversions += r.conversions;
        byDate[r.date].revenue += r.revenue;
        byDate[r.date].cost += r.cost;
    }
    return byDate;
}

/* ── Derive KPIs from filtered records ────────────── */

export function aggregateKPIs(filteredRecords: DataRecord[]): KPI[] {
    if (filteredRecords.length === 0) return [];

    const totals = aggregateTotals(filteredRecords);
    const weeklyData = aggregateByDate(filteredRecords);
    const dates = Object.keys(weeklyData).sort();

    const lastWeek = dates.length > 0 ? weeklyData[dates[dates.length - 1]] : totals;
    const prevWeek = dates.length > 1 ? weeklyData[dates[dates.length - 2]] : lastWeek;

    function variation(current: number, previous: number): number {
        if (previous === 0) return 0;
        return Math.round(((current - previous) / previous) * 1000) / 10;
    }

    function trend(v: number): "up" | "down" | "stable" {
        if (v > 1) return "up";
        if (v < -1) return "down";
        return "stable";
    }

    const margin = totals.revenue > 0
        ? ((totals.revenue - totals.cost) / totals.revenue) * 100
        : 0;
    const showRate = totals.appointments > 0
        ? (totals.showed / totals.appointments) * 100
        : 0;

    const marginCurr = lastWeek.revenue > 0 ? ((lastWeek.revenue - lastWeek.cost) / lastWeek.revenue) * 100 : 0;
    const marginPrev = prevWeek.revenue > 0 ? ((prevWeek.revenue - prevWeek.cost) / prevWeek.revenue) * 100 : 0;
    const showRateCurr = lastWeek.appointments > 0 ? (lastWeek.showed / lastWeek.appointments) * 100 : 0;
    const showRatePrev = prevWeek.appointments > 0 ? (prevWeek.showed / prevWeek.appointments) * 100 : 0;

    const revenueVar = variation(lastWeek.revenue, prevWeek.revenue);
    const leadsVar = variation(lastWeek.leads, prevWeek.leads);
    const marginVar = Math.round((marginCurr - marginPrev) * 10) / 10;
    const apptVar = variation(lastWeek.appointments, prevWeek.appointments);
    const showRateVar = Math.round((showRateCurr - showRatePrev) * 10) / 10;

    const uniqueUnits = new Set(filteredRecords.map((r) => r.unit)).size;
    const capacityPerWeek = uniqueUnits * 50;
    const totalCapacity = capacityPerWeek * dates.length;
    const occupancy = totalCapacity > 0
        ? Math.min((totals.appointments / totalCapacity) * 100, 100)
        : 0;

    return [
        {
            id: "receita",
            label: "Receita",
            value: totals.revenue,
            formattedValue: formatCurrency(totals.revenue),
            previousValue: totals.revenue - lastWeek.revenue,
            target: 500000,
            unit: "currency",
            trend: trend(revenueVar),
            variationPercent: revenueVar,
            sparklineData: dates.map((d) => weeklyData[d].revenue),
        },
        {
            id: "margem",
            label: "Margem",
            value: Math.round(margin * 10) / 10,
            formattedValue: formatPercent(margin),
            previousValue: Math.round(marginPrev * 10) / 10,
            target: 35,
            unit: "percent",
            trend: trend(marginVar),
            variationPercent: marginVar,
            sparklineData: dates.map((d) => {
                const r = weeklyData[d].revenue;
                return r > 0 ? Math.round(((r - weeklyData[d].cost) / r) * 1000) / 10 : 0;
            }),
        },
        {
            id: "leads",
            label: "Leads",
            value: totals.leads,
            formattedValue: formatCompact(totals.leads),
            previousValue: totals.leads - lastWeek.leads,
            target: 2000,
            unit: "number",
            trend: trend(leadsVar),
            variationPercent: leadsVar,
            sparklineData: dates.map((d) => weeklyData[d].leads),
        },
        {
            id: "agendamentos",
            label: "Agendamentos",
            value: totals.appointments,
            formattedValue: formatCompact(totals.appointments),
            previousValue: totals.appointments - lastWeek.appointments,
            unit: "number",
            trend: trend(apptVar),
            variationPercent: apptVar,
            sparklineData: dates.map((d) => weeklyData[d].appointments),
        },
        {
            id: "show-rate",
            label: "Show Rate",
            value: Math.round(showRate * 10) / 10,
            formattedValue: formatPercent(showRate),
            previousValue: Math.round(showRatePrev * 10) / 10,
            target: 80,
            unit: "percent",
            trend: trend(showRateVar),
            variationPercent: showRateVar,
            sparklineData: dates.map((d) => {
                const a = weeklyData[d].appointments;
                return a > 0 ? Math.round((weeklyData[d].showed / a) * 1000) / 10 : 0;
            }),
        },
        {
            id: "ocupacao",
            label: "Ocupação",
            value: Math.round(occupancy * 10) / 10,
            formattedValue: formatPercent(occupancy),
            previousValue: Math.round(occupancy * 0.98 * 10) / 10,
            target: 85,
            unit: "percent",
            trend: occupancy > 80 ? "up" : "stable",
            variationPercent: 2.0,
            sparklineData: dates.map((d) => {
                return capacityPerWeek > 0
                    ? Math.round((weeklyData[d].appointments / capacityPerWeek) * 1000) / 10
                    : 0;
            }),
        },
    ];
}

/* ── Derive acquisition series (leads by channel × date) ── */

export function aggregateAcquisitionSeries(filteredRecords: DataRecord[]): ChartSeries[] {
    const byChannel: Record<string, Record<string, number>> = {};

    for (const r of filteredRecords) {
        if (!byChannel[r.channel]) byChannel[r.channel] = {};
        if (!byChannel[r.channel][r.date]) byChannel[r.channel][r.date] = 0;
        byChannel[r.channel][r.date] += r.leads;
    }

    return Object.entries(byChannel).map(([channel, dateValues]) => ({
        id: channel.toLowerCase().replace(/\s+/g, "-"),
        name: channel,
        data: Object.entries(dateValues)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, value]) => ({ date, value })),
    }));
}

/* ── Derive financial series (revenue + cost × date) ──── */

export function aggregateFinancialSeries(filteredRecords: DataRecord[]): ChartSeries[] {
    const byDate: Record<string, { revenue: number; cost: number }> = {};

    for (const r of filteredRecords) {
        if (!byDate[r.date]) byDate[r.date] = { revenue: 0, cost: 0 };
        byDate[r.date].revenue += r.revenue;
        byDate[r.date].cost += r.cost;
    }

    const dates = Object.keys(byDate).sort();
    return [
        {
            id: "revenue",
            name: "Receita",
            data: dates.map((date) => ({ date, value: byDate[date].revenue })),
        },
        {
            id: "cost",
            name: "Custo",
            data: dates.map((date) => ({ date, value: byDate[date].cost })),
        },
    ];
}

/* ── Derive funnel stages ─────────────────────────── */

export function aggregateFunnelStages(filteredRecords: DataRecord[]): FunnelStage[] {
    const totals = aggregateTotals(filteredRecords);
    if (totals.leads === 0) return [];

    const pct = (v: number) => Math.round((v / totals.leads) * 1000) / 10;

    return [
        { id: "leads", label: "Leads", value: totals.leads, percent: 100 },
        { id: "qualified", label: "Qualificados", value: totals.qualified, percent: pct(totals.qualified) },
        { id: "scheduled", label: "Agendados", value: totals.appointments, percent: pct(totals.appointments) },
        { id: "showed", label: "Compareceram", value: totals.showed, percent: pct(totals.showed) },
        { id: "converted", label: "Convertidos", value: totals.conversions, percent: pct(totals.conversions) },
    ];
}

/* ── Full derivation entry point ──────────────────── */

export function deriveAssociativeData(
    state: AssociativeState,
    dimensionDefs: DimensionDefinition[]
): DerivedAssociativeData {
    const hasActiveFilters = Object.values(state.selections).some((s) => s.size > 0);

    const filteredRecords = hasActiveFilters
        ? filterRecords(state.records, state.selections, dimensionDefs)
        : state.records;

    const dimensions = computeDimensions(state.records, state.selections, dimensionDefs);
    const kpis = aggregateKPIs(filteredRecords);
    const acquisitionSeries = aggregateAcquisitionSeries(filteredRecords);
    const financialSeries = aggregateFinancialSeries(filteredRecords);
    const funnelStages = aggregateFunnelStages(filteredRecords);

    return {
        filteredRecords,
        dimensions,
        kpis,
        acquisitionSeries,
        financialSeries,
        funnelStages,
        hasActiveFilters,
    };
}
