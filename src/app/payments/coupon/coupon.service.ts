import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { getCouponId } from 'src/utils/helper/payment/coupon/get-coupon-id';
import Stripe from 'stripe';

@Injectable()
export class CouponService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  async getCoupon(coupon: string) {
    try {
      const coupons = await this.stripeClient.coupons.list();
      const couponId = await getCouponId({ code: coupon, coupons });
      const couponData = await this.stripeClient.coupons.retrieve(couponId);

      return couponData;
    } catch (error) {
      console.log(error);
    }
  }
}
