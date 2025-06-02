import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.setViewEngine('hbs');           // Enable Handlebars
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  const configer = app.get(ConfigService);

  const host = configer.get<string>('APP_HOST') || 'localhost';
  const port = parseInt(configer.get<string>('APP_PORT') || '8000');


  app.enableCors();
  const configDoc = new DocumentBuilder()
      .setTitle('POST MODEL')
      .setDescription('Post swagger')
      .setVersion('1.0')
      .addTag('Posts')
      .build();
  const documentFactory = () => SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup('api', app, documentFactory);



  await app.listen(port, host);
}
bootstrap();
