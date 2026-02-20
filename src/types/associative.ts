import type { ChartSeries, DataRecord, FunnelStage, KPI } from "@/types/dashboard";

/* ── Associative Value States ──────────────────────── */

export type AssociativeValueState = "selected" | "associated" | "excluded";

export interface DimensionValue {
    id: string;
    label: string;
    state: AssociativeValueState;
}

export interface Dimension {
    id: string;
    label: string;
    field: keyof DataRecord;
    values: DimensionValue[];
}

export interface DimensionDefinition {
    id: string;
    label: string;
    field: keyof DataRecord;
}

/* ── Associative State & Actions ──────────────────── */

export type AssociativeAction =
    | { type: "TOGGLE_VALUE"; dimensionId: string; valueId: string }
    | { type: "CLEAR_DIMENSION"; dimensionId: string }
    | { type: "CLEAR_ALL" }
    | { type: "SET_DATA"; records: DataRecord[] };

export interface AssociativeState {
    records: DataRecord[];
    selections: Record<string, Set<string>>;
}

/* ── Derived Data ─────────────────────────────────── */

export interface DerivedAssociativeData {
    filteredRecords: DataRecord[];
    dimensions: Dimension[];
    kpis: KPI[];
    acquisitionSeries: ChartSeries[];
    financialSeries: ChartSeries[];
    funnelStages: FunnelStage[];
    hasActiveFilters: boolean;
}
