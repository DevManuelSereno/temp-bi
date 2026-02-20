/* ══════════════════════════════════════════════════════
   Omie — Type definitions
   ══════════════════════════════════════════════════════ */

export interface OmieKPI {
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

export interface OmieMonthlyPoint {
    month: string;
    receita: number;
    despesa: number;
    lucro: number;
}

export interface OmieExpenseCategory {
    id: string;
    label: string;
    value: number;
    percent: number;
}

export interface OmieTransaction {
    id: string;
    date: string;
    description: string;
    category: string;
    value: number;
    type: "receita" | "despesa";
}
