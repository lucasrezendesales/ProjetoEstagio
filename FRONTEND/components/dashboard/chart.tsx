"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// 🔹 Definição de tipos para as transações
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  paymentType: string;
}

// 🔹 Definição de tipos para os dados do gráfico
interface ChartData {
  month: string;
  income: number;
  expense: number;
}

export default function FinanceBarChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/transactions");
        const transactions: Transaction[] = await response.json();

        // Agrupa receitas e despesas por mês
        const groupedData: Record<string, ChartData> = transactions.reduce(
          (acc, tx) => {
            const month = new Date(tx.date).toLocaleString("pt-BR", {
              month: "long",
            });

            if (!acc[month]) {
              acc[month] = { month, income: 0, expense: 0 };
            }

            if (tx.type === "income") {
              acc[month].income += tx.amount;
            } else {
              acc[month].expense += tx.amount;
            }

            return acc;
          },
          {} as Record<string, ChartData>
        );

        // Converte o objeto em array ordenado por mês
        const formattedData: ChartData[] = Object.values(groupedData).sort(
          (a, b) =>
            new Date(`01 ${a.month} 2024`).getTime() -
            new Date(`01 ${b.month} 2024`).getTime()
        );

        setChartData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
      }
    }

    fetchTransactions();
  }, []);

  // Configuração do gráfico
  const chartConfig: ChartConfig = {
    income: {
      label: "Receitas",
      color: "black", // 🔹 Cor preta para Receitas
    },
    expense: {
      label: "Despesas",
      color: "black", // 🔹 Cor preta para Despesas
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fluxo de Caixa - Últimos 6 meses</CardTitle>
        <CardDescription>Receitas e despesas por mês</CardDescription>
      </CardHeader>
      <CardContent>
        {/* 🔹 Ajuste da altura para no máximo 50vh */}
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="income" fill="black" radius={4} />{" "}
            {/* 🔹 Receita em preto */}
            <Bar dataKey="expense" fill="black" radius={4} />{" "}
            {/* 🔹 Despesa em preto */}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
