import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { CreateLoginEmailDto } from './dto/sendgrid.create.dto';

@Injectable()
export class SendMailService {
  constructor(
    @InjectSendGrid() private sendGridClient: SendGridService,
    private configService: ConfigService
  ) { }
  private SenderEmail = this.configService.get<string>('SENDGRID_SENDER');
  private TemplateId = this.configService.get<string>('SENDGRID_TEMPLATE_ID');

  async createTemplateOptions({ email, name, link }: CreateLoginEmailDto) {
    const options = {
      from: {
        email: this.SenderEmail,
        name: `Olá ${name}`
      },
      personalizations: [
        {
          to: email,
          subject: `seu link de acesso chegou!`,
          from: {
            email: this.SenderEmail,
            name: `Olá ${name}`,
            subject: `seu link de acesso chegou!`
          }
        }
      ],
      dynamicTemplateData: {
        name,
        link
      },
      templateId: this.TemplateId
    };
    return options;
  }

  async sendLoginEmail({ email, name, link }: CreateLoginEmailDto) {
    const options = await this.createTemplateOptions({ email, name, link });
    return await this.sendGridClient.send(options);
  }
}
