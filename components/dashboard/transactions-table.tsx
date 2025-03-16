"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// 🔹 Definição de tipos para as transações
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  paymentType: string;
}

// 🔹 Definição do número de itens por página
const ITEMS_PER_PAGE = 5;

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/transactions");
        const data: Transaction[] = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    }

    fetchTransactions();
  }, []);

  // Calcula totais
  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalBalance = totalIncome + totalExpense;

  // 🔹 Paginação: Determina os dados da página atual
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // 🔹 Função para trocar de página
  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <Table>
        <TableCaption>Lista das suas transações recentes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Método</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTransactions.map((tx) => (
            <TableRow
              key={tx.id}
              className={tx.type === "income" ? "font-base" : "font-bold"}
            >
              <TableCell>{tx.id.slice(0, 8)}</TableCell> {/* 🔹 ID encurtado */}
              <TableCell>{tx.description}</TableCell>
              <TableCell>
                <span>{tx.type === "income" ? "Receita" : "Despesa"}</span>
              </TableCell>
              <TableCell>{tx.paymentType}</TableCell>
              <TableCell>
                {new Date(tx.date).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell className="text-right">
                {tx.amount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="font-bold">
              Total Receita
            </TableCell>
            <TableCell className="text-right font-bold">
              {totalIncome.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="font-bold">
              Total Despesa
            </TableCell>
            <TableCell className="text-right font-bold">
              {totalExpense.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="font-bold">
              Saldo Final
            </TableCell>
            <TableCell
              className={`text-right font-bold ${
                totalBalance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {totalBalance.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* 🔹 Paginação */}
      <div className="flex justify-between items-center mt-4">
        <Button onClick={goToPrevPage} disabled={currentPage === 1}>
          Anterior
        </Button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Próxima
        </Button>
      </div>
    </div>
  );
}
