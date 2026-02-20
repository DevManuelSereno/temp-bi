"use client";

import { CHART_HEIGHT } from "@/shared/lib/constants";
import { formatCompact, formatCurrency } from "@/shared/lib/formatters";
import { ChartCard } from "@/shared/ui/chart-card";
import type { ERPMonthlyPoint } from "@/types/erp";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

interface RevenueTrendChartProps {
    data: ERPMonthlyPoint[];
    loading?: boolean;
    className?: string;
}

export function RevenueTrendChart({ data, loading, className }: RevenueTrendChartProps) {
    return (
        <ChartCard
            title="Receita vs Despesa"
            subtitle="Evolução financeira (ERP)"
            loading={loading}
            className={className}
        >
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                        tickFormatter={(val) => formatCompact(val)}
                    />
                    <RechartsTooltip
                        cursor={{ fill: "var(--muted)/0.1" }}
                        contentStyle={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "var(--radius)",
                            fontSize: 12,
                            color: "var(--card-foreground)",
                        }}
                        itemStyle={{ color: "var(--card-foreground)" }}
                        formatter={(val: any) => formatCurrency(Number(val ?? 0))}
                    />
                    <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 12 }} />
                    <Bar
                        dataKey="receita"
                        name="Receita"
                        fill="var(--chart-1)"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={40}
                    />
                    <Bar
                        dataKey="despesa"
                        name="Despesa"
                        fill="var(--chart-2)"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={40}
                    />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
