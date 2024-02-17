import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { BullModule } from '@nestjs/bull';
import { BullConfigService } from './config/bull.config.service';
import { AllModule } from './app/all.module';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { SendGrindConfigService } from './config/sendgrid.config.service';
import { StripeModule } from 'nestjs-stripe';
import { StripeConfigService } from './config/stripe.config.service';

@Module({
  imports: [
    AllModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    }),
    BullModule.forRootAsync({
      useClass: BullConfigService
    }),
    SendGridModule.forRootAsync({
      useClass: SendGrindConfigService
    }),
    StripeModule.forRootAsync({
      useClass: StripeConfigService
    })
  ]
})
export class AppModule { }
