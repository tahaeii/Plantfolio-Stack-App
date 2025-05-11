import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors();
  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('Plantfolio')
    .setDescription('The API documentation for Plantfolio')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // running server
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 5550;
  await app.listen(port);
  console.log(`server is running on port ${port}`);
}
bootstrap();
