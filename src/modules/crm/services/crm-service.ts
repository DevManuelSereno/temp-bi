import {
    MOCK_CRM_KPIS,
    MOCK_CRM_OPPORTUNITIES,
    MOCK_CRM_PIPELINE,
    MOCK_CRM_WEEKLY,
} from "@/modules/crm/mock/data";
import { MOCK_DELAY_MS } from "@/shared/lib/constants";
import type {
    CRMKPI,
    CRMOpportunity,
    CRMPipelineStage,
    CRMWeeklyPoint,
} from "@/types/crm";

/* ── Simulated async delay ─────────────────────────── */
function delay(ms: number = MOCK_DELAY_MS): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ══════════════════════════════════════════════════════
   CRM Service
   Today: reads from mock data
   Tomorrow: swap to API fetcher without changing interface
   ══════════════════════════════════════════════════════ */

export async function getCRMSummary(): Promise<CRMKPI[]> {
    await delay();
    return MOCK_CRM_KPIS;
}

export async function getCRMPipeline(): Promise<CRMPipelineStage[]> {
    await delay();
    return MOCK_CRM_PIPELINE;
}

export async function getCRMWeeklySeries(): Promise<CRMWeeklyPoint[]> {
    await delay();
    return MOCK_CRM_WEEKLY;
}

export async function getCRMOpportunities(): Promise<CRMOpportunity[]> {
    await delay();
    return MOCK_CRM_OPPORTUNITIES;
}
