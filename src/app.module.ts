import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { BullModule } from '@nestjs/bull';
import { BullConfigService } from './config/bull.config.service';
import { AllModule } from './app/all.module';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { SendGridConfigService } from './config/sendgrid.config.service';

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
      useClass: SendGridConfigService
    })
  ],
})
export class AppModule { }