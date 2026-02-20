/* ══════════════════════════════════════════════════════
   GHL (GoHighLevel) — Type definitions
   ══════════════════════════════════════════════════════ */

export interface GHLKPI {
    id: string;
    label: string;
    value: number;
    formattedValue: string;
    previousValue?: number;
    target?: number;
    unit: "currency" | "percent" | "number";
    trend: "up" | "down" | "stable";
    variationPercent: number;
    sparklineData?: number[];
}

export interface GHLPipelineStage {
    id: string;
    label: string;
    value: number;
    percent: number;
}

export interface GHLWeeklyPoint {
    week: string;
    leads: number;
    qualified: number;
    appointments: number;
    conversions: number;
}

export interface GHLOpportunity {
    id: string;
    name: string;
    stage: string;
    value: number;
    assignee: string;
    updatedAt: string;
}
