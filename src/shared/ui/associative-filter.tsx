"use client";

import { cn } from "@/lib/utils";
import type { Dimension } from "@/types/associative";
import { X } from "@phosphor-icons/react";

interface AssociativeFilterProps {
    dimension: Dimension;
    onToggle: (valueId: string) => void;
    onClear: () => void;
    className?: string;
}

export function AssociativeFilter({
    dimension,
    onToggle,
    onClear,
    className,
}: AssociativeFilterProps) {
    const hasSelection = dimension.values.some((v) => v.state === "selected");

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                {dimension.label}:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
                {dimension.values.map((value) => (
                    <button
                        key={value.id}
                        type="button"
                        aria-label={`Filtrar por ${value.label}`}
                        aria-pressed={value.state === "selected"}
                        disabled={value.state === "excluded"}
                        onClick={() => {
                            if (value.state !== "excluded") onToggle(value.id);
                        }}
                        className={cn(
                            "filter-chip",
                            value.state === "selected" && "filter-chip-selected",
                            value.state === "associated" && "filter-chip-associated",
                            value.state === "excluded" && "filter-chip-excluded"
                        )}
                    >
                        {value.label}
                    </button>
                ))}
                {hasSelection && (
                    <button
                        type="button"
                        aria-label={`Limpar filtro ${dimension.label}`}
                        onClick={onClear}
                        className="ml-1 rounded-full p-0.5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X weight="bold" className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                )}
            </div>
        </div>
    );
}
