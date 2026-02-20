"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    badge?: ReactNode;
    actions?: ReactNode;
    className?: string;
}

export function SectionHeader({
    title,
    subtitle,
    badge,
    actions,
    className,
}: SectionHeaderProps) {
    return (
        <div className={cn("flex items-start justify-between gap-4", className)}>
            <div className="flex items-center gap-3">
                <div>
                    <h2 className="font-serif text-lg font-semibold tracking-tight text-card-foreground">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
                    )}
                </div>
                {badge}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
    );
}
