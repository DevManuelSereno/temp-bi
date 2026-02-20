import {
    MOCK_CAMPANHAS_CAMPAIGNS,
    MOCK_CAMPANHAS_KPIS,
    MOCK_CAMPANHAS_LEAD_TYPES,
    MOCK_CAMPANHAS_SERIES,
} from "@/modules/campanhas/mock/data";
import { MOCK_DELAY_MS } from "@/shared/lib/constants";
import type {
    CampanhasCampaign,
    CampanhasKPI,
    CampanhasLeadTypeBreakdown,
    CampanhasTimePoint,
} from "@/types/campanhas";

/* ── Simulated async delay ─────────────────────────── */
function delay(ms: number = MOCK_DELAY_MS): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ══════════════════════════════════════════════════════
   Campanhas Service
   Today: reads from mock data
   Tomorrow: swap to API fetcher without changing interface
   ══════════════════════════════════════════════════════ */

export async function getCampanhasSummary(): Promise<CampanhasKPI[]> {
    await delay();
    return MOCK_CAMPANHAS_KPIS;
}

export async function getCampanhasTimeSeries(): Promise<CampanhasTimePoint[]> {
    await delay();
    return MOCK_CAMPANHAS_SERIES;
}

export async function getCampanhasCampaigns(): Promise<CampanhasCampaign[]> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return MOCK_CAMPANHAS_CAMPAIGNS;
}

export async function getCampanhasLeadTypes(): Promise<CampanhasLeadTypeBreakdown[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return MOCK_CAMPANHAS_LEAD_TYPES;
}
