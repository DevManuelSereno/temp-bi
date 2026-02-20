"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

/* ── Types ─────────────────────────────────────────── */
export type DateRangeValue = { from?: Date; to?: Date };

interface DatePickerWithRangeProps {
    value: DateRangeValue | undefined;
    onChange: (value: DateRangeValue | undefined) => void;
    className?: string;
}

/* ── Component ──────────────────────────────────────── */
export function DatePickerWithRange({
    value,
    onChange,
    className,
}: DatePickerWithRangeProps) {
    const hasRange = value?.from && value?.to;

    const label = hasRange
        ? `${format(value.from!, "dd/MM/yyyy")} – ${format(value.to!, "dd/MM/yyyy")}`
        : "Selecionar intervalo";

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    aria-label="Selecionar período personalizado"
                    className={cn(
                        "h-7 px-3 text-xs font-medium min-w-0 w-full sm:w-auto justify-start text-left",
                        !hasRange && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="size-3.5 shrink-0" />
                    <span className="truncate">{label}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="range"
                    selected={value as DateRange | undefined}
                    onSelect={(range) => onChange(range as DateRangeValue | undefined)}
                    numberOfMonths={2}
                    locale={ptBR}
                    defaultMonth={value?.from}
                />
            </PopoverContent>
        </Popover>
    );
}
