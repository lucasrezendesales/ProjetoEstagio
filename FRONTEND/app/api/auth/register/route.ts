import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';
import { rateLimiter } from '@/app/middleware/rateLimit';

// Validação dos dados recebidos
const registerSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export async function POST(req: Request) {
  try {
    // ✅ Aplica o Rate Limiting antes de processar a requisição
    const rateLimitResponse = await rateLimiter(req);
    if (rateLimitResponse) return rateLimitResponse;

    // ✅ Lê o corpo da requisição
    const body = await req.json();
    const name = sanitizeHtml(body.name, { allowedTags: [], allowedAttributes: {} });
    const email = sanitizeHtml(body.email, { allowedTags: [], allowedAttributes: {} });
    const password = body.password; // ✅ `const` porque não será modificado

    // ✅ Valida os dados com Zod
    registerSchema.parse({ name, email, password });

    // ✅ Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 400 });
    }

    // ✅ Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Cria o usuário no banco de dados com os dados limpos
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({ message: "Usuário criado com sucesso", user }, { status: 201 });

  } catch (error) {
    console.error("Erro ao registrar:", error);
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 400 });
  }
}
