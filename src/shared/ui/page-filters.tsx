"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { DatePickerWithRange, type DateRangeValue } from "./date-picker-with-range";

/* ── Types ─────────────────────────────────────────── */
export type PeriodDays = 7 | 15 | 30;
export type PeriodPreset = PeriodDays | "custom";

export type PageFiltersState = {
    periodPreset: PeriodPreset;
    dateRange?: DateRangeValue;
    channel: string;
};

export const DEFAULT_FILTERS: PageFiltersState = {
    periodPreset: 30,
    channel: "all",
};

const PERIOD_OPTIONS: { label: string; value: PeriodDays }[] = [
    { label: "7 dias", value: 7 },
    { label: "15 dias", value: 15 },
    { label: "30 dias", value: 30 },
];

const CHANNEL_OPTIONS = [
    { label: "Todos os canais", value: "all" },
    { label: "Instagram", value: "instagram" },
    { label: "Facebook", value: "facebook" },
    { label: "Google", value: "google" },
    { label: "Orgânico", value: "organico" },
    { label: "Indicação", value: "indicacao" },
];

/* ── PageFilters ────────────────────────────────────── */
interface PageFiltersProps {
    filters: PageFiltersState;
    onFiltersChange: (next: PageFiltersState) => void;
    /** Slot for page-specific filter controls */
    extra?: ReactNode;
    className?: string;
}

export function PageFilters({
    filters,
    onFiltersChange,
    extra,
    className,
}: PageFiltersProps) {
    const handlePreset = (v: PeriodDays) => {
        onFiltersChange({ ...filters, periodPreset: v, dateRange: undefined });
    };

    const handleDateRange = (range: DateRangeValue | undefined) => {
        onFiltersChange({ ...filters, periodPreset: "custom", dateRange: range });
    };

    const handleChannel = (v: string) => {
        onFiltersChange({ ...filters, channel: v });
    };

    const isCustom = filters.periodPreset === "custom";

    return (
        <div
            className={cn(
                "frame-card flex flex-wrap items-center gap-2 py-3 px-4",
                className
            )}
        >
            {/* ── Período ─────────────────────────── */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap mr-1">
                    Período:
                </span>
                {PERIOD_OPTIONS.map((opt) => (
                    <Button
                        key={opt.value}
                        variant={
                            !isCustom && filters.periodPreset === opt.value
                                ? "default"
                                : "outline"
                        }
                        size="sm"
                        className={cn(
                            "h-7 px-3 text-xs font-medium transition-all",
                            !isCustom && filters.periodPreset === opt.value
                                ? "shadow-none"
                                : "text-muted-foreground"
                        )}
                        onClick={() => handlePreset(opt.value)}
                    >
                        {opt.label}
                    </Button>
                ))}
                <DatePickerWithRange
                    value={isCustom ? filters.dateRange : undefined}
                    onChange={handleDateRange}
                    className={cn(
                        isCustom && "border-primary text-foreground"
                    )}
                />
            </div>

            {/* ── Divider ─────────────────────────── */}
            <div className="h-5 w-px bg-border hidden sm:block" />

            {/* ── Canal ───────────────────────────── */}
            <Select value={filters.channel} onValueChange={handleChannel}>
                <SelectTrigger className="h-7 w-[170px] text-xs">
                    <SelectValue placeholder="Canal" />
                </SelectTrigger>
                <SelectContent>
                    {CHANNEL_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value} className="text-xs">
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* ── Page-specific extras ─────────────── */}
            {extra && (
                <>
                    <div className="h-5 w-px bg-border hidden sm:block" />
                    {extra}
                </>
            )}
        </div>
    );
}
