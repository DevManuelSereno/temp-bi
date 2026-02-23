"use client";

import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/shared/config/navigation";
import { SIDEBAR_NAME } from "@/shared/lib/constants";
import { ThemeToggle } from "@/shared/theme/theme-toggle";
import { ArrowFatLineLeft, ArrowFatLineRight, Bell, List } from "@phosphor-icons/react";
import { Avatar, Divider, Drawer } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface AppShellProps {
  children: React.ReactNode;
}

function SidebarContent({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-serif font-bold text-sm">
          P
        </div>
        {!collapsed && (
          <span className="font-serif font-semibold text-base tracking-tight truncate">
            {SIDEBAR_NAME}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  "focus-visible:outline-2 focus-visible:outline-ring",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                    : "text-sidebar-foreground/70",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-sidebar-primary")} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <Divider className="!my-0 !border-sidebar-border" />
      <div className="flex items-center gap-3 p-4">
        <Avatar size={32} src="/icon.jpg">
          CC
        </Avatar>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">Capone Club</span>
            <span className="text-xs text-muted-foreground truncate">Admin</span>
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
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
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
      <div className="hidden lg:flex relative shrink-0">
        <aside
          className={cn(
            "flex flex-col border-r border-sidebar-border transition-[width] duration-200 ease-in-out overflow-hidden",
            collapsed ? "w-[68px]" : "w-60",
          )}
        >
          <SidebarContent collapsed={collapsed} />
        </aside>

        <button
          type="button"
          className="absolute -right-10 top-[15px] z-40 flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground cursor-pointer"
          onClick={() => setCollapsed((p) => !p)}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          {collapsed ? (
            <ArrowFatLineRight size={16} weight="fill" />
          ) : (
            <ArrowFatLineLeft size={16} weight="fill" />
          )}
        </button>
      </div>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        placement="left"
        size={240}
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
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1440px] p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
