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
  headerTitle?: string;
  headerSubtitle?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Visão Geral",
    href: "/",
    icon: SquaresFour,
    description: "Resumo executivo e KPIs principais",
    headerTitle: "Resumo Executivo",
    headerSubtitle: "Visão consolidada — Financeiro, Comercial e Mídia",
  },
  {
    label: "Campanhas",
    href: "/campanhas",
    icon: Megaphone,
    description: "Performance de midia paga e campanhas",
    headerTitle: "Campanhas - Performance",
    headerSubtitle: "Investimento, leads e métricas de mídia paga",
  },
  {
    label: "Clientes",
    href: "/crm",
    icon: Users,
    description: "Relacionamento e base de clientes",
    headerTitle: "CRM - Pipeline Comercial",
    headerSubtitle: "CRM, funil de vendas e performance da equipe",
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
    headerTitle: "ERP - Financeiro",
    headerSubtitle: "Visão consolidada de receitas, despesas e resultados",
  },
  {
    label: "Inteligência",
    href: "/visual",
    icon: Lightbulb,
    description: "Analises e insights do negocio",
    headerTitle: "Dashboard Visual",
    headerSubtitle: "KPIs com filtros associativos",
  },
  {
    label: "Agentes IA",
    href: "/agentes",
    icon: Info,
    description: "Automacoes e agentes inteligentes",
    headerTitle: "Agentes IA",
    headerSubtitle: "Visao executiva + interface conversacional",
  },
  {
    label: "Base de Conhecimento",
    href: null,
    disabled: true,
    icon: Info,
    description: "Documentacao e playbooks",
  },
  {
    label: "Configurações",
    href: "/settings",
    icon: Gear,
    description: "Tema e preferencias do painel",
    headerTitle: "Configurações",
    headerSubtitle: "Personalize a aparência e preferências do painel",
  },
];
