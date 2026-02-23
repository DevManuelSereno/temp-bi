"use client";

import { cn } from "@/lib/utils";
import { DotsThree } from "@phosphor-icons/react";
import { Button, Dropdown, Skeleton } from "antd";
import type { MenuProps } from "antd";
import type { ReactNode } from "react";

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
        <Skeleton.Input active size="small" style={{ width: 128 }} />
        <Skeleton.Button active size="small" shape="circle" />
      </div>
      <Skeleton active paragraph={{ rows: 8 }} title={false} />
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

  const menuItems: MenuProps["items"] = actions?.map((action) => ({
    key: action.label,
    label: action.label,
    onClick: action.onClick,
  }));

  return (
    <div className={cn("frame-card flex flex-col gap-4", className)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-serif text-base font-semibold text-card-foreground">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-1">
          {legend}
          {menuItems && menuItems.length > 0 && (
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <Button
                type="text"
                className="!h-8 !w-8 text-muted-foreground"
                aria-label="Acoes do grafico"
              >
                <DotsThree weight="bold" className="h-4 w-4" />
              </Button>
            </Dropdown>
          )}
        </div>
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
}
