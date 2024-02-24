import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from './subscription.entity';
import { CompanyEntity } from 'src/app/company/company.entity';
import { UserEntity } from 'src/app/user/user.entity';
import { SubscriptionService } from './subscription.service';
import { UserService } from 'src/app/user/user.service';
import { CompanyService } from 'src/app/company/company.service';
import { CustomerService } from '../customer/customer.service';
import { SubscriptionController } from './subscription.controller';
import { CouponService } from '../coupon/coupon.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity, CompanyEntity, UserEntity])],
  providers: [
    SubscriptionService,
    UserService,
    CompanyService,
    CustomerService,
    CouponService
  ],
  controllers: [SubscriptionController]
})
export class SubscriptionModule {}
