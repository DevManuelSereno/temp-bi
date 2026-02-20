/* ══════════════════════════════════════════════════════
   ERP — Type definitions
   ══════════════════════════════════════════════════════ */

export interface ERPKPI {
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

export interface ERPMonthlyPoint {
    month: string;
    receita: number;
    despesa: number;
    lucro: number;
}

export interface ERPExpenseCategory {
    id: string;
    label: string;
    value: number;
    percent: number;
}

export interface ERPTransaction {
    id: string;
    date: string;
    description: string;
    category: string;
    value: number;
    type: "receita" | "despesa";
}
