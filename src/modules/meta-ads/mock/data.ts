import { formatCompact, formatCurrency, formatPercent } from "@/shared/lib/formatters";
import type {
    MetaAdsCampaign,
    MetaAdsKPI,
    MetaAdsLeadTypeBreakdown,
    MetaAdsTimePoint,
} from "@/types/meta-ads";

/* ══════════════════════════════════════════════════════
   Meta Ads — Mock Data
   ══════════════════════════════════════════════════════ */

/* ── Time series (weekly) ────────────────────────────── */

export const MOCK_META_ADS_SERIES: MetaAdsTimePoint[] = [
    { date: "Sem 01", spend: 4200, leads: 68, impressions: 42000, clicks: 1260 },
    { date: "Sem 02", spend: 4800, leads: 82, impressions: 48500, clicks: 1455 },
    { date: "Sem 03", spend: 5100, leads: 76, impressions: 51200, clicks: 1536 },
    { date: "Sem 04", spend: 5500, leads: 94, impressions: 55000, clicks: 1650 },
    { date: "Sem 05", spend: 4900, leads: 85, impressions: 49800, clicks: 1494 },
    { date: "Sem 06", spend: 5800, leads: 102, impressions: 58200, clicks: 1746 },
    { date: "Sem 07", spend: 6200, leads: 110, impressions: 62500, clicks: 1875 },
    { date: "Sem 08", spend: 5600, leads: 98, impressions: 56400, clicks: 1692 },
];

/* ── Lead Types ──────────────────────────────────────── */

export const MOCK_META_ADS_LEAD_TYPES: MetaAdsLeadTypeBreakdown[] = [
    { type: "WhatsApp", leads: 850 },
    { type: "Formulário Site", leads: 420 },
    { type: "Direct Instagram", leads: 230 },
    { type: "Ligações", leads: 150 },
    { type: "Messenger", leads: 80 },
];

/* ── Campaigns ───────────────────────────────────────── */

export const MOCK_META_ADS_CAMPAIGNS: MetaAdsCampaign[] = [
    { id: "cm-01", name: "[Leads] Conversão - WhatsApp", status: "active", spend: 12500, leads: 450, cpl: 27.77, roas: 8.5 },
    { id: "cm-02", name: "[Branding] Alcance - Institucional", status: "active", spend: 4200, leads: 50, cpl: 84.00, roas: 3.2 },
    { id: "cm-03", name: "[Promo] Oferta Relâmpago", status: "paused", spend: 3100, leads: 85, cpl: 36.47, roas: 5.4 },
    { id: "cm-04", name: "[Retargeting] Carrinho Abandonado", status: "learning", spend: 1800, leads: 42, cpl: 42.85, roas: 12.1 },
    { id: "cm-05", name: "[Leads] Quiz Interativo", status: "paused", spend: 950, leads: 38, cpl: 25.00, roas: 4.1 },
    { id: "cm-06", name: "[Video] Depoimentos Clientes", status: "active", spend: 2100, leads: 25, cpl: 84.00, roas: 2.8 },
];

/* ── KPIs ─────────────────────────────────────────────── */

const totalSpend = MOCK_META_ADS_SERIES.reduce((s, p) => s + p.spend, 0);
const totalLeads = MOCK_META_ADS_SERIES.reduce((s, p) => s + p.leads, 0);
const totalImpressions = MOCK_META_ADS_SERIES.reduce((s, p) => s + p.impressions, 0);
const totalClicks = MOCK_META_ADS_SERIES.reduce((s, p) => s + p.clicks, 0);
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

const lastWeek = MOCK_META_ADS_SERIES[MOCK_META_ADS_SERIES.length - 1];
const prevWeek = MOCK_META_ADS_SERIES[MOCK_META_ADS_SERIES.length - 2];

const spendVar = variation(lastWeek.spend, prevWeek.spend);
const leadsVar = variation(lastWeek.leads, prevWeek.leads);
const cplCurr = lastWeek.leads > 0 ? lastWeek.spend / lastWeek.leads : 0;
const cplPrev = prevWeek.leads > 0 ? prevWeek.spend / prevWeek.leads : 0;
const cplVar = variation(cplCurr, cplPrev);
const ctrCurr = lastWeek.impressions > 0 ? (lastWeek.clicks / lastWeek.impressions) * 100 : 0;
const ctrPrev = prevWeek.impressions > 0 ? (prevWeek.clicks / prevWeek.impressions) * 100 : 0;
const ctrVar = Math.round((ctrCurr - ctrPrev) * 100) / 100;

export const MOCK_META_ADS_KPIS: MetaAdsKPI[] = [
    {
        id: "investimento",
        label: "Investimento",
        value: totalSpend,
        formattedValue: formatCurrency(totalSpend),
        unit: "currency",
        trend: trend(spendVar),
        variationPercent: spendVar,
        sparklineData: MOCK_META_ADS_SERIES.map((p) => p.spend),
    },
    {
        id: "leads",
        label: "Leads",
        value: totalLeads,
        formattedValue: formatCompact(totalLeads),
        target: 800,
        unit: "number",
        trend: trend(leadsVar),
        variationPercent: leadsVar,
        sparklineData: MOCK_META_ADS_SERIES.map((p) => p.leads),
    },
    {
        id: "cpl",
        label: "CPL",
        value: Math.round(avgCPL * 100) / 100,
        formattedValue: formatCurrency(avgCPL),
        unit: "currency",
        trend: cplVar < 0 ? "up" : cplVar > 0 ? "down" : "stable",
        variationPercent: cplVar,
        sparklineData: MOCK_META_ADS_SERIES.map((p) =>
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
        sparklineData: MOCK_META_ADS_SERIES.map((p) =>
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
        sparklineData: MOCK_META_ADS_SERIES.map((p) =>
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
        sparklineData: MOCK_META_ADS_SERIES.map((p) =>
            p.clicks > 0 ? Math.round((p.spend / p.clicks) * 100) / 100 : 0
        ),
    },
];
