import type {
    ChartSeries,
    DataFreshness,
    DataRecord,
    FunnelStage,
    Insight,
    KPI,
    TopItem,
} from "@/types/dashboard";

/* ══════════════════════════════════════════════════════
   MOCK DATA — Realistic BI dashboard data
   ══════════════════════════════════════════════════════ */

/* ── KPIs ──────────────────────────────────────────── */
export const MOCK_KPIS: KPI[] = [
    {
        id: "receita",
        label: "Receita",
        value: 487320,
        formattedValue: "R$ 487.320",
        previousValue: 425800,
        target: 500000,
        unit: "currency",
        trend: "up",
        variationPercent: 14.4,
        sparklineData: [310, 335, 360, 380, 400, 425, 410, 445, 460, 475, 487],
    },
    {
        id: "margem",
        label: "Margem",
        value: 34.2,
        formattedValue: "34,2%",
        previousValue: 31.8,
        target: 35,
        unit: "percent",
        trend: "up",
        variationPercent: 7.5,
        sparklineData: [28, 29, 30, 31, 30, 32, 31.5, 33, 33.5, 34, 34.2],
    },
    {
        id: "leads",
        label: "Leads",
        value: 1847,
        formattedValue: "1.847",
        previousValue: 1623,
        target: 2000,
        unit: "number",
        trend: "up",
        variationPercent: 13.8,
        sparklineData: [120, 135, 140, 155, 148, 165, 170, 185, 190, 180, 195],
    },
    {
        id: "agendamentos",
        label: "Agendamentos",
        value: 923,
        formattedValue: "923",
        previousValue: 870,
        unit: "number",
        trend: "up",
        variationPercent: 6.1,
        sparklineData: [60, 65, 70, 72, 75, 80, 78, 82, 85, 88, 92],
    },
    {
        id: "show-rate",
        label: "Show Rate",
        value: 73.5,
        formattedValue: "73,5%",
        previousValue: 76.2,
        target: 80,
        unit: "percent",
        trend: "down",
        variationPercent: -3.5,
        sparklineData: [78, 77, 76, 75, 74, 73, 74, 73, 72, 73, 73.5],
    },
    {
        id: "ocupacao",
        label: "Ocupação",
        value: 82.1,
        formattedValue: "82,1%",
        previousValue: 80.5,
        target: 85,
        unit: "percent",
        trend: "up",
        variationPercent: 2.0,
        sparklineData: [75, 76, 78, 79, 80, 81, 80, 81, 82, 82, 82.1],
    },
];

/* ── Aquisição (timeseries) ────────────────────────── */
export const MOCK_ACQUISITION_SERIES: ChartSeries[] = [
    {
        id: "google",
        name: "Google Ads",
        data: [
            { date: "2025-01-01", value: 320 },
            { date: "2025-01-08", value: 380 },
            { date: "2025-01-15", value: 410 },
            { date: "2025-01-22", value: 390 },
            { date: "2025-01-29", value: 450 },
            { date: "2025-02-05", value: 480 },
            { date: "2025-02-12", value: 520 },
        ],
    },
    {
        id: "meta",
        name: "Campanhas",
        data: [
            { date: "2025-01-01", value: 250 },
            { date: "2025-01-08", value: 280 },
            { date: "2025-01-15", value: 310 },
            { date: "2025-01-22", value: 290 },
            { date: "2025-01-29", value: 340 },
            { date: "2025-02-05", value: 360 },
            { date: "2025-02-12", value: 395 },
        ],
    },
    {
        id: "organic",
        name: "Orgânico",
        data: [
            { date: "2025-01-01", value: 180 },
            { date: "2025-01-08", value: 190 },
            { date: "2025-01-15", value: 200 },
            { date: "2025-01-22", value: 210 },
            { date: "2025-01-29", value: 220 },
            { date: "2025-02-05", value: 235 },
            { date: "2025-02-12", value: 250 },
        ],
    },
];

/* ── Funil ─────────────────────────────────────────── */
export const MOCK_FUNNEL_STAGES: FunnelStage[] = [
    { id: "leads", label: "Leads", value: 1847, percent: 100 },
    { id: "qualified", label: "Qualificados", value: 1290, percent: 69.8 },
    { id: "scheduled", label: "Agendados", value: 923, percent: 50.0 },
    { id: "showed", label: "Compareceram", value: 678, percent: 36.7 },
    { id: "converted", label: "Convertidos", value: 412, percent: 22.3 },
];

/* ── Financeiro (timeseries) ───────────────────────── */
export const MOCK_FINANCIAL_SERIES: ChartSeries[] = [
    {
        id: "revenue",
        name: "Receita",
        data: [
            { date: "2025-01-01", value: 58000 },
            { date: "2025-01-08", value: 62000 },
            { date: "2025-01-15", value: 71000 },
            { date: "2025-01-22", value: 65000 },
            { date: "2025-01-29", value: 73000 },
            { date: "2025-02-05", value: 78000 },
            { date: "2025-02-12", value: 80320 },
        ],
    },
    {
        id: "cost",
        name: "Custo",
        data: [
            { date: "2025-01-01", value: 38000 },
            { date: "2025-01-08", value: 41000 },
            { date: "2025-01-15", value: 45000 },
            { date: "2025-01-22", value: 43000 },
            { date: "2025-01-29", value: 47000 },
            { date: "2025-02-05", value: 49000 },
            { date: "2025-02-12", value: 52800 },
        ],
    },
];

