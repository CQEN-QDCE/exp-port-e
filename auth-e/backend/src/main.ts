import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, new DocumentBuilder().setTitle('Item API')
                                                                          .setDescription('My Item API')
                                                                          .build());
  SwaggerModule.setup('api', app, document);
  await app.listen(3300);
}
bootstrap();
