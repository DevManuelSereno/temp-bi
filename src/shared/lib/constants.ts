import type { DimensionDefinition } from "@/types/associative";

/* ── App-wide constants ──────────────────────────────── */

export const APP_NAME = "Capone Club - Intel Hub";
export const SIDEBAR_NAME = "Intel Hub";
export const APP_DESCRIPTION = "Dashboard de Business Intelligence da Capone Club";

/** Simulated fetch delay in ms */
export const MOCK_DELAY_MS = 600;

/** Currency formatting */
export const CURRENCY_LOCALE = "pt-BR";
export const CURRENCY_CODE = "BRL";

/** Chart dimensions */
export const CHART_HEIGHT = 280;
export const SPARKLINE_HEIGHT = 32;
export const SPARKLINE_WIDTH = 80;

/** Breakpoints (mirrors Tailwind defaults) */
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const;

/** Period options for FilterBar */
export const PERIOD_OPTIONS = [
    { value: "7d", label: "7 dias" },
    { value: "15d", label: "15 dias" },
    { value: "30d", label: "30 dias" },
    { value: "90d", label: "90 dias" },
] as const;

/** Associative engine dimension definitions */
export const DIMENSION_DEFINITIONS: DimensionDefinition[] = [
    { id: "channel", label: "Canal", field: "channel" },
    { id: "unit", label: "Unidade", field: "unit" },
] as const;

/** Capacity per unit per week (for occupancy KPI) */
export const CAPACITY_PER_UNIT_PER_WEEK = 50;
