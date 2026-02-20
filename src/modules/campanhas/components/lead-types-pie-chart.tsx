"use client";

import { CHART_HEIGHT } from "@/shared/lib/constants";
import { formatCompact } from "@/shared/lib/formatters";
import { ChartCard } from "@/shared/ui/chart-card";
import type { CampanhasLeadTypeBreakdown } from "@/types/campanhas";
import { Cell, Legend, Pie, PieChart, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
];

interface LeadTypesPieChartProps {
    data: CampanhasLeadTypeBreakdown[];
    loading?: boolean;
    className?: string;
}

export function LeadTypesPieChart({ data, loading, className }: LeadTypesPieChartProps) {
    const total = data.reduce((acc, item) => acc + item.leads, 0);

    return (
        <ChartCard
            title="Tipos de Leads"
            subtitle="Distribuição por origem (Campanhas)"
            loading={loading}
            className={className}
            legend={
                !loading && (
                    <div className="text-right">
                        <span className="text-xs text-muted-foreground block">Total</span>
                        <span className="text-lg font-bold font-serif">{formatCompact(total)}</span>
                    </div>
                )
            }
        >
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="leads"
                        nameKey="type"
                        stroke="var(--card)"
                        strokeWidth={2}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <RechartsTooltip
                        contentStyle={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "var(--radius)",
                            fontSize: 12,
                            color: "var(--card-foreground)",
                        }}
                        itemStyle={{ color: "var(--card-foreground)" }}
                        formatter={(value: any, name: any, props: any) => {
                            const val = typeof value === 'number' ? value : 0;
                            const percent = ((val / total) * 100).toFixed(1).replace('.', ',');
                            // props.payload contains the data item
                            return [`${val} (${percent}%)`, props.payload.type];
                        }}
                    />
                    <Legend
                        verticalAlign="middle"
                        align="right"
                        layout="vertical"
                        iconType="circle"
                        iconSize={8}
                        content={(props) => {
                            const { payload } = props;
                            return (
                                <ul className="flex flex-col gap-1 text-[11px] text-muted-foreground ml-4">
                                    {payload?.map((entry: any, index: number) => (
                                        <li key={`item-${index}`} className="flex items-center gap-2">
                                            <span
                                                className="h-2 w-2 rounded-full shrink-0"
                                                style={{ backgroundColor: entry.color }}
                                            />
                                            <span>{entry.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            );
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
