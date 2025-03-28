"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// 🔹 Definição do Schema de validação com Zod (ajustado para o Prisma)
const expenseSchema = z.object({
  description: z
    .string()
    .min(3, "A descrição deve ter pelo menos 3 caracteres"),
  amount: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().positive("O valor deve ser positivo")
  ),
  category: z.string().min(3, "A categoria é obrigatória"),
  paymentType: z.enum(["Cartão", "Pix", "Boleto"], {
    errorMap: () => ({ message: "Selecione um método de pagamento válido" }),
  }),
  date: z.string(),
  userId: z.string().uuid("ID do usuário inválido"),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export default function NewExpenseForm({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]); // 🔹 Definir a data apenas no cliente
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: { userId }, // 🔹 Vinculando despesa ao usuário logado
  });

  async function onSubmit(data: ExpenseFormData) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          type: "expense",
          date: new Date(data.date),
        }), // 🔹 Formata a data corretamente
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar despesa");
      }

      toast.success("Despesa cadastrada com sucesso!");
      reset(); // 🔹 Limpa o formulário após o sucesso
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar despesa.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      {/* Descrição */}
      <div>
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          {...register("description")}
          placeholder="Ex: Compra de material"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Valor */}
      <div>
        <Label htmlFor="amount">Valor</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          {...register("amount")}
          placeholder="Ex: 150.75"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}
      </div>

      {/* Categoria */}
      <div>
        <Label htmlFor="category">Categoria</Label>
        <Input
          id="category"
          {...register("category")}
          placeholder="Ex: Alimentação, Transporte"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Método de Pagamento */}
      <div>
        <Label htmlFor="paymentType">Método de Pagamento</Label>
        <select
          {...register("paymentType")}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Selecione...</option>
          <option value="Cartão">Cartão</option>
          <option value="Pix">Pix</option>
          <option value="Boleto">Boleto</option>
        </select>
        {errors.paymentType && (
          <p className="text-red-500 text-sm">{errors.paymentType.message}</p>
        )}
      </div>

      {/* Data */}
      <div>
        <Label htmlFor="date">Data</Label>
        {today && (
          <Input
            id="date"
            type="date"
            defaultValue={today}
            {...register("date")}
          />
        )}
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      {/* Botão de Envio */}
      <Button type="submit" className="w-full" disabled={isLoading || !today}>
        {isLoading ? "Salvando..." : "Cadastrar Despesa"}
      </Button>
    </form>
  );
}
