import {
    LayoutDashboard,
    BarChart3,
    Settings,
    type LucideIcon,
} from "lucide-react";

export interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
    description?: string;
}

export const NAV_ITEMS: NavItem[] = [
    {
        label: "Visão Geral",
        href: "/",
        icon: LayoutDashboard,
        description: "Resumo executivo e KPIs principais",
    },
    {
        label: "Painel Visual",
        href: "/visual",
        icon: BarChart3,
        description: "Dashboard completo com gráficos e análises",
    },
    {
        label: "Configurações",
        href: "/settings",
        icon: Settings,
        description: "Tema, preferências e personalização",
    },
];
