"use client";

import { CHART_HEIGHT } from "@/shared/lib/constants";
import { formatCurrency } from "@/shared/lib/formatters";
import { ChartCard } from "@/shared/ui/chart-card";
import type { OmieMonthlyPoint } from "@/types/omie";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

interface RevenueTrendChartProps {
    data: OmieMonthlyPoint[];
    loading?: boolean;
    className?: string;
}

export function RevenueTrendChart({ data, loading, className }: RevenueTrendChartProps) {
    return (
        <ChartCard
            title="Receita vs Despesa"
            subtitle="Evolução mensal — Omie"
            loading={loading}
            className={className}
        >
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                        opacity={0.5}
                    />
                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                        axisLine={{ stroke: "var(--border)" }}
                        tickLine={false}
                    />
                    <YAxis
                        tickFormatter={(v) => formatCurrency(v as number).replace("R$\u00a0", "")}
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
                        formatter={(value) => [formatCurrency(Number(value ?? 0)), ""]}
                    />
                    <Bar dataKey="receita" name="Receita" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="despesa" name="Despesa" fill="var(--chart-3)" radius={[4, 4, 0, 0]} opacity={0.6} />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
