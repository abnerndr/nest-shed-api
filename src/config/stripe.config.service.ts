import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StripeOptions, StripeOptionsFactory } from 'nestjs-stripe';

@Injectable()
export class StripeConfigService implements StripeOptionsFactory {
    constructor(private configService: ConfigService) { }
    createStripeOptions(): StripeOptions | Promise<StripeOptions> {
        return {
            apiKey: this.configService.get<string>('STRIPE_PRIVAT_KEY'),
            apiVersion: '2023-10-16'
        }
    }
}