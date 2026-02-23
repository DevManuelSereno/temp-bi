import {
  Funnel,
  Gear,
  Info,
  Lightbulb,
  Megaphone,
  SquaresFour,
  Users,
  Wallet,
  type Icon,
} from "@phosphor-icons/react";

export interface NavItem {
  label: string;
  href: string | null;
  icon: Icon;
  disabled?: boolean;
  description?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Visao Geral",
    href: "/",
    icon: SquaresFour,
    description: "Resumo executivo e KPIs principais",
  },
  {
    label: "Campanhas",
    href: "/campanhas",
    icon: Megaphone,
    description: "Performance de midia paga e campanhas",
  },
  {
    label: "Clientes",
    href: "/crm",
    icon: Users,
    description: "Relacionamento e base de clientes",
  },
  {
    label: "Funil",
    href: null,
    disabled: true,
    icon: Funnel,
    description: "Visao dedicada do funil comercial",
  },
  {
    label: "DRE",
    href: "/erp",
    icon: Wallet,
    description: "Resultado financeiro consolidado",
  },
  {
    label: "Inteligencia",
    href: "/visual",
    icon: Lightbulb,
    description: "Analises e insights do negocio",
  },
  {
    label: "Agentes IA",
    href: null,
    disabled: true,
    icon: Info,
    description: "Automacoes e agentes inteligentes",
  },
  {
    label: "Base de Conhecimento",
    href: null,
    disabled: true,
    icon: Info,
    description: "Documentacao e playbooks",
  },
  {
    label: "Configuracoes",
    href: "/settings",
    icon: Gear,
    description: "Tema e preferencias do painel",
  },
];
