"use client";

import { Calendar, Building2, User, Radio } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PERIOD_OPTIONS } from "@/shared/lib/constants";
import type { FilterState } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface FilterBarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    className?: string;
}

const UNITS = [
    { value: "all", label: "Todas as Unidades" },
    { value: "sp-centro", label: "SP Centro" },
    { value: "sp-sul", label: "SP Sul" },
    { value: "rj-barra", label: "RJ Barra" },
];

const CHANNELS = [
    { value: "all", label: "Todos os Canais" },
    { value: "google", label: "Google Ads" },
    { value: "meta", label: "Meta Ads" },
    { value: "organic", label: "Orgânico" },
];

export function FilterBar({
    filters,
    onFilterChange,
    className,
}: FilterBarProps) {
    return (
        <div
            className={cn(
                "flex flex-wrap items-center gap-2",
                className
            )}
        >
            {/* Period */}
            <Select
                value={filters.period}
                onValueChange={(v) =>
                    onFilterChange({ ...filters, period: v as FilterState["period"] })
                }
            >
                <SelectTrigger className="w-[140px] h-9 text-xs bg-card border-border">
                    <Calendar className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {PERIOD_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Unit */}
            <Select
                value={filters.unit ?? "all"}
                onValueChange={(v) =>
                    onFilterChange({ ...filters, unit: v === "all" ? undefined : v })
                }
            >
                <SelectTrigger className="w-[170px] h-9 text-xs bg-card border-border">
                    <Building2 className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {UNITS.map((u) => (
                        <SelectItem key={u.value} value={u.value}>
                            {u.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Channel */}
            <Select
                value={filters.channel ?? "all"}
                onValueChange={(v) =>
                    onFilterChange({ ...filters, channel: v === "all" ? undefined : v })
                }
            >
                <SelectTrigger className="w-[150px] h-9 text-xs bg-card border-border">
                    <Radio className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {CHANNELS.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                            {c.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
