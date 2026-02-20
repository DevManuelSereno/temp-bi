import {
    MOCK_META_ADS_CAMPAIGNS,
    MOCK_META_ADS_KPIS,
    MOCK_META_ADS_SERIES,
} from "@/modules/meta-ads/mock/data";
import { MOCK_DELAY_MS } from "@/shared/lib/constants";
import type {
    MetaAdsCampaign,
    MetaAdsKPI,
    MetaAdsTimePoint,
} from "@/types/meta-ads";

/* ── Simulated async delay ─────────────────────────── */
function delay(ms: number = MOCK_DELAY_MS): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ══════════════════════════════════════════════════════
   Meta Ads Service
   Today: reads from mock data
   Tomorrow: swap to API fetcher without changing interface
   ══════════════════════════════════════════════════════ */

export async function getMetaAdsSummary(): Promise<MetaAdsKPI[]> {
    await delay();
    return MOCK_META_ADS_KPIS;
}

export async function getMetaAdsTimeSeries(): Promise<MetaAdsTimePoint[]> {
    await delay();
    return MOCK_META_ADS_SERIES;
}

export async function getMetaAdsCampaigns(): Promise<MetaAdsCampaign[]> {
    await delay();
    return MOCK_META_ADS_CAMPAIGNS;
}
