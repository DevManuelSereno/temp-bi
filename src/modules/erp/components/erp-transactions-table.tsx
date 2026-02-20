"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/shared/lib/formatters";
import type { ERPTransaction } from "@/types/erp";
import { ArrowDownRight, ArrowUpRight } from "@phosphor-icons/react";

interface ERPTransactionsTableProps {
    transactions: ERPTransaction[];
    loading?: boolean;
    className?: string;
}

export function ERPTransactionsTable({
    transactions,
    loading,
    className,
}: ERPTransactionsTableProps) {
    if (loading) {
        return (
            <div className={cn("frame-card", className)}>
                <div className="flex flex-col gap-3">
                    <Skeleton className="h-5 w-40" />
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between gap-4">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={cn("frame-card flex flex-col gap-4", className)}>
            <h3 className="font-serif text-base font-semibold text-card-foreground">
                Últimas Movimentações
            </h3>

            <div className="flex flex-col gap-0">
                {transactions.map((tx, i) => (
                    <div
                        key={tx.id}
                        className={cn(
                            "flex items-center justify-between gap-4 py-3",
                            i < transactions.length - 1 && "border-b border-border/50"
                        )}
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div
                                className={cn(
                                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                                    tx.type === "receita"
                                        ? "bg-success/10 text-success"
                                        : "bg-destructive/10 text-destructive"
                                )}
                            >
                                {tx.type === "receita" ? (
                                    <ArrowUpRight weight="bold" className="h-4 w-4" aria-hidden="true" />
                                ) : (
                                    <ArrowDownRight weight="bold" className="h-4 w-4" aria-hidden="true" />
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-card-foreground truncate">
                                    {tx.description}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {tx.category} · {formatDate(tx.date)}
                                </p>
                            </div>
                        </div>

                        <span
                            className={cn(
                                "shrink-0 text-sm font-semibold",
                                tx.type === "receita" ? "kpi-positive" : "kpi-negative"
                            )}
                        >
                            {tx.type === "receita" ? "+" : "−"}{formatCurrency(tx.value)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
