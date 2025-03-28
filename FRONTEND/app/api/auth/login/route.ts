import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { serialize } from 'cookie';
import { z } from 'zod';
import { rateLimiter } from '@/app/middleware/rateLimit';

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha inválida"),
});

export async function POST(req: Request) {
  const rateLimitResponse = await rateLimiter(req);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 400 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    const response = NextResponse.json({ message: "Login bem-sucedido", token });
    response.headers.set('Set-Cookie', serialize('auth_token', token, { httpOnly: true, secure: true, path: '/' }));

    return response;
  } catch (error) {
    console.error("Erro no processamento:", error);
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 400 });
  }
}
