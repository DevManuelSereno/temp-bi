import { formatCompact, formatCurrency, formatPercent } from "@/shared/lib/formatters";
import type {
    CampanhasCampaign,
    CampanhasKPI,
    CampanhasLeadTypeBreakdown,
    CampanhasTimePoint,
} from "@/types/campanhas";

/* ══════════════════════════════════════════════════════
   Campanhas — Mock Data (Meta + Google)
   ══════════════════════════════════════════════════════ */

/* ── Time series (weekly) ────────────────────────────── */

export const MOCK_CAMPANHAS_SERIES: CampanhasTimePoint[] = [
    { date: "Sem 01", spend: 6800, leads: 110, impressions: 84000, clicks: 2520 },
    { date: "Sem 02", spend: 7400, leads: 125, impressions: 96500, clicks: 2895 },
    { date: "Sem 03", spend: 8100, leads: 138, impressions: 105200, clicks: 3156 },
    { date: "Sem 04", spend: 9200, leads: 165, impressions: 115000, clicks: 3450 },
    { date: "Sem 05", spend: 7900, leads: 142, impressions: 102800, clicks: 3084 },
    { date: "Sem 06", spend: 9500, leads: 175, impressions: 118200, clicks: 3546 },
    { date: "Sem 07", spend: 10100, leads: 184, impressions: 128500, clicks: 3855 },
    { date: "Sem 08", spend: 8900, leads: 162, impressions: 114400, clicks: 3432 },
];

/* ── Lead Types ──────────────────────────────────────── */

export const MOCK_CAMPANHAS_LEAD_TYPES: CampanhasLeadTypeBreakdown[] = [
    { type: "WhatsApp", leads: 850 },
    { type: "Pesquisa Google", leads: 650 },
    { type: "Formulário Site", leads: 420 },
    { type: "Direct Instagram", leads: 230 },
    { type: "Ligações", leads: 180 },
    { type: "Messenger", leads: 80 },
    { type: "YouTube Ads", leads: 60 },
];

/* ── Campaigns ───────────────────────────────────────── */

export const MOCK_CAMPANHAS_CAMPAIGNS: CampanhasCampaign[] = [
    { id: "cm-01", name: "[Leads] Conversão - WhatsApp", platform: "Meta Ads", status: "active", spend: 12500, leads: 450, cpl: 27.77, roas: 8.5 },
    { id: "cg-01", name: "[Search] Fundo de Funil - Palavras Chave", platform: "Google Ads", status: "active", spend: 8400, leads: 320, cpl: 26.25, roas: 9.2 },
    { id: "cm-02", name: "[Branding] Alcance - Institucional", platform: "Meta Ads", status: "active", spend: 4200, leads: 50, cpl: 84.00, roas: 3.2 },
    { id: "cg-02", name: "[Performance Max] PMax Conversão", platform: "Google Ads", status: "learning", spend: 3500, leads: 110, cpl: 31.81, roas: 6.8 },
    { id: "cm-03", name: "[Promo] Oferta Relâmpago", platform: "Meta Ads", status: "paused", spend: 3100, leads: 85, cpl: 36.47, roas: 5.4 },
    { id: "cm-04", name: "[Retargeting] Carrinho Abandonado", platform: "Meta Ads", status: "learning", spend: 1800, leads: 42, cpl: 42.85, roas: 12.1 },
    { id: "cg-03", name: "[YouTube] Vídeo Instream - Awareness", platform: "Google Ads", status: "active", spend: 2800, leads: 35, cpl: 80.00, roas: 2.5 },
    { id: "cm-05", name: "[Leads] Quiz Interativo", platform: "Meta Ads", status: "paused", spend: 950, leads: 38, cpl: 25.00, roas: 4.1 },
    { id: "cm-06", name: "[Video] Depoimentos Clientes", platform: "Meta Ads", status: "active", spend: 2100, leads: 25, cpl: 84.00, roas: 2.8 },
];

/* ── KPIs ─────────────────────────────────────────────── */

const totalSpend = MOCK_CAMPANHAS_SERIES.reduce((s, p) => s + p.spend, 0);
const totalLeads = MOCK_CAMPANHAS_SERIES.reduce((s, p) => s + p.leads, 0);
const totalImpressions = MOCK_CAMPANHAS_SERIES.reduce((s, p) => s + p.impressions, 0);
const totalClicks = MOCK_CAMPANHAS_SERIES.reduce((s, p) => s + p.clicks, 0);
const avgCPL = totalLeads > 0 ? totalSpend / totalLeads : 0;
const avgCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
const avgCPC = totalClicks > 0 ? totalSpend / totalClicks : 0;

