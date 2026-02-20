import {
    MOCK_ERP_EXPENSES,
    MOCK_ERP_KPIS,
    MOCK_ERP_MONTHLY,
    MOCK_ERP_TRANSACTIONS,
} from "@/modules/erp/mock/data";
import { MOCK_DELAY_MS } from "@/shared/lib/constants";
import type {
    ERPExpenseCategory,
    ERPKPI,
    ERPMonthlyPoint,
    ERPTransaction,
} from "@/types/erp";

/* ── Simulated async delay ─────────────────────────── */
function delay(ms: number = MOCK_DELAY_MS): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ══════════════════════════════════════════════════════
   ERP Service
   Today: reads from mock data
   Tomorrow: swap to API fetcher without changing interface
   ══════════════════════════════════════════════════════ */

export async function getERPSummary(): Promise<ERPKPI[]> {
    await delay();
    return MOCK_ERP_KPIS;
}

export async function getERPMonthlySeries(): Promise<ERPMonthlyPoint[]> {
    await delay();
    return MOCK_ERP_MONTHLY;
}

export async function getERPExpensesByCategory(): Promise<ERPExpenseCategory[]> {
    await delay();
    return MOCK_ERP_EXPENSES;
}

export async function getERPTransactions(): Promise<ERPTransaction[]> {
    await delay();
    return MOCK_ERP_TRANSACTIONS;
}
