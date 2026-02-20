import { formatCompact, formatCurrency, formatPercent } from "@/shared/lib/formatters";
import type {
    ERPExpenseCategory,
    ERPKPI,
    ERPMonthlyPoint,
    ERPTransaction,
} from "@/types/erp";

/* ══════════════════════════════════════════════════════
   ERP — Mock Data
   ══════════════════════════════════════════════════════ */

/* ── Monthly series ──────────────────────────────────── */

export const MOCK_ERP_MONTHLY: ERPMonthlyPoint[] = [
    { month: "Set/24", receita: 142000, despesa: 98000, lucro: 44000 },
    { month: "Out/24", receita: 158000, despesa: 105000, lucro: 53000 },
    { month: "Nov/24", receita: 164000, despesa: 110000, lucro: 54000 },
    { month: "Dez/24", receita: 189000, despesa: 125000, lucro: 64000 },
    { month: "Jan/25", receita: 172000, despesa: 118000, lucro: 54000 },
    { month: "Fev/25", receita: 195000, despesa: 122000, lucro: 73000 },
];

/* ── Expense categories ──────────────────────────────── */

const totalDespesa = 122000;

export const MOCK_ERP_EXPENSES: ERPExpenseCategory[] = [
    { id: "pessoal", label: "Pessoal", value: 48800, percent: Math.round((48800 / totalDespesa) * 100) },
    { id: "marketing", label: "Marketing", value: 24400, percent: Math.round((24400 / totalDespesa) * 100) },
    { id: "aluguel", label: "Aluguel", value: 18300, percent: Math.round((18300 / totalDespesa) * 100) },
    { id: "fornecedores", label: "Fornecedores", value: 14640, percent: Math.round((14640 / totalDespesa) * 100) },
    { id: "impostos", label: "Impostos", value: 9760, percent: Math.round((9760 / totalDespesa) * 100) },
    { id: "outros", label: "Outros", value: 6100, percent: Math.round((6100 / totalDespesa) * 100) },
];

/* ── KPIs ─────────────────────────────────────────────── */

const currentMonth = MOCK_ERP_MONTHLY[MOCK_ERP_MONTHLY.length - 1];
const previousMonth = MOCK_ERP_MONTHLY[MOCK_ERP_MONTHLY.length - 2];

function variation(curr: number, prev: number): number {
    if (prev === 0) return 0;
    return Math.round(((curr - prev) / prev) * 1000) / 10;
}

function trend(v: number): "up" | "down" | "stable" {
    if (v > 1) return "up";
    if (v < -1) return "down";
    return "stable";
}

const receitaVar = variation(currentMonth.receita, previousMonth.receita);
const despesaVar = variation(currentMonth.despesa, previousMonth.despesa);
const lucroVar = variation(currentMonth.lucro, previousMonth.lucro);
const margemCurr = currentMonth.receita > 0 ? (currentMonth.lucro / currentMonth.receita) * 100 : 0;
const margemPrev = previousMonth.receita > 0 ? (previousMonth.lucro / previousMonth.receita) * 100 : 0;
const margemVar = Math.round((margemCurr - margemPrev) * 10) / 10;

const totalReceita = MOCK_ERP_MONTHLY.reduce((s, m) => s + m.receita, 0);
const totalDespesaAll = MOCK_ERP_MONTHLY.reduce((s, m) => s + m.despesa, 0);
const totalLucro = totalReceita - totalDespesaAll;
const margemTotal = totalReceita > 0 ? (totalLucro / totalReceita) * 100 : 0;

export const MOCK_ERP_KPIS: ERPKPI[] = [
    {
        id: "receita-total",
        label: "Receita Total",
        value: totalReceita,
        formattedValue: formatCurrency(totalReceita),
        unit: "currency",
        trend: trend(receitaVar),
        variationPercent: receitaVar,
        sparklineData: MOCK_ERP_MONTHLY.map((m) => m.receita),
    },
    {
        id: "lucro-total",
        label: "Lucro",
        value: totalLucro,
        formattedValue: formatCurrency(totalLucro),
        unit: "currency",
        trend: trend(lucroVar),
        variationPercent: lucroVar,
        sparklineData: MOCK_ERP_MONTHLY.map((m) => m.lucro),
    },
    {
        id: "margem",
        label: "Margem",
        value: Math.round(margemTotal * 10) / 10,
        formattedValue: formatPercent(margemTotal),
        target: 40,
        unit: "percent",
        trend: trend(margemVar),
        variationPercent: margemVar,
        sparklineData: MOCK_ERP_MONTHLY.map((m) =>
            m.receita > 0 ? Math.round((m.lucro / m.receita) * 1000) / 10 : 0
        ),
    },
    {
        id: "despesas-total",
        label: "Despesas",
        value: totalDespesaAll,
        formattedValue: formatCurrency(totalDespesaAll),
        unit: "currency",
        trend: despesaVar > 0 ? "down" : "up",
        variationPercent: despesaVar,
        sparklineData: MOCK_ERP_MONTHLY.map((m) => m.despesa),
    },
    {
        id: "resultado-mensal",
        label: "Resultado Mensal",
        value: currentMonth.lucro,
        formattedValue: formatCurrency(currentMonth.lucro),
        previousValue: previousMonth.lucro,
        unit: "currency",
        trend: trend(lucroVar),
        variationPercent: lucroVar,
        sparklineData: MOCK_ERP_MONTHLY.map((m) => m.lucro),
    },
    {
        id: "ticket-medio",
        label: "Ticket Médio",
        value: Math.round(totalReceita / 6),
        formattedValue: formatCompact(Math.round(totalReceita / 6)),
        unit: "number",
        trend: "stable",
        variationPercent: 1.2,
        sparklineData: MOCK_ERP_MONTHLY.map((m) => Math.round(m.receita / 30)),
    },
];

/* ── Recent transactions ──────────────────────────────── */

export const MOCK_ERP_TRANSACTIONS: ERPTransaction[] = [
    { id: "t1", date: "2025-02-17", description: "Mensalidade Aluno — Premium", category: "Receita Operacional", value: 890, type: "receita" },
    { id: "t2", date: "2025-02-17", description: "Google Ads — Campanha Fev", category: "Marketing", value: 4200, type: "despesa" },
    { id: "t3", date: "2025-02-16", description: "Aluguel — Unidade SP Centro", category: "Aluguel", value: 8500, type: "despesa" },
    { id: "t4", date: "2025-02-16", description: "Pacote Semestral — 3 alunos", category: "Receita Operacional", value: 12600, type: "receita" },
    { id: "t5", date: "2025-02-15", description: "Folha de pagamento — Fev", category: "Pessoal", value: 32000, type: "despesa" },
    { id: "t6", date: "2025-02-15", description: "Mensalidades do dia", category: "Receita Operacional", value: 6530, type: "receita" },
    { id: "t7", date: "2025-02-14", description: "Material de escritório", category: "Outros", value: 340, type: "despesa" },
    { id: "t8", date: "2025-02-14", description: "Upgrade de plano — 2 alunos", category: "Receita Operacional", value: 1780, type: "receita" },
];
