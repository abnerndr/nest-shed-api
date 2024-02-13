import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ClientModule } from './client/client.module';
import { StockModule } from './stocks/stocks.module';
import { FinancialModule } from './financial/financial.module';
import { RealtionsModule } from './relations/relations.module';
import { SendGridModule } from './sendgrid/sendgrid.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { SignatureModule } from './signature/signature.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ScheduleModule,
    ClientModule,
    StockModule,
    FinancialModule,
    RealtionsModule,
    SendGridModule,
    CompanyModule,
    SignatureModule
  ]
})
export class AllModule {}
