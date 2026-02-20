import {
    LayoutDashboard,
    Megaphone,
    Settings,
    Users,
    Wallet,
    type LucideIcon
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
        label: "Omie",
        href: "/omie",
        icon: Wallet,
        description: "Visão financeira e operacional do Omie",
    },
    {
        label: "CRM",
        href: "/crm",
        icon: Users,
        description: "CRM, pipeline e performance comercial",
    },
    {
        label: "Meta Ads",
        href: "/meta-ads",
        icon: Megaphone,
        description: "Performance de mídia paga e campanhas",
    },
    {
        label: "Configurações",
        href: "/settings",
        icon: Settings,
        description: "Tema, preferências e personalização",
    },
];


