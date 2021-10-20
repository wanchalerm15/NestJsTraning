import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // เพิ่ม Validator
  app.useGlobalPipes(new ValidationPipe());

  // เพิ่ม Swagger UI => OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Tranning Nestjs')
    .setDescription('The nestjs API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('help', app, document);

  await app.listen(3000);
}
bootstrap();
