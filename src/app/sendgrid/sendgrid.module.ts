import { Module } from '@nestjs/common';
import { SendMailService } from './sendgrid.service';
import { SendGridController } from './sendgrid.controller';

@Module({
  imports: [],
  providers: [SendMailService],
  controllers: [SendGridController]
})
export class SendGridModule {}
