import { NextResponse } from 'next/server';

const rateLimit = new Map<string, { count: number; firstRequest: number }>();

export async function rateLimiter(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

  if (!ip) return NextResponse.json({ error: "IP não identificado" }, { status: 429 });

  const now = Date.now();
  const requestInfo = rateLimit.get(ip) || { count: 0, firstRequest: now };

  // Se passaram menos de 1 minuto e o usuário já fez mais de 5 requisições, bloqueia
  if (now - requestInfo.firstRequest < 60000 && requestInfo.count >= 5) {
    return NextResponse.json({ error: "Muitas requisições, tente novamente mais tarde" }, { status: 429 });
  }

  // Se passou mais de 1 minuto, reseta o contador
  if (now - requestInfo.firstRequest >= 60000) {
    rateLimit.set(ip, { count: 1, firstRequest: now });
  } else {
    requestInfo.count += 1;
    rateLimit.set(ip, requestInfo);
  }

  return null;
}

