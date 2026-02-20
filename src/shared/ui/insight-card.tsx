"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Insight } from "@/types/dashboard";
import {
    AlertTriangle,
    ArrowRight,
    Info,
    TrendingUp,
    Zap,
} from "lucide-react";

interface InsightCardProps {
    insight: Insight;
    className?: string;
}

const SEVERITY_CONFIG = {
    critical: {
        icon: AlertTriangle,
        badge: "Crítico",
        badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
        iconClass: "text-destructive",
    },
    warning: {
        icon: Zap,
        badge: "Atenção",
        badgeClass: "bg-warning/10 text-warning border-warning/20",
        iconClass: "text-warning",
    },
    info: {
        icon: Info,
        badge: "Info",
        badgeClass: "bg-primary/10 text-primary border-primary/20",
        iconClass: "text-primary",
    },
    positive: {
        icon: TrendingUp,
        badge: "Positivo",
        badgeClass: "bg-success/10 text-success border-success/20",
        iconClass: "text-success",
    },
} as const;

export function InsightCard({ insight, className }: InsightCardProps) {
    const config = SEVERITY_CONFIG[insight.severity];
    const Icon = config.icon;

    return (
        <div
            className={cn(
                "flex items-start gap-3 rounded-lg border border-border/50 bg-card/50 p-3 transition-colors hover:bg-card",
                className
            )}
        >
            <div
                className={cn(
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                    config.iconClass
                )}
            >
                <Icon className="h-4 w-4" aria-hidden="true" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-card-foreground truncate">
                        {insight.title}
                    </span>
                    <Badge
                        variant="outline"
                        className={cn("text-[10px] px-1.5 py-0 h-4 shrink-0", config.badgeClass)}
                    >
                        {config.badge}
                    </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                    {insight.description}
                </p>
                {insight.metric && (
                    <p className="mt-1 text-xs font-semibold text-card-foreground">
                        {insight.metric}
                    </p>
                )}
            </div>

            <button
                type="button"
                aria-label={`Ver detalhes de ${insight.title}`}
                className="mt-1 shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
        </div>
    );
}
