/* ══════════════════════════════════════════════════════
   CRM — Type definitions
   ══════════════════════════════════════════════════════ */

export interface CRMKPI {
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

export interface CRMPipelineStage {
    id: string;
    label: string;
    value: number;
    percent: number;
}

export interface CRMWeeklyPoint {
    week: string;
    leads: number;
    qualified: number;
    appointments: number;
    conversions: number;
}

export interface CRMOpportunity {
    id: string;
    name: string;
    stage: string;
    value: number;
    assignee: string;
    updatedAt: string;
}
