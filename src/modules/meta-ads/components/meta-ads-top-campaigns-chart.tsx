"use client";

import { CHART_HEIGHT } from "@/shared/lib/constants";
import { formatCurrency } from "@/shared/lib/formatters";
import { ChartCard } from "@/shared/ui/chart-card";
import type { MetaAdsCampaign } from "@/types/meta-ads";
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

interface MetaAdsTopCampaignsChartProps {
    campaigns: MetaAdsCampaign[];
    loading?: boolean;
    className?: string;
}

export function MetaAdsTopCampaignsChart({ campaigns, loading, className }: MetaAdsTopCampaignsChartProps) {
    const sorted = [...campaigns].sort((a, b) => b.leads - a.leads);

    return (
        <ChartCard
            title="Top Campanhas"
            subtitle="Leads gerados por campanha"
            loading={loading}
            className={className}
        >
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <BarChart
                    data={sorted}
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
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                        width={140}
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
                            `${value} leads · CPL ${formatCurrency(entry.payload.cpl)}`,
                            "",
                        ]}
                    />
                    <Bar dataKey="leads" name="Leads" radius={[0, 4, 4, 0]}>
                        {sorted.map((_, i) => (
                            <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
