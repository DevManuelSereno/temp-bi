"use client";

import { Clock, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
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
        variant: "outline" as const,
        className: "text-success border-success/30",
    },
    stale: {
        icon: AlertTriangle,
        label: "Dados podem estar desatualizados",
        variant: "outline" as const,
        className: "text-warning border-warning/30",
    },
    error: {
        icon: XCircle,
        label: "Erro ao atualizar dados",
        variant: "destructive" as const,
        className: "",
    },
} as const;

export function DataFreshnessBadge({
    freshness,
    className,
}: DataFreshnessBadgeProps) {
    const config = STATUS_CONFIG[freshness.status];
    const Icon = config.icon;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Badge
                    variant={config.variant}
                    className={cn(
                        "gap-1.5 text-xs font-normal cursor-default",
                        config.className,
                        className
                    )}
                >
                    <Icon className="h-3 w-3" aria-hidden="true" />
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    <span>{formatRelativeTime(freshness.lastUpdated)}</span>
                </Badge>
            </TooltipTrigger>
            <TooltipContent>
                <p>{config.label}</p>
                <p className="text-xs text-muted-foreground">
                    Fonte: {freshness.source}
                </p>
            </TooltipContent>
        </Tooltip>
    );
}
