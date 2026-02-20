/* ── Global Dashboard Types ──────────────────────────── */

export interface KPI {
    id: string;
    label: string;
    value: number;
    formattedValue: string;
    previousValue: number;
    target?: number;
    unit: "currency" | "percent" | "number";
    trend: "up" | "down" | "stable";
    variationPercent: number;
    sparklineData?: number[];
}

export interface SeriesPoint {
    date: string;
    value: number;
    label?: string;
}

export interface ChartSeries {
    id: string;
    name: string;
    color?: string;
    data: SeriesPoint[];
}

export interface FunnelStage {
    id: string;
    label: string;
    value: number;
    percent: number;
    color?: string;
}

export interface TopItem {
    id: string;
    rank: number;
    label: string;
    value: number;
    formattedValue: string;
    change?: number;
    metadata?: Record<string, string>;
}

export interface Insight {
    id: string;
    type: "alert" | "opportunity" | "info";
    severity: "critical" | "warning" | "info";
    title: string;
    description: string;
    metric?: string;
    actionLabel?: string;
    timestamp: string;
}

export interface FilterState {
    period: "7d" | "15d" | "30d" | "90d" | "custom";
    unit?: string;
    channel?: string;
    professional?: string;
}

export interface DataFreshness {
    lastUpdated: string;
    status: "fresh" | "stale" | "error";
    source: string;
}

export type AsyncState<T> =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; error: string };

/* ── Data Record (flat normalized for associative engine) ── */

export interface DataRecord {
    date: string;
    channel: string;
    unit: string;
    leads: number;
    qualified: number;
    appointments: number;
    showed: number;
    conversions: number;
    revenue: number;
    cost: number;
}
