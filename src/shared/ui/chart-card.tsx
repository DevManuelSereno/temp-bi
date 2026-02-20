"use client";

import type { ReactNode } from "react";
import { DotsThree } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ChartCardAction {
    label: string;
    onClick: () => void;
}

interface ChartCardProps {
    title: string;
    subtitle?: string;
    legend?: ReactNode;
    actions?: ChartCardAction[];
    children: ReactNode;
    loading?: boolean;
    className?: string;
}

function ChartCardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn("frame-card flex flex-col gap-4", className)}>
            <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-8 w-8 rounded-md" />
            </div>
            <Skeleton className="h-[280px] w-full rounded-lg" />
        </div>
    );
}

export function ChartCard({
    title,
    subtitle,
    legend,
    actions,
    children,
    loading,
    className,
}: ChartCardProps) {
    if (loading) return <ChartCardSkeleton className={className} />;

    return (
        <div className={cn("frame-card flex flex-col gap-4", className)}>
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                    <h3 className="font-serif text-base font-semibold text-card-foreground">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="text-xs text-muted-foreground">{subtitle}</p>
                    )}
                </div>

                <div className="flex items-center gap-1">
                    {legend}
                    {actions && actions.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground"
                                    aria-label="Ações do gráfico"
                                >
                                    <DotsThree weight="bold" className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {actions.map((action) => (
                                    <DropdownMenuItem
                                        key={action.label}
                                        onClick={action.onClick}
                                    >
                                        {action.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>

            {/* Chart area */}
            <div className="w-full">{children}</div>
        </div>
    );
}
