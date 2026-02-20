/* ══════════════════════════════════════════════════════
   Campanhas — Type definitions
   ══════════════════════════════════════════════════════ */

export interface CampanhasKPI {
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

export interface CampanhasTimePoint {
    date: string;
    spend: number;
    leads: number;
    impressions: number;
    clicks: number;
}

export interface CampanhasCampaign {
    id: string;
    name: string;
    platform: "Meta Ads" | "Google Ads";
    leads: number;
    spend: number;
    cpl: number;
    roas: number;
    status: "active" | "learning" | "paused"; // simplified
}

export interface CampanhasLeadTypeBreakdown {
    type: string;
    leads: number;
}
