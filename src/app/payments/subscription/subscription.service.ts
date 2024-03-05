import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { SubscriptionEntity } from './subscription.entity';
import { UserService } from 'src/app/user/user.service';
import { CompanyService } from 'src/app/company/company.service';
import { selectPlan } from 'src/utils/helper/payment/subscription/select-plan';
import { CouponService } from '../coupon/coupon.service';
import { CreateSubscriptionDto } from './dto/subscription.create.dto';
import { ResponseSubscriptionDto } from './dto/subscription.response.dto';
import { NewException } from 'src/utils/functions/new-exception';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    @InjectRepository(SubscriptionEntity)
    private subscriptionService: Repository<SubscriptionEntity>,
    private userService: UserService,
    private companyService: CompanyService,
    private couponService: CouponService
  ) { }

  async createSignature({
    user_id,
    plan,
    coupon
  }: CreateSubscriptionDto): Promise<ResponseSubscriptionDto> {
    try {
      const user = await this.userService.showRelation('id', user_id);
      const company = await this.companyService.show('id', user.company.id);

      const planId = await selectPlan(plan);
      const couponItem = await this.couponService.getCoupon({ coupon });

      const subscription = await this.stripeClient.subscriptions.create({
        customer: user.customer_id,
        coupon: couponItem.id || '',
        items: [
          {
            price: planId
          }
        ]
      });

      const subscriptionCreate = this.subscriptionService.create({
        plan,
        customer_id: user.customer_id,
        subscription_id: subscription.id,
        company,
        user,
        next_payment_date: new Date(subscription.current_period_end),
        inital_payment_date: new Date(subscription.current_period_start),
        create_payment_date: new Date(subscription.created)
      });

      const subscriptionData = await this.subscriptionService.save(subscriptionCreate);

      user.subscription = subscriptionData;
      await this.userService.update(user.id, user);

      company.subscription = subscriptionData;
      await this.companyService.update(company.id, company);

      const subscriptionResponse = await this.subscriptionService.findOne({
        where: { id: subscriptionCreate.id },
        relations: { user: true, company: true }
      });

      return subscriptionResponse;
    } catch (error) {
      NewException({ error, exceptionDescription: 'erro ao criar assinatura', exceptionStatus: HttpStatus.INTERNAL_SERVER_ERROR })
    }
  }
}
