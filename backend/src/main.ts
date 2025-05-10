import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform:true,whitelist:true}))
  app.enableCors({origin:'*'})
  const configService=app.get(ConfigService)
  const port=configService.get<number>('PORT') ?? 5550
  await app.listen(port);
  console.log(`server is running on port ${port}`)
}
bootstrap();
