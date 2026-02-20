"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/shared/config/navigation";
import { SIDEBAR_NAME } from "@/shared/lib/constants";
import { ThemeToggle } from "@/shared/theme/theme-toggle";
import {
    ArrowBigLeftDash,
    ArrowBigRightDash,
    Bell,
    PanelLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface AppShellProps {
    children: React.ReactNode;
}

/* ── Sidebar content (reused in desktop + mobile sheet) ──── */
function SidebarContent({ collapsed }: { collapsed: boolean }) {
    const pathname = usePathname();

    return (
        <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
            {/* Logo / Brand */}
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

            {/* Navigation */}
            <ScrollArea className="flex-1 py-4">
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
                                        : "text-sidebar-foreground/70"
                                )}
                                aria-current={isActive ? "page" : undefined}
                            >
                                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-sidebar-primary")} />
                                {!collapsed && <span className="truncate">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </ScrollArea>

            {/* Footer */}
            <Separator className="bg-sidebar-border" />
            <div className="flex items-center gap-3 p-4">
                <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src="/icon.jpg" alt="Capone Club" className="object-cover" />
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

/* ── Topbar ────────────────────────────────────────── */
function Topbar({ onMobileMenuOpen }: { onMobileMenuOpen: () => void }) {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-6">
            {/* Mobile hamburger */}
            <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 lg:hidden"
                onClick={onMobileMenuOpen}
                aria-label="Abrir menu"
            >
                <PanelLeft className="h-5 w-5" />
            </Button>

            <div className="flex-1" />

            {/* Actions */}
            <Button variant="ghost" size="icon" className="h-9 w-9 relative cursor-pointer" aria-label="Notificações">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
            </Button>

            <ThemeToggle />
        </header>
    );
}

/* ── AppShell ──────────────────────────────────────── */
export function AppShell({ children }: AppShellProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Desktop sidebar + floating toggle */}
            <div className="hidden lg:flex relative shrink-0">
                <aside
                    className={cn(
                        "flex flex-col border-r border-sidebar-border transition-[width] duration-200 ease-in-out overflow-hidden",
                        collapsed ? "w-[68px]" : "w-60"
                    )}
                >
                    <SidebarContent collapsed={collapsed} />
                </aside>

                {/* Floating collapse/expand toggle on the sidebar edge */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-10 top-[15px] z-40 h-7 w-7 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    onClick={() => setCollapsed((p) => !p)}
                    aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
                >
                    {collapsed ? (
                        <ArrowBigRightDash className="h-4 w-4" />
                    ) : (
                        <ArrowBigLeftDash className="h-4 w-4" />
                    )}
                </Button>
            </div>

            {/* Mobile sidebar (sheet) */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                    <span className="sr-only">Menu</span>
                </SheetTrigger>
                <SheetContent side="left" className="w-60 p-0">
                    <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
                    <SidebarContent collapsed={false} />
                </SheetContent>
            </Sheet>

            {/* Main area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <Topbar onMobileMenuOpen={() => setMobileOpen(true)} />
                <main className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-[1440px] p-4 lg:p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
