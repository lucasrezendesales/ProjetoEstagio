"use client";

import * as React from "react";
import {
  BookOpen,
  GalleryVerticalEnd,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Isadora Belmont",
    email: "isadora@belmont.com",
    avatar: "/isadora.jpg",
  },
  teams: [
    {
      name: "Isadora Belmont Semijoias",
      logo: GalleryVerticalEnd,
    },
  ],
  navMain: [
    {
      title: "Painel de Controle",
      url: "/dashboard",
      icon: PieChart,
      isActive: true,
      items: [
        {
          title: "Visão Geral",
          url: "/dashboard",
        },
        {
          title: "Despesas/Vendas",
          url: "/dashboard/expenses",
        },
        {
          title: "Relatórios",
          url: "/dashboard/reports",
        },
        {
          title: "Categorias",
          url: "/dashboard/categories",
        },
      ],
    },
    {
      title: "Transações",
      url: "/transactions",
      icon: SquareTerminal,
      items: [
        {
          title: "Visualizar Transações",
          url: "/transactions/view",
        },
        {
          title: "Adicionar Transação",
          url: "/transactions/add",
        },
      ],
    },
    {
      title: "Relatórios Financeiros",
      url: "/reports",
      icon: BookOpen,
      items: [
        {
          title: "Contas a Pagar",
          url: "/reports/accounts-payable",
        },
        {
          title: "Contas a Receber",
          url: "/reports/accounts-receivable",
        },
      ],
    },
    {
      title: "Configurações",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "Perfil",
          url: "/settings/profile",
        },
        {
          title: "Cobrança",
          url: "/settings/billing",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
