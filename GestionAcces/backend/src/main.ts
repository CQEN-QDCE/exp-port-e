import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
	    .setTitle('Expérimentation Port-e')
	    .setDescription('API pour soutenir l application port-e ')
	    .setVersion('1.0')
	    .addTag('port-e')
	    .build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
