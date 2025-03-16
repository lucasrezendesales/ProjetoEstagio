import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken"

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany();
    return NextResponse.json(transactions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar transações" }, { status: 500 });
  }
}

export async function POST(req: Request) {
    try {
      // Lê o corpo da requisição
      const { description, amount, type, category, paymentType, date } = await req.json();
  
      // Obter o userId da autenticação (ou outro contexto)
      const token = req.headers.get("Cookie")?.split("auth_token=")[1];
  
      if (!token) {
        return NextResponse.json({ error: "Token não encontrado" }, { status: 401 });
      }
  
      // Aqui, você precisa implementar sua lógica para decodificar o token
      // e extrair o userId. Como exemplo, estou assumindo que o token é JWT:
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      const userId = decoded.id;
  
      if (!userId) {
        return NextResponse.json({ error: "userId não encontrado no token" }, { status: 401 });
      }
  
      // Cria a transação no banco de dados
      const transaction = await prisma.transaction.create({
        data: {
          description,
          amount,
          type,
          category,
          paymentType,
          date: new Date(date), // Certifique-se de que a data é válida
          userId,
        },
      });
  
      return NextResponse.json(transaction);
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      return NextResponse.json({ error: "Erro ao criar transação" }, { status: 500 });
    }
  }