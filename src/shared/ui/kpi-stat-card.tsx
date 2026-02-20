"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SPARKLINE_HEIGHT, SPARKLINE_WIDTH } from "@/shared/lib/constants";
import { formatPercent, formatVariation } from "@/shared/lib/formatters";
import type { KPI } from "@/types/dashboard";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";

type KPIStatCardProps = {
    className?: string;
    onClick?: () => void;
} & (
        | { kpi: KPI; loading?: false }
        | { kpi?: undefined; loading: true }
    );

/* ── Mini Sparkline (SVG) ───────────────────────────── */
function Sparkline({
    data,
    trend,
    width = SPARKLINE_WIDTH,
    height = SPARKLINE_HEIGHT,
}: {
    data: number[];
    trend: KPI["trend"];
    width?: number;
    height?: number;
}) {
    if (data.length < 2) return null;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padding = 2;

    const points = data
        .map((v, i) => {
            const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
            const y = height - ((v - min) / range) * (height - padding * 2) - padding;
            return `${x},${y}`;
        })
        .join(" ");

    const strokeColor =
        trend === "up"
            ? "var(--success)"
            : trend === "down"
                ? "var(--destructive)"
                : "var(--muted-foreground)";

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="shrink-0"
            aria-hidden="true"
        >
            <polyline
                fill="none"
                stroke={strokeColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
            />
        </svg>
    );
}

/* ── Trend Icon ─────────────────────────────────────── */
function TrendIcon({ trend }: { trend: KPI["trend"] }) {
    const Icon =
        trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
    return (
        <Icon
            className={cn(
                "h-3.5 w-3.5",
                trend === "up" && "text-success",
                trend === "down" && "text-destructive",
                trend === "stable" && "text-muted-foreground"
            )}
            aria-hidden="true"
        />
    );
}

/* ── Loading Skeleton ───────────────────────────────── */
function KPIStatCardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn("frame-card flex flex-col gap-3", className)}>
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-8 w-32" />
            <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-20" />
            </div>
        </div>
    );
}

/* ── KPIStatCard ────────────────────────────────────── */
export function KPIStatCard({
    kpi,
    loading,
    className,
    onClick,
}: KPIStatCardProps) {
    if (loading) return <KPIStatCardSkeleton className={className} />;

    const targetText =
        kpi.target != null
            ? kpi.unit === "percent"
                ? `Meta: ${formatPercent(kpi.target)}`
                : `Meta: ${kpi.formattedValue.replace(kpi.value.toLocaleString(), kpi.target.toLocaleString())}`
            : null;

    return (
        <button
            type="button"
            className={cn(
                "frame-card group flex flex-col gap-2 text-left transition-all cursor-pointer",
                "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
                className
            )}
            onClick={onClick}
            aria-label={`${kpi.label}: ${kpi.formattedValue}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {kpi.label}
                </span>
                {kpi.sparklineData && (
                    <Sparkline data={kpi.sparklineData} trend={kpi.trend} />
                )}
            </div>

            {/* Value */}
            <span className="font-serif text-2xl font-bold tracking-tight text-card-foreground">
                {kpi.formattedValue}
            </span>

            {/* Trend + Target */}
            <div className="flex items-center gap-2 text-xs">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span
                            className={cn(
                                "inline-flex items-center gap-1 font-medium",
                                kpi.trend === "up" && "kpi-positive",
                                kpi.trend === "down" && "kpi-negative",
                                kpi.trend === "stable" && "text-muted-foreground"
                            )}
                        >
                            <TrendIcon trend={kpi.trend} />
                            {formatVariation(kpi.variationPercent)}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        Variação em relação ao período anterior
                    </TooltipContent>
                </Tooltip>

                {targetText && (
                    <>
                        <span className="text-border">•</span>
                        <span className="text-muted-foreground">{targetText}</span>
                    </>
                )}
            </div>
        </button>
    );
}
