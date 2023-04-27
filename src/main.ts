import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Admin Panel API')
    .setDescription('The Admin-Panel API Description')
    .setVersion('1.0.0')
    .addTag('Admin-Panel')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/swaggerui', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
