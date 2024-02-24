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
import { CustomerModule } from './payments/customer/customer.module';
import { SubscriptionModule } from './payments/subscription/subscription.module';
import { CouponModule } from './payments/coupon/coupon.module';
import { PaymentMethodModule } from './payments/payment-method/payment-method.module';

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
    CustomerModule,
    SubscriptionModule,
    CouponModule,
    PaymentMethodModule
  ]
})
export class AllModule { }
