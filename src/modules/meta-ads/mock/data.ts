import { formatCompact, formatCurrency, formatPercent } from "@/shared/lib/formatters";
import type {
    MetaAdsCampaign,
    MetaAdsKPI,
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

/* ── Campaigns ───────────────────────────────────────── */

export const MOCK_META_ADS_CAMPAIGNS: MetaAdsCampaign[] = [
    { id: "c1", name: "Captação — Presencial SP", status: "active", spend: 12400, leads: 186, cpl: 66.67, ctr: 3.2, roas: 4.8 },
    { id: "c2", name: "Remarketing — Visitantes Site", status: "active", spend: 8200, leads: 124, cpl: 66.13, ctr: 4.1, roas: 5.2 },
    { id: "c3", name: "Lookalike — Alunos Premium", status: "active", spend: 9800, leads: 142, cpl: 69.01, ctr: 2.8, roas: 3.9 },
    { id: "c4", name: "Branding — Institucional", status: "paused", spend: 3200, leads: 28, cpl: 114.29, ctr: 1.5, roas: 1.2 },
    { id: "c5", name: "Lançamento — Plano Anual", status: "completed", spend: 5600, leads: 98, cpl: 57.14, ctr: 3.8, roas: 6.1 },
    { id: "c6", name: "Captação — Online Nacional", status: "active", spend: 3900, leads: 52, cpl: 75.0, ctr: 2.4, roas: 3.1 },
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
