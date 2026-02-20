"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAssociativeFilters } from "@/shared/engine/hooks";
import { AssociativeFilter } from "@/shared/ui/associative-filter";
import { Funnel, X } from "@phosphor-icons/react";

interface FilterBarProps {
    className?: string;
}

export function FilterBar({ className }: FilterBarProps) {
    const { dimensions, hasActiveFilters, toggleValue, clearDimension, clearAll } =
        useAssociativeFilters();

    return (
        <div
            className={cn(
                "frame-card flex flex-wrap items-center gap-x-6 gap-y-3 py-3 px-4",
                className
            )}
        >
            <div className="flex items-center gap-2 text-muted-foreground">
                <Funnel weight="bold" className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                    Filtros
                </span>
            </div>

            {dimensions.map((dim) => (
                <AssociativeFilter
                    key={dim.id}
                    dimension={dim}
                    onToggle={(valueId) => toggleValue(dim.id, valueId)}
                    onClear={() => clearDimension(dim.id)}
                />
            ))}

            {hasActiveFilters && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                    className="ml-auto h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                    aria-label="Limpar todos os filtros"
                >
                    <X weight="bold" className="h-3.5 w-3.5" aria-hidden="true" />
                    Limpar
                </Button>
            )}
        </div>
    );
}
