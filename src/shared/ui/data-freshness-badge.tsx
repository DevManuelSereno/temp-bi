"use client";

import { Clock, CheckCircle, Warning, XCircle } from "@phosphor-icons/react";
import { Tag, Tooltip } from "antd";
import { formatRelativeTime } from "@/shared/lib/formatters";
import { cn } from "@/lib/utils";
import type { DataFreshness } from "@/types/dashboard";

interface DataFreshnessBadgeProps {
    freshness: DataFreshness;
    className?: string;
}

const STATUS_CONFIG = {
    fresh: {
        icon: CheckCircle,
        label: "Dados atualizados",
        className: "text-success border-success/30",
    },
    stale: {
        icon: Warning,
        label: "Dados podem estar desatualizados",
        className: "text-warning border-warning/30",
    },
    error: {
        icon: XCircle,
        label: "Erro ao atualizar dados",
        className: "text-destructive border-destructive/30",
    },
} as const;

export function DataFreshnessBadge({
    freshness,
    className,
}: DataFreshnessBadgeProps) {
    const config = STATUS_CONFIG[freshness.status];
    const Icon = config.icon;

    return (
        <Tooltip
            title={
                <div>
                    <p>{config.label}</p>
                    <p className="text-xs text-muted-foreground">Fonte: {freshness.source}</p>
                </div>
            }
        >
            <Tag
                bordered
                className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-normal cursor-default bg-transparent",
                    config.className,
                    className
                )}
            >
                    <Icon weight="bold" className="h-3 w-3" aria-hidden="true" />
                    <Clock weight="bold" className="h-3 w-3" aria-hidden="true" />
                    <span>{formatRelativeTime(freshness.lastUpdated)}</span>
            </Tag>
        </Tooltip>
    );
}
