import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService=app.get(ConfigService)
  const port=configService.get<number>('PORT') ?? 5550
  await app.listen(port);
  console.log(`server is running on port ${port}`)
}
bootstrap();
