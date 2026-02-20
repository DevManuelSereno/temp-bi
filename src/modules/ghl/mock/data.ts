import { formatCompact, formatPercent } from "@/shared/lib/formatters";
import type {
    GHLKPI,
    GHLOpportunity,
    GHLPipelineStage,
    GHLWeeklyPoint,
} from "@/types/ghl";

/* ══════════════════════════════════════════════════════
   GHL — Mock Data
   ══════════════════════════════════════════════════════ */

/* ── Weekly series ───────────────────────────────────── */

export const MOCK_GHL_WEEKLY: GHLWeeklyPoint[] = [
    { week: "Sem 01", leads: 142, qualified: 98, appointments: 64, conversions: 18 },
    { week: "Sem 02", leads: 168, qualified: 112, appointments: 72, conversions: 22 },
    { week: "Sem 03", leads: 155, qualified: 105, appointments: 68, conversions: 20 },
    { week: "Sem 04", leads: 189, qualified: 128, appointments: 82, conversions: 26 },
    { week: "Sem 05", leads: 174, qualified: 118, appointments: 76, conversions: 24 },
    { week: "Sem 06", leads: 196, qualified: 134, appointments: 88, conversions: 29 },
    { week: "Sem 07", leads: 210, qualified: 142, appointments: 94, conversions: 32 },
    { week: "Sem 08", leads: 202, qualified: 138, appointments: 90, conversions: 30 },
];

/* ── Pipeline stages ─────────────────────────────────── */

const totalLeads = MOCK_GHL_WEEKLY.reduce((s, w) => s + w.leads, 0);
const totalQualified = MOCK_GHL_WEEKLY.reduce((s, w) => s + w.qualified, 0);
const totalAppointments = MOCK_GHL_WEEKLY.reduce((s, w) => s + w.appointments, 0);
const totalShowed = Math.round(totalAppointments * 0.78);
const totalConversions = MOCK_GHL_WEEKLY.reduce((s, w) => s + w.conversions, 0);

const pct = (v: number) => Math.round((v / totalLeads) * 1000) / 10;

export const MOCK_GHL_PIPELINE: GHLPipelineStage[] = [
    { id: "leads", label: "Leads", value: totalLeads, percent: 100 },
    { id: "qualified", label: "Qualificados", value: totalQualified, percent: pct(totalQualified) },
    { id: "appointments", label: "Agendados", value: totalAppointments, percent: pct(totalAppointments) },
    { id: "showed", label: "Compareceram", value: totalShowed, percent: pct(totalShowed) },
    { id: "conversions", label: "Convertidos", value: totalConversions, percent: pct(totalConversions) },
];

/* ── KPIs ─────────────────────────────────────────────── */

function variation(curr: number, prev: number): number {
    if (prev === 0) return 0;
    return Math.round(((curr - prev) / prev) * 1000) / 10;
}

function trend(v: number): "up" | "down" | "stable" {
    if (v > 1) return "up";
    if (v < -1) return "down";
    return "stable";
}

const lastWeek = MOCK_GHL_WEEKLY[MOCK_GHL_WEEKLY.length - 1];
const prevWeek = MOCK_GHL_WEEKLY[MOCK_GHL_WEEKLY.length - 2];

const leadsVar = variation(lastWeek.leads, prevWeek.leads);
const qualVar = variation(lastWeek.qualified, prevWeek.qualified);
const apptVar = variation(lastWeek.appointments, prevWeek.appointments);
const convVar = variation(lastWeek.conversions, prevWeek.conversions);

const showRate = totalAppointments > 0 ? (totalShowed / totalAppointments) * 100 : 0;
const showRateCurr = lastWeek.appointments > 0 ? (Math.round(lastWeek.appointments * 0.78) / lastWeek.appointments) * 100 : 0;
const showRatePrev = prevWeek.appointments > 0 ? (Math.round(prevWeek.appointments * 0.78) / prevWeek.appointments) * 100 : 0;
const showRateVar = Math.round((showRateCurr - showRatePrev) * 10) / 10;

