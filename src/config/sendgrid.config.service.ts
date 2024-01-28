import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SendGridModuleOptions, SendGridOptionsFactory } from "@ntegral/nestjs-sendgrid";

@Injectable()
export class SendGridConfigService implements SendGridOptionsFactory {
    constructor(private configService: ConfigService) { }
    createSendGridOptions(): SendGridModuleOptions | Promise<SendGridModuleOptions> {
        return {
            apiKey: this.configService.get<string>('SENDGRID_KEY')
        }
    }
}