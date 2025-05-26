import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setViewEngine('hbs');           // Enable Handlebars
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  const host = '127.0.0.1';
  const port = parseInt( '8000');
  app.enableCors();
  const config = new DocumentBuilder()
      .setTitle('POST MODEL')
      .setDescription('Post swagger')
      .setVersion('1.0')
      .addTag('Posts')
      .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);



  await app.listen(port, host);
}
bootstrap();
