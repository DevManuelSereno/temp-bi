"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { ChartCard } from "@/shared/ui/chart-card";
import type { FunnelStage } from "@/types/dashboard";
import { formatCompact, formatPercent } from "@/shared/lib/formatters";
import { CHART_HEIGHT } from "@/shared/lib/constants";

const FUNNEL_COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
];

interface FunnelChartProps {
    stages: FunnelStage[];
    loading?: boolean;
}

export function FunnelChart({ stages, loading }: FunnelChartProps) {
    return (
        <ChartCard
            title="Funil de Conversão"
            subtitle="Da captação à conversão"
            loading={loading}
            actions={[{ label: "Ver detalhes", onClick: () => { } }]}
        >
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <BarChart
                    data={stages}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                        opacity={0.5}
                        horizontal={false}
                    />
                    <XAxis
                        type="number"
                        tickFormatter={(v) => formatCompact(v as number)}
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        type="category"
                        dataKey="label"
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                        width={90}
                    />
                    <RechartsTooltip
                        contentStyle={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "var(--radius)",
                            fontSize: 12,
                            color: "var(--card-foreground)",
                        }}
                        formatter={(value, _name, props) => {
                            const stage = (props as unknown as { payload: FunnelStage }).payload;
                            return [
                                `${formatCompact(Number(value ?? 0))} (${formatPercent(stage.percent)})`,
                                "Volume",
                            ];
                        }}
                    />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
                        {stages.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]}
                                opacity={1 - index * 0.12}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
