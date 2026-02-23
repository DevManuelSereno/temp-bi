"use client";

import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/shared/lib/formatters";
import type { Insight } from "@/types/dashboard";
import { ArrowRight, Info, Lightbulb, Warning } from "@phosphor-icons/react";
import { Tag } from "antd";

interface InsightsListProps {
  insights: Insight[];
  loading?: boolean;
}

const SEVERITY_CONFIG = {
  critical: {
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
    label: "Critico",
  },
  warning: {
    badgeClass: "bg-warning/10 text-warning border-warning/20",
    label: "Atencao",
  },
  info: {
    badgeClass: "bg-primary/10 text-primary border-primary/20",
    label: "Info",
  },
} as const;

const TYPE_ICON = {
  alert: Warning,
  opportunity: Lightbulb,
  info: Info,
} as const;

export function InsightsList({ insights, loading }: InsightsListProps) {
  if (loading) {
    return (
      <div className="frame-card">
        <div className="flex flex-col gap-3">
          <div className="h-5 w-32 rounded bg-muted animate-pulse" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-3 py-3">
              <div className="h-8 w-8 rounded-lg bg-muted animate-pulse shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-4 w-48 rounded bg-muted animate-pulse" />
                <div className="h-3 w-full rounded bg-muted animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="frame-card">
      <h3 className="font-serif text-base font-semibold text-card-foreground mb-4">Alertas e Insights</h3>
      <div className="flex flex-col">
        {insights.map((insight, index) => {
          const severity = SEVERITY_CONFIG[insight.severity];
          const TypeIcon = TYPE_ICON[insight.type];

          return (
            <div
              key={insight.id}
              className={cn("flex gap-3 py-3 px-1", index < insights.length - 1 && "border-b border-border/50")}
            >
              <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", severity.badgeClass)}>
                <TypeIcon weight="duotone" className="h-4 w-4" aria-hidden="true" />
              </div>

              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-card-foreground">{insight.title}</span>
                  <Tag bordered className={cn("!m-0 text-[10px] px-1.5 py-0 rounded-sm", severity.badgeClass)}>
                    {severity.label}
                  </Tag>
                  {insight.metric && <span className="text-xs font-semibold text-muted-foreground">{insight.metric}</span>}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-muted-foreground/70">{formatRelativeTime(insight.timestamp)}</span>
                  {insight.actionLabel && (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
                    >
                      {insight.actionLabel}
                      <ArrowRight weight="bold" className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
