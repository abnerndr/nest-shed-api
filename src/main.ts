import { NestFactory } from '@nestjs/core';
import * as parser from 'body-parser'
import { AppModule } from './app.module';
import { LOGGER_HOST, PORT } from './utils/constants/port';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()
  app.useGlobalPipes()
  app.use(parser.urlencoded({ extended: false }))
  app.use(parser.text({ type: 'text/html' }))
  app.use(parser.json())

  await app.listen(PORT, () => {
    Logger.log(LOGGER_HOST)
  });
}
bootstrap();
