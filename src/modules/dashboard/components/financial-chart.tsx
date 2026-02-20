"use client";

import { CHART_HEIGHT } from "@/shared/lib/constants";
import { formatCurrency, formatDate } from "@/shared/lib/formatters";
import { ChartCard } from "@/shared/ui/chart-card";
import type { ChartSeries } from "@/types/dashboard";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

interface FinancialChartProps {
    series: ChartSeries[];
    loading?: boolean;
    className?: string;
}

export function FinancialChart({ series, loading, className }: FinancialChartProps) {
    const mergedData = series[0]?.data.map((point, index) => {
        const entry: Record<string, string | number> = { date: point.date };
        series.forEach((s) => {
            entry[s.id] = s.data[index]?.value ?? 0;
        });
        return entry;
    }) ?? [];

    return (
        <ChartCard
            title="Financeiro"
            subtitle="Receita vs Custo"
            loading={loading}
            className={className}
            actions={[
                { label: "Exportar CSV", onClick: () => { } },
                { label: "Ver relatório", onClick: () => { } },
            ]}
        >
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <AreaChart data={mergedData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                        opacity={0.5}
                    />
                    <XAxis
                        dataKey="date"
                        tickFormatter={formatDate}
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                        axisLine={{ stroke: "var(--border)" }}
                        tickLine={false}
                    />
                    <YAxis
                        tickFormatter={(v) => formatCurrency(v as number)}
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
                        labelFormatter={(label) => formatDate(String(label))}
                        formatter={(value) => [formatCurrency(Number(value ?? 0)), ""]}
                    />
                    <Legend
                        wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        name="Receita"
                        stroke="var(--chart-1)"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        strokeWidth={2}
                    />
                    <Area
                        type="monotone"
                        dataKey="cost"
                        name="Custo"
                        stroke="var(--chart-3)"
                        fillOpacity={1}
                        fill="url(#colorCost)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
