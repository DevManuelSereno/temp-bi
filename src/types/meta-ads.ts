/* ══════════════════════════════════════════════════════
   Meta Ads — Type definitions
   ══════════════════════════════════════════════════════ */

export interface MetaAdsKPI {
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

export interface MetaAdsTimePoint {
    date: string;
    spend: number;
    leads: number;
    impressions: number;
    clicks: number;
}

export interface MetaAdsCampaign {
    id: string;
    name: string;
    status: "active" | "paused" | "completed";
    spend: number;
    leads: number;
    cpl: number;
    ctr: number;
    roas: number;
}
