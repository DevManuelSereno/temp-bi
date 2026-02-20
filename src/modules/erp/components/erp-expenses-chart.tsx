"use client";

import { CHART_HEIGHT } from "@/shared/lib/constants";
import { formatCurrency } from "@/shared/lib/formatters";
import { ChartCard } from "@/shared/ui/chart-card";
import type { ERPExpenseCategory } from "@/types/erp";
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

const BAR_COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-1)",
];

interface ERPExpensesChartProps {
    data: ERPExpenseCategory[];
    loading?: boolean;
    className?: string;
}

export function ERPExpensesChart({ data, loading, className }: ERPExpensesChartProps) {
    return (
        <ChartCard
            title="Despesas por Categoria"
            subtitle="Distribuição do mês atual"
            loading={loading}
            className={className}
            actions={[{ label: "Ver detalhes", onClick: () => { } }]}
        >
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                        opacity={0.5}
                        horizontal={false}
                    />
                    <XAxis
                        type="number"
                        tickFormatter={(v) => formatCurrency(v as number).replace("R$\u00a0", "")}
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
                        formatter={(value, _name, entry) => [
                            `${formatCurrency(Number(value ?? 0))} (${entry.payload.percent}%)`,
                            "",
                        ]}
                    />
                    <Bar dataKey="value" name="Valor" radius={[0, 4, 4, 0]}>
                        {data.map((_, i) => (
                            <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
