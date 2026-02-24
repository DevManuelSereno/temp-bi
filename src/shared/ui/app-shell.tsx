"use client";

import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/shared/config/navigation";
import { SIDEBAR_NAME } from "@/shared/lib/constants";
import { ThemeToggle } from "@/shared/theme/theme-toggle";
import { DatePickerWithRange, type DateRangeValue } from "@/shared/ui/date-picker-with-range";
import { ArrowFatLineLeft, ArrowFatLineRight, Bell, List } from "@phosphor-icons/react";
import { Avatar, Button as AntButton, Drawer, Tooltip } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface AppShellProps {
  children: React.ReactNode;
}

const TOPBAR_PERIOD_OPTIONS = [
  { label: "7 dias", value: 7 },
  { label: "15 dias", value: 15 },
  { label: "30 dias", value: 30 },
] as const;

type TopbarPeriod = (typeof TOPBAR_PERIOD_OPTIONS)[number]["value"] | "custom";

function SidebarContent({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const footerChips = ["PRIVACIDADE", "DADOS", "COOKIES"] as const;

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-sidebar text-sidebar-foreground [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-serif text-sm font-bold">
            P
          </div>
          {!collapsed && (
            <span className="truncate font-serif text-base font-semibold uppercase tracking-[0.08em]">
              {SIDEBAR_NAME}
            </span>
          )}
        </div>
      </div>

      {!collapsed && <div className="mx-4 border-t border-dashed border-border/70" />}

      {!collapsed && (
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <Avatar size={40} src="/icon.jpg" className="h-10 w-10 shrink-0 rounded-full">
              CC
            </Avatar>
            <span className="min-w-0 truncate text-sm font-semibold leading-none text-card-foreground">Capone Club</span>
          </div>
        </div>
      )}

      <div className="px-2 py-3">
        <nav className="grid gap-1">
          {NAV_ITEMS.map((item, index) => {
            const isDisabled = item.disabled || !item.href;
            const isActive = !isDisabled && pathname === item.href;
            const order = String(index + 1).padStart(2, "0");
            const itemClassName = cn(
              "group rounded-xl border transition-all",
              "focus-visible:outline-2 focus-visible:outline-ring",
              isActive
                ? "border-sidebar-border bg-sidebar-accent/80 text-sidebar-primary shadow-sm"
                : "border-transparent text-sidebar-foreground/70 hover:border-sidebar-border/70 hover:bg-sidebar-accent/50",
              isDisabled && "cursor-not-allowed opacity-60",
              collapsed ? "flex h-10 w-full items-center justify-center" : "flex items-center gap-2 px-2.5 py-2.5",
            );

            const itemContent = collapsed ? (
              <item.icon size={18} className={cn("shrink-0", isActive && "text-sidebar-primary")} />
            ) : (
              <>
                <span
                  className={cn(
                    "w-8 shrink-0 text-[11px] font-semibold tracking-wider",
                    isActive ? "text-sidebar-primary" : "text-muted-foreground",
                  )}
                >
                  {order}
                </span>
                <item.icon size={16} className={cn("shrink-0", isActive && "text-sidebar-primary")} />
                <span className="min-w-0 truncate text-sm font-medium">{item.label}</span>
              </>
            );

            if (isDisabled) {
              return (
                <Tooltip key={item.label} title="Em breve" placement="right">
                  <div aria-disabled="true" aria-label={`${item.label} (Em breve)`} className={itemClassName}>
                    {itemContent}
                  </div>
                </Tooltip>
              );
            }

            return (
              <Link key={item.href} href={item.href as string} aria-current={isActive ? "page" : undefined} aria-label={item.label} className={itemClassName}>
                {itemContent}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 max-[1600px]:-translate-y-2 max-[1600px]:px-2.5 max-[1600px]:pt-2.5 max-[1600px]:pb-4 max-[1280px]:p-2.5 max-[1120px]:p-2">
        {!collapsed && (
          <div className="frame-card relative overflow-hidden !p-3 max-[1600px]:!p-2.5 max-[1280px]:!p-2.5 max-[1120px]:!p-2">
            <div className="absolute left-0 top-2 bottom-2 w-1.5 rounded-l-xl bg-primary max-[1280px]:top-1.5 max-[1280px]:bottom-1.5 max-[1280px]:w-1" />
            <div className="pl-3 max-[1600px]:pl-2.5 max-[1280px]:pl-2.5 max-[1120px]:pl-2">
              <div className="flex items-center justify-between gap-2 max-[1600px]:gap-1.5 max-[1280px]:gap-1.5">
                <div className="flex items-center gap-2 max-[1600px]:gap-1.5 max-[1280px]:gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-success max-[1600px]:h-2 max-[1600px]:w-2 max-[1280px]:h-2 max-[1280px]:w-2" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground max-[1600px]:text-[9px] max-[1280px]:text-[9px]">
                    Status da sincronizacao
                  </span>
                </div>
                <span className="text-xs font-medium text-success max-[1600px]:text-[11px] max-[1280px]:text-[11px]">sucesso</span>
              </div>
              <p className="mt-2 text-xs font-semibold text-card-foreground max-[1600px]:mt-1.5 max-[1600px]:text-[11px] max-[1280px]:mt-1.5 max-[1280px]:text-[11px]">20/02, 19:27</p>
              <p className="mt-1 text-[11px] text-muted-foreground max-[1600px]:text-[10px] max-[1280px]:text-[10px]">Tempo real: ativo (1440 min)</p>
              <button
                type="button"
                className="mt-3 w-full rounded-[5px] border border-sidebar-border bg-sidebar-accent px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-sidebar-foreground transition-colors hover:bg-sidebar-accent/80 max-[1600px]:mt-2.5 max-[1600px]:py-1 max-[1600px]:text-[9px] max-[1280px]:mt-2.5 max-[1280px]:py-1 max-[1280px]:text-[9px]"
              >
                Rodar sincronizacao
              </button>
            </div>
          </div>
        )}

        {!collapsed && (
          <div className="mt-3 max-[1600px]:mt-2.5 max-[1280px]:mt-2.5">
            <div className="flex flex-nowrap items-center justify-center gap-0.5 overflow-hidden max-[1600px]:gap-0 max-[1280px]:gap-0">
              {footerChips.map((label) => (
                <button
                  key={label}
                  type="button"
                  className="inline-flex h-3 items-center whitespace-nowrap rounded-full border border-sidebar-border px-1 text-muted-foreground transition-colors hover:text-foreground max-[1600px]:h-2.5 max-[1600px]:px-0.5 max-[1280px]:h-2.5 max-[1280px]:px-0.5"
                >
                  <span className="origin-center scale-[1] text-[8px] font-medium uppercase leading-none tracking-[0.01em] max-[1600px]:text-[7px] max-[1280px]:text-[7px]">
                    {label}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-1.5 flex items-center justify-center gap-1 max-[1600px]:mt-1 max-[1600px]:gap-0.5 max-[1280px]:mt-1 max-[1280px]:gap-0.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-muted-foreground max-[1600px]:text-[10px] max-[1280px]:text-[10px]">HARTT.IO</span>
              <span className="text-[10px] text-muted-foreground max-[1600px]:text-[9px] max-[1280px]:text-[9px]">|</span>
              <span className="inline-flex h-4 items-center rounded-full border border-success/40 bg-success/15 px-1.5 text-[8px] font-medium uppercase leading-none tracking-[0.05em] text-success max-[1600px]:h-3.5 max-[1600px]:px-1 max-[1600px]:text-[7px] max-[1280px]:h-3.5 max-[1280px]:px-1 max-[1280px]:text-[7px]">
                v0.1.0-BETA.1
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Topbar({
  collapsed,
  onSidebarToggle,
  onMobileMenuOpen,
}: {
  collapsed: boolean;
  onSidebarToggle: () => void;
  onMobileMenuOpen: () => void;
}) {
  const pathname = usePathname();
  const [topbarPeriod, setTopbarPeriod] = useState<TopbarPeriod>(30);
  const [topbarDateRange, setTopbarDateRange] = useState<DateRangeValue | undefined>(undefined);
  const activeItem =
    NAV_ITEMS.find((item) => item.href === pathname) ??
    NAV_ITEMS.find((item) => item.href && item.href !== "/" && pathname.startsWith(`${item.href}/`)) ??
    NAV_ITEMS.find((item) => item.href === "/");
  const topbarTitle = activeItem?.headerTitle ?? "Resumo Executivo";
  const topbarSubtitle = activeItem?.headerSubtitle ?? "Visao consolidada - Financeiro, Comercial e Midia";
  const showTopbarDateFilters = ["/campanhas", "/crm", "/erp", "/agentes"].some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  return (
    <header className="sticky top-0 z-30 bg-background/80 px-4 py-2 backdrop-blur-md lg:px-6">
      <div className="flex min-h-14 items-center">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent lg:flex"
            onClick={onSidebarToggle}
            aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
          >
            {collapsed ? <ArrowFatLineRight size={16} weight="fill" /> : <ArrowFatLineLeft size={16} weight="fill" />}
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent lg:hidden"
            onClick={onMobileMenuOpen}
            aria-label="Abrir menu"
          >
            <List size={20} weight="bold" />
          </button>
        </div>

        <div className="min-w-0 flex-1 px-3 lg:px-4">
          <div className="flex min-h-[3rem] items-center justify-between gap-3 pt-2">
            <div className="min-w-0">
              <h1 className="m-0 truncate font-serif text-base font-semibold leading-tight text-card-foreground">{topbarTitle}</h1>
              <p className="m-0 truncate text-sm leading-tight text-muted-foreground">{topbarSubtitle}</p>
            </div>

            {showTopbarDateFilters && (
              <div className="hidden shrink-0 items-center gap-2.5 rounded-[15px] border border-border bg-card px-2 py-2 lg:flex">
                <span className="mr-0.5 whitespace-nowrap text-[11px] font-medium text-muted-foreground">Periodo:</span>
                {TOPBAR_PERIOD_OPTIONS.map((option) => (
                  <AntButton
                    key={option.value}
                    type={topbarPeriod === option.value ? "primary" : "default"}
                    size="small"
                    className={cn(
                      "!h-7 !px-2 !text-xs !font-medium !shadow-none",
                      topbarPeriod === option.value ? "" : "!text-muted-foreground",
                    )}
                    onClick={() => {
                      setTopbarPeriod(option.value);
                      setTopbarDateRange(undefined);
                    }}
                  >
                    {option.label}
                  </AntButton>
                ))}
                <DatePickerWithRange
                  value={topbarPeriod === "custom" ? topbarDateRange : undefined}
                  onChange={(value) => {
                    setTopbarPeriod("custom");
                    setTopbarDateRange(value);
                  }}
                  className={cn("!h-7 !w-[230px]", topbarPeriod === "custom" && "!border-primary")}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent"
            aria-label="Notificacoes"
          >
            <Bell size={20} weight="bold" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
          </button>
          <ThemeToggle />
        </div>
      </div>
      <div className="mx-1 mt-2 h-px bg-border lg:mx-2" />
    </header>
  );
}

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative hidden shrink-0 lg:flex">
        <aside
          className={cn(
            "flex flex-col overflow-hidden border-r border-border transition-[width] duration-200 ease-in-out",
            collapsed ? "w-[80px]" : "w-[19rem]",
          )}
        >
          <SidebarContent collapsed={collapsed} />
        </aside>
      </div>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        placement="left"
        size={256}
        closable={false}
        styles={{
          body: { padding: 0, background: "var(--sidebar)" },
          section: { background: "var(--sidebar)" },
          header: { display: "none" },
        }}
      >
        <SidebarContent collapsed={false} />
      </Drawer>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          collapsed={collapsed}
          onSidebarToggle={() => setCollapsed((p) => !p)}
          onMobileMenuOpen={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto max-w-[1440px] p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
