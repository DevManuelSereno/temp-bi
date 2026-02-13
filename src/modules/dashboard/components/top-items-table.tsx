"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatVariation } from "@/shared/lib/formatters";
import type { TopItem } from "@/types/dashboard";

interface TopItemsTableProps {
    items: TopItem[];
    loading?: boolean;
}

export function TopItemsTable({ items, loading }: TopItemsTableProps) {
    if (loading) {
        return (
            <div className="frame-card">
                <div className="flex flex-col gap-3">
                    <div className="h-5 w-32 rounded bg-muted animate-pulse" />
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3 py-2">
                            <div className="h-7 w-7 rounded-full bg-muted animate-pulse" />
                            <div className="h-4 w-40 rounded bg-muted animate-pulse" />
                            <div className="ml-auto h-4 w-20 rounded bg-muted animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="frame-card">
            <h3 className="font-serif text-base font-semibold text-card-foreground mb-4">
                Top 5 Procedimentos
            </h3>
            <div className="flex flex-col">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className={cn(
                            "flex items-center gap-3 py-3 px-1",
                            index < items.length - 1 && "border-b border-border/50"
                        )}
                    >
                        {/* Rank badge */}
                        <span
                            className={cn(
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                                index === 0
                                    ? "bg-primary text-primary-foreground"
                                    : index === 1
                                        ? "bg-secondary text-secondary-foreground"
                                        : "bg-muted text-muted-foreground"
                            )}
                        >
                            {item.rank}
                        </span>

                        {/* Label + category */}
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-sm font-medium text-card-foreground truncate">
                                {item.label}
                            </span>
                            {item.metadata?.category && (
                                <span className="text-xs text-muted-foreground">
                                    {item.metadata.category}
                                </span>
                            )}
                        </div>

                        {/* Value */}
                        <span className="text-sm font-semibold text-card-foreground whitespace-nowrap">
                            {item.formattedValue}
                        </span>

                        {/* Change */}
                        {item.change != null && (
                            <Badge
                                variant="outline"
                                className={cn(
                                    "gap-1 text-xs font-medium shrink-0",
                                    item.change >= 0
                                        ? "text-success border-success/30"
                                        : "text-destructive border-destructive/30"
                                )}
                            >
                                {item.change >= 0 ? (
                                    <TrendingUp className="h-3 w-3" />
                                ) : item.change < 0 ? (
                                    <TrendingDown className="h-3 w-3" />
                                ) : (
                                    <Minus className="h-3 w-3" />
                                )}
                                {formatVariation(item.change)}
                            </Badge>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
