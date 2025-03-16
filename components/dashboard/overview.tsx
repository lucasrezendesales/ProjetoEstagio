import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Eye, Target, ThumbsUp } from "lucide-react";

// Mock de dados (será substituído pelo backend depois)
const transactions = [
  { amount: 5000, type: "income" },
  { amount: -1500, type: "expense" },
  { amount: 2000, type: "income" },
  { amount: -750, type: "expense" },
  { amount: 1000, type: "income" },
];

// Calcula totais
const totalIncome = transactions
  .filter((tx) => tx.type === "income")
  .reduce((acc, tx) => acc + tx.amount, 0);

const totalExpense = transactions
  .filter((tx) => tx.type === "expense")
  .reduce((acc, tx) => acc + tx.amount, 0);

const totalBalance = totalIncome + totalExpense;

export default function Overview() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Card de Receita (Impressions) */}
      <Card className="rounded-lg shadow-md border bg-white text-black">
        <CardContent className="p-4">
          <CardTitle className="text-sm text-gray-500">Receita Total</CardTitle>
          <p className="text-2xl font-bold">
            {totalIncome.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <div className="flex justify-end">
            <div className="bg-gray-200 p-2 rounded-md">
              <Eye className="h-5 w-5 text-gray-700" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card de Despesa (Goal) */}
      <Card className="rounded-lg shadow-md border bg-white text-black">
        <CardContent className="p-4">
          <CardTitle className="text-sm text-gray-500">Despesas</CardTitle>
          <p className="text-2xl font-bold">
            {totalExpense.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <div className="flex justify-end">
            <div className="bg-gray-200 p-2 rounded-md">
              <Target className="h-5 w-5 text-gray-700" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card de Saldo (Impact) */}
      <Card className="rounded-lg shadow-md border bg-white text-black">
        <CardContent className="p-4">
          <CardTitle className="text-sm text-gray-500">Saldo Atual</CardTitle>
          <p className="text-2xl font-bold">
            {totalBalance.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <div className="flex justify-end">
            <div className="bg-gray-200 p-2 rounded-md">
              <ThumbsUp className="h-5 w-5 text-gray-700" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
