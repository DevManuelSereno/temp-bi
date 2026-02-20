import {
    MOCK_OMIE_EXPENSES,
    MOCK_OMIE_KPIS,
    MOCK_OMIE_MONTHLY,
    MOCK_OMIE_TRANSACTIONS,
} from "@/modules/omie/mock/data";
import { MOCK_DELAY_MS } from "@/shared/lib/constants";
import type {
    OmieExpenseCategory,
    OmieKPI,
    OmieMonthlyPoint,
    OmieTransaction,
} from "@/types/omie";

/* ── Simulated async delay ─────────────────────────── */
function delay(ms: number = MOCK_DELAY_MS): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ══════════════════════════════════════════════════════
   Omie Service
   Today: reads from mock data
   Tomorrow: swap to API fetcher without changing interface
   ══════════════════════════════════════════════════════ */

export async function getOmieSummary(): Promise<OmieKPI[]> {
    await delay();
    return MOCK_OMIE_KPIS;
}

export async function getOmieMonthlySeries(): Promise<OmieMonthlyPoint[]> {
    await delay();
    return MOCK_OMIE_MONTHLY;
}

export async function getOmieExpensesByCategory(): Promise<OmieExpenseCategory[]> {
    await delay();
    return MOCK_OMIE_EXPENSES;
}

export async function getOmieTransactions(): Promise<OmieTransaction[]> {
    await delay();
    return MOCK_OMIE_TRANSACTIONS;
}
