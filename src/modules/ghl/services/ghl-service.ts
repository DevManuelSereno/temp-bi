import {
    MOCK_GHL_KPIS,
    MOCK_GHL_OPPORTUNITIES,
    MOCK_GHL_PIPELINE,
    MOCK_GHL_WEEKLY,
} from "@/modules/ghl/mock/data";
import { MOCK_DELAY_MS } from "@/shared/lib/constants";
import type {
    GHLKPI,
    GHLOpportunity,
    GHLPipelineStage,
    GHLWeeklyPoint,
} from "@/types/ghl";

/* ── Simulated async delay ─────────────────────────── */
function delay(ms: number = MOCK_DELAY_MS): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ══════════════════════════════════════════════════════
   GHL Service
   Today: reads from mock data
   Tomorrow: swap to API fetcher without changing interface
   ══════════════════════════════════════════════════════ */

export async function getGHLSummary(): Promise<GHLKPI[]> {
    await delay();
    return MOCK_GHL_KPIS;
}

export async function getGHLPipeline(): Promise<GHLPipelineStage[]> {
    await delay();
    return MOCK_GHL_PIPELINE;
}

export async function getGHLWeeklySeries(): Promise<GHLWeeklyPoint[]> {
    await delay();
    return MOCK_GHL_WEEKLY;
}

export async function getGHLOpportunities(): Promise<GHLOpportunity[]> {
    await delay();
    return MOCK_GHL_OPPORTUNITIES;
}
