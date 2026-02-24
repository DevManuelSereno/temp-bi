"use client";

import { CHART_HEIGHT } from "@/shared/lib/constants";
import { formatCompact, formatDate } from "@/shared/lib/formatters";
import { ChartCard } from "@/shared/ui/chart-card";
import type { ChartSeries } from "@/types/dashboard";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

interface CampanhasAcquisitionChartProps {
  series: ChartSeries[];
  loading?: boolean;
  className?: string;
}

export function CampanhasAcquisitionChart({
  series,
  loading,
  className,
}: CampanhasAcquisitionChartProps) {
  const mergedData =
    series[0]?.data.map((point, index) => {
      const entry: Record<string, string | number> = { date: point.date };
      series.forEach((item) => {
        entry[item.id] = item.data[index]?.value ?? 0;
      });
      return entry;
    }) ?? [];

  return (
    <ChartCard
      title="Aquisição"
      subtitle="Leads por canal de origem"
      loading={loading}
      className={className}
      actions={[
        { label: "Exportar CSV", onClick: () => {} },
        { label: "Ver detalhes", onClick: () => {} },
      ]}
    >
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <LineChart data={mergedData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(value) => formatCompact(value as number)}
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
            formatter={(value) => [formatCompact(Number(value ?? 0)), ""]}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
          {series.map((item, index) => (
            <Line
              key={item.id}
              type="monotone"
              dataKey={item.id}
              name={item.name}
              stroke={CHART_COLORS[index % CHART_COLORS.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
