"use client";

import { CHART_HEIGHT } from "@/shared/lib/constants";
import { ChartCard } from "@/shared/ui/chart-card";
import type { CRMWeeklyPoint } from "@/types/crm";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

interface CRMWeeklyChartProps {
    data: CRMWeeklyPoint[];
    loading?: boolean;
    className?: string;
}

export function CRMWeeklyChart({ data, loading, className }: CRMWeeklyChartProps) {
    return (
        <ChartCard
            title="Evolução Semanal"
            subtitle="Leads, qualificados, agendamentos e conversões"
            loading={loading}
            className={className}
        >
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                        opacity={0.5}
                    />
                    <XAxis
                        dataKey="week"
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
                    />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                    <Line
                        type="monotone"
                        dataKey="leads"
                        name="Leads"
                        stroke="var(--chart-1)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="qualified"
                        name="Qualificados"
                        stroke="var(--chart-2)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="appointments"
                        name="Agendamentos"
                        stroke="var(--chart-3)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="conversions"
                        name="Conversões"
                        stroke="var(--chart-4)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
