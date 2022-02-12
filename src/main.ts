import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://dotoribox-frontend.s3-website.kr.object.ncloudstorage.com',
      'http://dotoribox-driver-fe.s3-website.kr.object.ncloudstorage.com',
      'http://localhost:3000',
    ],
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(process.env.NEST_PORT);
}
bootstrap();
