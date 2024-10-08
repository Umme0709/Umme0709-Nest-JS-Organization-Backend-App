import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

/*
  author = 'Tubba'
  copyright = 'Copyright 2024, AZZIN LLC' */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors( {
    credentials: true
  })
  await app.listen(3000);
}
bootstrap();
