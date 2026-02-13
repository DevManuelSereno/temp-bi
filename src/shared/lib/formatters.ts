import { CURRENCY_CODE, CURRENCY_LOCALE } from "./constants";

/** Format a number as BRL currency */
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat(CURRENCY_LOCALE, {
        style: "currency",
        currency: CURRENCY_CODE,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

/** Format a number as compact (e.g., 1.2K, 3.5M) */
export function formatCompact(value: number): string {
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)}M`;
    }
    if (value >= 1_000) {
        return `${(value / 1_000).toFixed(1)}K`;
    }
    return value.toLocaleString(CURRENCY_LOCALE);
}

/** Format a number as percentage (e.g., 73.5%) */
export function formatPercent(value: number): string {
    return `${value.toFixed(1)}%`;
}

/** Format variation with sign (e.g., +12.3% or -5.1%) */
export function formatVariation(value: number): string {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
}

/** Format a date string for display */
export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString(CURRENCY_LOCALE, {
        day: "2-digit",
        month: "short",
    });
}

/** Format a date string to relative time (e.g., "5 min atrás") */
export function formatRelativeTime(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "agora mesmo";
    if (minutes < 60) return `${minutes} min atrás`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h atrás`;
    const days = Math.floor(hours / 24);
    return `${days}d atrás`;
}
