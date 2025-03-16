import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

// Middleware que combina validação de token e verificação de usuário
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 401 });
    }

    // Autorização confirmada, prosseguir com a requisição
    return NextResponse.next();
  } catch (error) {
    console.error("Erro no processamento:", error);
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}

// Aplica o middleware apenas em rotas protegidas
export const config = {
  matcher: ["/dashboard"],
};