const conversionRate = totalLeads > 0 ? (totalConversions / totalLeads) * 100 : 0;

export const MOCK_GHL_KPIS: GHLKPI[] = [
    {
        id: "leads",
        label: "Leads",
        value: totalLeads,
        formattedValue: formatCompact(totalLeads),
        target: 1500,
        unit: "number",
        trend: trend(leadsVar),
        variationPercent: leadsVar,
        sparklineData: MOCK_GHL_WEEKLY.map((w) => w.leads),
    },
    {
        id: "qualificados",
        label: "Qualificados",
        value: totalQualified,
        formattedValue: formatCompact(totalQualified),
        unit: "number",
        trend: trend(qualVar),
        variationPercent: qualVar,
        sparklineData: MOCK_GHL_WEEKLY.map((w) => w.qualified),
    },
    {
        id: "agendamentos",
        label: "Agendamentos",
        value: totalAppointments,
        formattedValue: formatCompact(totalAppointments),
        unit: "number",
        trend: trend(apptVar),
        variationPercent: apptVar,
        sparklineData: MOCK_GHL_WEEKLY.map((w) => w.appointments),
    },
    {
        id: "show-rate",
        label: "Show Rate",
        value: Math.round(showRate * 10) / 10,
        formattedValue: formatPercent(showRate),
        target: 80,
        unit: "percent",
        trend: trend(showRateVar),
        variationPercent: showRateVar,
        sparklineData: MOCK_GHL_WEEKLY.map((w) =>
            w.appointments > 0 ? Math.round((Math.round(w.appointments * 0.78) / w.appointments) * 1000) / 10 : 0
        ),
    },
    {
        id: "conversoes",
        label: "Conversões",
        value: totalConversions,
        formattedValue: formatCompact(totalConversions),
        unit: "number",
        trend: trend(convVar),
        variationPercent: convVar,
        sparklineData: MOCK_GHL_WEEKLY.map((w) => w.conversions),
    },
    {
        id: "taxa-conversao",
        label: "Taxa de Conversão",
        value: Math.round(conversionRate * 10) / 10,
        formattedValue: formatPercent(conversionRate),
        target: 15,
        unit: "percent",
        trend: "up",
        variationPercent: 0.8,
        sparklineData: MOCK_GHL_WEEKLY.map((w) =>
            w.leads > 0 ? Math.round((w.conversions / w.leads) * 1000) / 10 : 0
        ),
    },
];

/* ── Opportunities ────────────────────────────────────── */

export const MOCK_GHL_OPPORTUNITIES: GHLOpportunity[] = [
    { id: "op1", name: "João Silva", stage: "Qualificado", value: 2400, assignee: "Ana Costa", updatedAt: "2025-02-18" },
    { id: "op2", name: "Maria Oliveira", stage: "Agendado", value: 3600, assignee: "Pedro Lima", updatedAt: "2025-02-18" },
    { id: "op3", name: "Carlos Santos", stage: "Compareceu", value: 1800, assignee: "Ana Costa", updatedAt: "2025-02-17" },
    { id: "op4", name: "Fernanda Souza", stage: "Convertido", value: 4200, assignee: "Lucas Mendes", updatedAt: "2025-02-17" },
    { id: "op5", name: "Ricardo Pereira", stage: "Qualificado", value: 2900, assignee: "Pedro Lima", updatedAt: "2025-02-16" },
    { id: "op6", name: "Patrícia Almeida", stage: "Agendado", value: 1500, assignee: "Ana Costa", updatedAt: "2025-02-16" },
    { id: "op7", name: "Bruno Ferreira", stage: "Lead", value: 0, assignee: "Lucas Mendes", updatedAt: "2025-02-15" },
    { id: "op8", name: "Camila Rodrigues", stage: "Compareceu", value: 3100, assignee: "Pedro Lima", updatedAt: "2025-02-15" },
];