// Simulated revenue for ROAS
const estimatedRevenue = totalLeads * 450;
const roas = totalSpend > 0 ? estimatedRevenue / totalSpend : 0;

function variation(curr: number, prev: number): number {
    if (prev === 0) return 0;
    return Math.round(((curr - prev) / prev) * 1000) / 10;
}

function trend(v: number): "up" | "down" | "stable" {
    if (v > 1) return "up";
    if (v < -1) return "down";
    return "stable";
}

const lastWeek = MOCK_CAMPANHAS_SERIES[MOCK_CAMPANHAS_SERIES.length - 1];
const prevWeek = MOCK_CAMPANHAS_SERIES[MOCK_CAMPANHAS_SERIES.length - 2];

const spendVar = variation(lastWeek.spend, prevWeek.spend);
const leadsVar = variation(lastWeek.leads, prevWeek.leads);
const cplCurr = lastWeek.leads > 0 ? lastWeek.spend / lastWeek.leads : 0;
const cplPrev = prevWeek.leads > 0 ? prevWeek.spend / prevWeek.leads : 0;
const cplVar = variation(cplCurr, cplPrev);
const ctrCurr = lastWeek.impressions > 0 ? (lastWeek.clicks / lastWeek.impressions) * 100 : 0;
const ctrPrev = prevWeek.impressions > 0 ? (prevWeek.clicks / prevWeek.impressions) * 100 : 0;
const ctrVar = Math.round((ctrCurr - ctrPrev) * 100) / 100;

export const MOCK_CAMPANHAS_KPIS: CampanhasKPI[] = [
    {
        id: "investimento",
        label: "Investimento",
        value: totalSpend,
        formattedValue: formatCurrency(totalSpend),
        unit: "currency",
        trend: trend(spendVar),
        variationPercent: spendVar,
        sparklineData: MOCK_CAMPANHAS_SERIES.map((p) => p.spend),
    },
    {
        id: "leads",
        label: "Leads",
        value: totalLeads,
        formattedValue: formatCompact(totalLeads),
        target: 1500,
        unit: "number",
        trend: trend(leadsVar),
        variationPercent: leadsVar,
        sparklineData: MOCK_CAMPANHAS_SERIES.map((p) => p.leads),
    },
    {
        id: "cpl",
        label: "CPL",
        value: Math.round(avgCPL * 100) / 100,
        formattedValue: formatCurrency(avgCPL),
        unit: "currency",
        trend: cplVar < 0 ? "up" : cplVar > 0 ? "down" : "stable",
        variationPercent: cplVar,
        sparklineData: MOCK_CAMPANHAS_SERIES.map((p) =>
            p.leads > 0 ? Math.round((p.spend / p.leads) * 100) / 100 : 0
        ),
    },
    {
        id: "roas",
        label: "ROAS",
        value: Math.round(roas * 10) / 10,
        formattedValue: `${(Math.round(roas * 10) / 10).toFixed(1)}x`,
        target: 4.0,
        unit: "number",
        trend: "up",
        variationPercent: 5.2,
        sparklineData: MOCK_CAMPANHAS_SERIES.map((p) =>
            p.spend > 0 ? Math.round((p.leads * 450) / p.spend * 10) / 10 : 0
        ),
    },
    {
        id: "ctr",
        label: "CTR",
        value: Math.round(avgCTR * 100) / 100,
        formattedValue: formatPercent(avgCTR),
        unit: "percent",
        trend: trend(ctrVar),
        variationPercent: ctrVar,
        sparklineData: MOCK_CAMPANHAS_SERIES.map((p) =>
            p.impressions > 0 ? Math.round((p.clicks / p.impressions) * 10000) / 100 : 0
        ),
    },
    {
        id: "cpc",
        label: "CPC",
        value: Math.round(avgCPC * 100) / 100,
        formattedValue: formatCurrency(avgCPC),
        unit: "currency",
        trend: "stable",
        variationPercent: -0.5,
        sparklineData: MOCK_CAMPANHAS_SERIES.map((p) =>
            p.clicks > 0 ? Math.round((p.spend / p.clicks) * 100) / 100 : 0
        ),
    },
];
