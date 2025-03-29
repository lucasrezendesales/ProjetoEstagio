// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Segurança
  app.use(helmet.default());
  app.use(cookieParser(process.env.COOKIE_SECRET));

  if (process.env.NODE_ENV === 'development') {
    app.use(csurf({ cookie: true }));
  }

  // Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Filtro de exceções global
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}

bootstrap().catch((err) => {
  console.error('Falha ao iniciar aplicativo', err);
  process.exit(1);
});
