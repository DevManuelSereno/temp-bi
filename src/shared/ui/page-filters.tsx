"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Button, Select } from "antd";
import { DatePickerWithRange, type DateRangeValue } from "./date-picker-with-range";

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
  { label: "Organico", value: "organico" },
  { label: "Indicacao", value: "indicacao" },
];

interface PageFiltersProps {
  filters: PageFiltersState;
  onFiltersChange: (next: PageFiltersState) => void;
  extra?: ReactNode;
  className?: string;
}

export function PageFilters({ filters, onFiltersChange, extra, className }: PageFiltersProps) {
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
    <div className={cn("frame-card flex flex-wrap items-center gap-2 py-3 px-4", className)}>
      <div className="flex flex-wrap items-center gap-1.5 shrink-0">
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap mr-1">Periodo:</span>
        {PERIOD_OPTIONS.map((opt) => (
          <Button
            key={opt.value}
            type={!isCustom && filters.periodPreset === opt.value ? "primary" : "default"}
            size="small"
            className={cn(
              "!h-7 !px-3 !text-xs !font-medium !shadow-none",
              !isCustom && filters.periodPreset === opt.value ? "" : "!text-muted-foreground",
            )}
            onClick={() => handlePreset(opt.value)}
          >
            {opt.label}
          </Button>
        ))}
        <DatePickerWithRange
          value={isCustom ? filters.dateRange : undefined}
          onChange={handleDateRange}
          className={cn(isCustom && "!border-primary")}
        />
      </div>

      <div className="h-5 w-px bg-border hidden sm:block" />

      <Select
        value={filters.channel}
        onChange={handleChannel}
        options={CHANNEL_OPTIONS}
        className="!h-7 min-w-[170px] text-xs"
        size="small"
      />

      {extra && (
        <>
          <div className="h-5 w-px bg-border hidden sm:block" />
          {extra}
        </>
      )}
    </div>
  );
}
