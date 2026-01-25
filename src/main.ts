import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { LanguageInterceptor } from './interceptors/languageHandle.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import * as express from 'express';
import { join } from 'path';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true, // THROWS error if extra keys exist
    }),
  );

  // Interceptor لتوحيد رسائل النجاح
  app.useGlobalInterceptors(new ResponseInterceptor());

  // To handle the responce depend on the language
  app.useGlobalInterceptors(new LanguageInterceptor());

  app.useGlobalGuards(new AuthGuard());
  // app.useGlobalGuards(new AuthGuard())

  // TO MAKE THE APP USE THE COOKIE SESSIONS
  app.use(
    cookieSession({
      keys: ['user_token'],
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }),
  );

  app.enableCors({
    origin: true,
  });

  // Disable ETag generation
  app.getHttpAdapter().getInstance().disable('etag');

  // Set cache control globally
  // app.use((req, res, next) => {
  //   res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  //   res.setHeader('Pragma', 'no-cache');
  //   res.setHeader('Expires', '0');
  //   next();
  // });

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
