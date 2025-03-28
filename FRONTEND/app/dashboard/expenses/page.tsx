import NewExpenseForm from "@/components/forms/new-expense-form";

export default function ExpensesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Cadastrar Nova Despesa</h1>
      <NewExpenseForm />
    </div>
  );
}
