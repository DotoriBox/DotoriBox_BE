import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://dotoribox-frontend.s3-website.kr.object.ncloudstorage.com',
      'http://dotoribox-driver-fe.s3-website.kr.object.ncloudstorage.com',
    ],
  });
  await app.listen(process.env.NEST_PORT);
}
bootstrap();
