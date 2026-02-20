"use client";

import { cn } from "@/lib/utils";
import { formatCurrency } from "@/shared/lib/formatters";
import { Info, Warning, CheckCircle } from "@phosphor-icons/react";

interface RevenueTargetCounterProps {
    current: number;
    target: number;
    className?: string;
    loading?: boolean;
}

export function RevenueTargetCounter({
    current,
    target,
    className,
    loading,
}: RevenueTargetCounterProps) {
    if (loading) {
        return (
            <div className={cn("frame-card animate-pulse h-[100px]", className)} />
        );
    }

    const diff = target - current;
    const isMet = diff <= 0;
    const progress = Math.min((current / target) * 100, 100);

    // Color logic
    // < 300k => red (destructive)
    // 300k - 399k => orange (warning)
    // >= 400k => green (success)

    const getTone = (val: number) => {
        if (val < 300000) return "destructive";
        if (val < 400000) return "warning";
        return "success";
    };

    const tone = getTone(current);
    const Icon = tone === "success" ? CheckCircle : (tone === "warning" ? Warning : Info);

    // Status text color needs to map to text- classes
    const textColor = tone === "destructive" ? "text-destructive" :
        tone === "warning" ? "text-warning" :
            "text-success";

    return (
        <div className={cn("frame-card flex flex-col justify-center gap-2 py-4 px-6 relative overflow-hidden", className)}>

            {/* Background progress bar hint (optional, subtle) */}
            <div
                className="absolute bottom-0 left-0 h-1 bg-current opacity-20 transition-all duration-1000"
                style={{ width: `${progress}%`, color: 'currentColor' }}
            />

            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Meta de Faturamento (Mês)
                    </span>

                    <div className="flex items-center gap-2 mt-1">
                        <Icon className={cn("h-5 w-5", textColor)} />
                        <h2 className={cn("text-xl font-bold font-serif tracking-tight max-sm:text-base break-words", textColor)}>
                            {isMet
                                ? `Meta batida! +${formatCurrency(Math.abs(diff))} acima`
                                : `Faltam ${formatCurrency(diff)} para bater a meta`
                            }
                        </h2>
                    </div>
                </div>

                <div className="text-right flex flex-col items-end shrink-0">
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full bg-muted/50", textColor)}>
                        {current >= 400000 ? "Excelente" : (current >= 300000 ? "Em progresso" : "Atenção")}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
                <span>
                    Atual: <strong className="text-foreground">{formatCurrency(current)}</strong>
                </span>
                <span>
                    Meta: <strong>{formatCurrency(target)}</strong>
                </span>
            </div>

            {/* Simple progress bar visual */}
            <div className="h-2 w-full bg-secondary rounded-full mt-2 overflow-hidden">
                <div
                    className={cn(
                        "h-full transition-all duration-1000 ease-out rounded-full",
                        tone === "destructive" && "bg-destructive",
                        tone === "warning" && "bg-warning",
                        tone === "success" && "bg-success"
                    )}
                    style={{ width: `${progress}%` }}
                />
            </div>

        </div>
    );
}