/* ── Top 5 Estilos de Tatuagem ─────────────────────── */
export const MOCK_TOP_ITEMS: TopItem[] = [
    {
        id: "1",
        rank: 1,
        label: "Realismo",
        value: 187,
        formattedValue: "187 pedidos",
        change: 22.4,
        metadata: { category: "Black & Grey" },
    },
    {
        id: "2",
        rank: 2,
        label: "Old School",
        value: 143,
        formattedValue: "143 pedidos",
        change: 9.8,
        metadata: { category: "Tradicional" },
    },
    {
        id: "3",
        rank: 3,
        label: "Fine Line",
        value: 128,
        formattedValue: "128 pedidos",
        change: 31.5,
        metadata: { category: "Minimalista" },
    },
    {
        id: "4",
        rank: 4,
        label: "Blackwork",
        value: 96,
        formattedValue: "96 pedidos",
        change: -4.2,
        metadata: { category: "Geométrico" },
    },
    {
        id: "5",
        rank: 5,
        label: "Aquarela",
        value: 74,
        formattedValue: "74 pedidos",
        change: 15.7,
        metadata: { category: "Colorido" },
    },
];

/* ── Insights / Alertas ────────────────────────────── */
export const MOCK_INSIGHTS: Insight[] = [
    {
        id: "i1",
        type: "alert",
        severity: "critical",
        title: "Show Rate em queda",
        description:
            "O Show Rate caiu 3,5% no período. Investigar causas de no-show e revisar lembretes.",
        metric: "73,5%",
        actionLabel: "Ver detalhes",
        timestamp: "2025-02-13T08:30:00Z",
    },
    {
        id: "i2",
        type: "opportunity",
        severity: "info",
        title: "Realismo com alta demanda",
        description:
            "Estilo Realismo cresceu 22% — considere expandir horários ou adicionar tatuador especialista.",
        metric: "+22,4%",
        actionLabel: "Analisar",
        timestamp: "2025-02-13T07:15:00Z",
    },
    {
        id: "i3",
        type: "alert",
        severity: "warning",
        title: "Meta de leads a 92%",
        description:
            "Faltam 153 leads para atingir a meta mensal. Aumente investimento em Google Ads.",
        metric: "1.847/2.000",
        actionLabel: "Ver campanha",
        timestamp: "2025-02-12T18:00:00Z",
    },
    {
        id: "i4",
        type: "info",
        severity: "info",
        title: "Receita recorde semanal",
        description:
            "Esta semana registrou R$ 80.320 — maior valor dos últimos 90 dias.",
        metric: "R$ 80.320",
        timestamp: "2025-02-12T16:45:00Z",
    },
];

/* ── Data Freshness ────────────────────────────────── */
export const MOCK_FRESHNESS: DataFreshness = {
    lastUpdated: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    status: "fresh",
    source: "Mock Data Provider",
};

/* ── Flat DataRecords (for associative engine) ─────── */

interface ComboWeight {
    channel: string;
    unit: string;
    leadBase: number;
    revPerConversion: number;
    costRatio: number;
}

const COMBO_WEIGHTS: ComboWeight[] = [
    { channel: "Google Ads", unit: "SP Centro", leadBase: 42, revPerConversion: 380, costRatio: 0.60 },
    { channel: "Google Ads", unit: "SP Sul", leadBase: 30, revPerConversion: 340, costRatio: 0.63 },
    { channel: "Google Ads", unit: "RJ Barra", leadBase: 36, revPerConversion: 360, costRatio: 0.61 },
    { channel: "Campanhas", unit: "SP Centro", leadBase: 38, revPerConversion: 350, costRatio: 0.65 },
    { channel: "Campanhas", unit: "RJ Barra", leadBase: 25, revPerConversion: 320, costRatio: 0.68 },
    /* Campanhas + SP Sul is absent → associative exclusion */
    { channel: "Orgânico", unit: "SP Centro", leadBase: 22, revPerConversion: 400, costRatio: 0.52 },
    { channel: "Orgânico", unit: "SP Sul", leadBase: 16, revPerConversion: 380, costRatio: 0.55 },
    { channel: "Orgânico", unit: "RJ Barra", leadBase: 18, revPerConversion: 390, costRatio: 0.54 },
];

const RECORD_DATES = [
    "2025-01-06", "2025-01-13", "2025-01-20",
    "2025-01-27", "2025-02-03", "2025-02-10", "2025-02-17",
];

function buildMockRecords(): DataRecord[] {
    const records: DataRecord[] = [];
    for (let wi = 0; wi < RECORD_DATES.length; wi++) {
        const date = RECORD_DATES[wi];
        const growthFactor = 1 + wi * 0.025;
        for (let ci = 0; ci < COMBO_WEIGHTS.length; ci++) {
            const c = COMBO_WEIGHTS[ci];
            const jitter = ((wi * 7 + ci * 3) % 11) - 5;
            const leads = Math.round(c.leadBase * growthFactor + jitter);
            const qualified = Math.round(leads * 0.70);
            const appointments = Math.round(qualified * 0.72);
            const showed = Math.round(appointments * 0.735);
            const conversions = Math.round(showed * 0.61);
            const revenue = Math.round(conversions * c.revPerConversion);
            const cost = Math.round(revenue * c.costRatio);
            records.push({
                date, channel: c.channel, unit: c.unit,
                leads, qualified, appointments, showed, conversions,
                revenue, cost,
            });
        }
    }
    return records;
}

export const MOCK_DATA_RECORDS: DataRecord[] = buildMockRecords();
