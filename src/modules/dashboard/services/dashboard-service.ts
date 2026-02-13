import type {
    KPI,
    ChartSeries,
    FunnelStage,
    TopItem,
    Insight,
    DataFreshness,
} from "@/types/dashboard";
import {
    MOCK_KPIS,
    MOCK_ACQUISITION_SERIES,
    MOCK_FUNNEL_STAGES,
    MOCK_FINANCIAL_SERIES,
    MOCK_TOP_ITEMS,
    MOCK_INSIGHTS,
    MOCK_FRESHNESS,
} from "@/modules/dashboard/mock/data";
import { MOCK_DELAY_MS } from "@/shared/lib/constants";

/* ── Simulated async delay ─────────────────────────── */
function delay(ms: number = MOCK_DELAY_MS): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ══════════════════════════════════════════════════════
   Dashboard Service
   Today: reads from mock data
   Tomorrow: swap to API fetcher without changing interface
   ══════════════════════════════════════════════════════ */

export async function getKPIs(): Promise<KPI[]> {
    await delay();
    return MOCK_KPIS;
}

export async function getAcquisitionSeries(): Promise<ChartSeries[]> {
    await delay();
    return MOCK_ACQUISITION_SERIES;
}

export async function getFunnelStages(): Promise<FunnelStage[]> {
    await delay();
    return MOCK_FUNNEL_STAGES;
}

export async function getFinancialSeries(): Promise<ChartSeries[]> {
    await delay();
    return MOCK_FINANCIAL_SERIES;
}

export async function getTopItems(): Promise<TopItem[]> {
    await delay();
    return MOCK_TOP_ITEMS;
}

export async function getInsights(): Promise<Insight[]> {
    await delay();
    return MOCK_INSIGHTS;
}

export async function getDataFreshness(): Promise<DataFreshness> {
    await delay(200);
    return MOCK_FRESHNESS;
}
