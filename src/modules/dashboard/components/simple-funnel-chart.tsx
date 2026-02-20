"use client";

import { CHART_HEIGHT } from "@/shared/lib/constants";
import { ChartCard } from "@/shared/ui/chart-card";
import type { GHLPipelineStage } from "@/types/ghl";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

const STAGE_COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
];

interface SimpleFunnelChartProps {
    stages: GHLPipelineStage[];
    loading?: boolean;
    className?: string;
}

export function SimpleFunnelChart({ stages, loading, className }: SimpleFunnelChartProps) {
    return (
        <ChartCard
            title="Funil Comercial"
            subtitle="Pipeline consolidado — GHL"
            loading={loading}
            className={className}
        >
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <BarChart data={stages} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                        opacity={0.5}
                    />
                    <XAxis
                        dataKey="label"
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                        axisLine={{ stroke: "var(--border)" }}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <RechartsTooltip
                        contentStyle={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "var(--radius)",
                            fontSize: 12,
                            color: "var(--card-foreground)",
                        }}
                        formatter={(value, _name, entry) => [
                            `${value} (${entry.payload.percent}%)`,
                            "",
                        ]}
                    />
                    <Bar dataKey="value" name="Volume" radius={[4, 4, 0, 0]}>
                        {stages.map((_, i) => (
                            <Cell key={i} fill={STAGE_COLORS[i % STAGE_COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
