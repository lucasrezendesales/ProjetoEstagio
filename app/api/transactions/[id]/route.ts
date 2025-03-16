import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // Aguarde a resolução de 'params'
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      return NextResponse.json({ error: "Transação não encontrada" }, { status: 404 });
    }

    return NextResponse.json(transaction);
  } catch (error) {
    console.error("Erro ao buscar transação:", error);
    return NextResponse.json({ error: "Erro ao buscar transação" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // Aguarde a resolução de 'params'
  try {
    const body = await req.json();
    const transaction = await prisma.transaction.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.error("Erro ao atualizar transação:", error);
    return NextResponse.json({ error: "Erro ao atualizar transação" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // Aguarde a resolução de 'params'
  try {
    await prisma.transaction.delete({ where: { id } });
    return NextResponse.json({ message: "Transação removida com sucesso" });
  } catch (error) {
    console.error("Erro ao remover transação:", error);
    return NextResponse.json({ error: "Erro ao remover transação" }, { status: 500 });
  }
}
