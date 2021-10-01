import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const globalPrefix: string = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
