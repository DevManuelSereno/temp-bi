"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

/* ── Types ───────────────────────────────────────────── */

interface SemicircleGaugeCardProps {
    title: string;
    /** Value between 0 and 100 (percent) */
    value: number;
    subtitle?: string;
    loading?: boolean;
    className?: string;
    /** CSS variable or token for the active arc, defaults to `var(--chart-1)` */
    color?: string;
}

/* ── Skeleton ────────────────────────────────────────── */

function GaugeSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn("frame-card flex flex-col items-center gap-3", className)}>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-[120px] w-[180px] rounded-lg" />
            <Skeleton className="h-3 w-24" />
        </div>
    );
}

/* ── Gauge ────────────────────────────────────────────── */

export function SemicircleGaugeCard({
    title,
    value,
    subtitle,
    loading,
    className,
    color = "var(--chart-1)",
}: SemicircleGaugeCardProps) {
    if (loading) return <GaugeSkeleton className={className} />;

    const clamped = Math.max(0, Math.min(100, value));
    const remaining = 100 - clamped;

    const data = [
        { name: "value", v: clamped },
        { name: "rest", v: remaining },
    ];

    return (
        <div className={cn("frame-card flex flex-col items-center gap-1", className)}>
            {/* Title */}
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {title}
            </span>

            {/* Gauge */}
            <div className="relative w-full" style={{ height: 120 }}>
                <ResponsiveContainer width="100%" height={120}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="v"
                            cx="50%"
                            cy="85%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius="70%"
                            outerRadius="100%"
                            stroke="none"
                            isAnimationActive={false}
                        >
                            <Cell fill={color} />
                            <Cell fill="var(--border)" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* Central value */}
                <div className="absolute inset-0 flex items-end justify-center pb-1">
                    <span className="font-serif text-2xl font-bold tracking-tight text-card-foreground">
                        {clamped.toFixed(1)}%
                    </span>
                </div>
            </div>

            {/* Subtitle */}
            {subtitle && (
                <span className="text-xs text-muted-foreground text-center">
                    {subtitle}
                </span>
            )}
        </div>
    );
}
