import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as parser from 'body-parser';
import { AppModule } from './app.module';
import { LOGGER_HOST, PORT } from './utils/constants/port';

import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/static', express.static(path.join(__dirname, 'static')));
  const swaggerOptions = new DocumentBuilder()
    .setTitle('shcd (API)')
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .addTag('example')
    .build();

  const documentSwagger = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup('/docs', app, documentSwagger, {
    customCss: '/static/swagger-dark-theme.html'
  })

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(parser.urlencoded({ extended: false }));
  app.use(parser.text({ type: 'text/html' }));
  app.use(parser.json());

  await app.listen(PORT, () => {
    Logger.log(LOGGER_HOST);
  });
}
bootstrap();
