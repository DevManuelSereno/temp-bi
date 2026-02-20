"use client";

import { AssociativeContext } from "@/shared/engine/associative-context";
import type { DerivedAssociativeData } from "@/types/associative";
import type { ChartSeries, DataRecord, FunnelStage, KPI } from "@/types/dashboard";
import { useContext, useMemo } from "react";

/* ── Base context hook ────────────────────────────── */

export function useAssociativeContext() {
    return useContext(AssociativeContext);
}

/* ── Filter controls ──────────────────────────────── */

export function useAssociativeFilters() {
    const { derived, toggleValue, clearDimension, clearAll } = useAssociativeContext();

    return {
        dimensions: derived.dimensions,
        hasActiveFilters: derived.hasActiveFilters,
        toggleValue,
        clearDimension,
        clearAll,
    };
}

/* ── Generic memoized selector ────────────────────── */

export function useAssociativeSelector<T>(selector: (derived: DerivedAssociativeData) => T): T {
    const { derived } = useAssociativeContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => selector(derived), [derived]);
}

/* ── Specialized selectors ────────────────────────── */

export function useFilteredKPIs(): { kpis: KPI[]; loading: boolean } {
    const { derived, loading } = useAssociativeContext();
    return { kpis: derived.kpis, loading };
}

export function useFilteredSeries(): {
    acquisitionSeries: ChartSeries[];
    financialSeries: ChartSeries[];
    loading: boolean;
} {
    const { derived, loading } = useAssociativeContext();
    return {
        acquisitionSeries: derived.acquisitionSeries,
        financialSeries: derived.financialSeries,
        loading,
    };
}

export function useFilteredFunnel(): { stages: FunnelStage[]; loading: boolean } {
    const { derived, loading } = useAssociativeContext();
    return { stages: derived.funnelStages, loading };
}

export function useFilteredRecords(): { records: DataRecord[]; loading: boolean } {
    const { derived, loading } = useAssociativeContext();
    return { records: derived.filteredRecords, loading };
}
