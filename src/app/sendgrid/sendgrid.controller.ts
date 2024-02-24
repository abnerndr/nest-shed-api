import { Body, Controller, Post } from '@nestjs/common';
import { SendMailService } from './sendgrid.service';

@Controller('mailersend')
export class SendGridController {
  constructor(private sendMailService: SendMailService) {}
}
