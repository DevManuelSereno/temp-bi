"use client";

import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/shared/config/navigation";
import { SIDEBAR_NAME } from "@/shared/lib/constants";
import { ThemeToggle } from "@/shared/theme/theme-toggle";
import { ArrowFatLineLeft, ArrowFatLineRight, Bell, List } from "@phosphor-icons/react";
import { Avatar, Drawer, Tooltip } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface AppShellProps {
  children: React.ReactNode;
}

function SidebarContent({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const footerChips = ["PRIVACIDADE", "DADOS", "COOKIES"] as const;

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center gap-3 border-b border-border px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-serif text-sm font-bold">
          P
        </div>
        {!collapsed && (
          <span className="truncate font-serif text-base font-semibold tracking-tight">{SIDEBAR_NAME}</span>
        )}
      </div>
      {!collapsed && (
        <div className="px-4 pb-3 pt-2.5">
          <div className="flex items-center gap-3">
            <Avatar size={40} src="/icon.jpg" className="h-10 w-10 shrink-0 rounded-full">
              CC
            </Avatar>
            <span className="min-w-0 truncate text-sm font-semibold leading-none text-card-foreground">
              Capone Club
            </span>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-2 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
              collapsed
                ? "flex h-10 w-full items-center justify-center"
                : "flex items-center gap-2 px-2.5 py-2.5",
            );

            const itemContent = (
              <>
                {collapsed ? (
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
                )}
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
              <Link
                key={item.href}
                href={item.href as string}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                className={itemClassName}
              >
                {itemContent}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-sidebar-border p-3">
        {!collapsed && (
          <div className="rounded-xl border border-border bg-card/70 p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Status da sincronizacao
              </span>
              <span className="rounded-full border border-success/30 bg-success/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-success">
                success
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold text-card-foreground">20/02, 19:27</p>
            <p className="mt-1 text-[11px] text-muted-foreground">Tempo real: ativo (1440 min)</p>
            <button
              type="button"
              className="mt-3 w-full rounded-lg border border-sidebar-border bg-sidebar-accent px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-sidebar-foreground transition-colors hover:bg-sidebar-accent/80"
            >
              Rodar sincronizacao
            </button>
          </div>
        )}

        {!collapsed && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1.5">
              {footerChips.map((label) => (
                <button
                  key={label}
                  type="button"
                  className="rounded-full border border-sidebar-border px-2 py-1 text-[10px] font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Topbar({ onMobileMenuOpen }: { onMobileMenuOpen: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-6">
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent lg:hidden"
        onClick={onMobileMenuOpen}
        aria-label="Abrir menu"
      >
        <List size={20} weight="bold" />
      </button>

      <div className="flex-1" />

      <button
        type="button"
        className="relative flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent"
        aria-label="Notificacoes"
      >
        <Bell size={20} weight="bold" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
      </button>

      <ThemeToggle />
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
            collapsed ? "w-[68px]" : "w-64",
          )}
        >
          <SidebarContent collapsed={collapsed} />
        </aside>

        <button
          type="button"
          className="absolute -right-10 top-[15px] z-40 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          onClick={() => setCollapsed((p) => !p)}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          {collapsed ? <ArrowFatLineRight size={16} weight="fill" /> : <ArrowFatLineLeft size={16} weight="fill" />}
        </button>
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
        <Topbar onMobileMenuOpen={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto max-w-[1440px] p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
