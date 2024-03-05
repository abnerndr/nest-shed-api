import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { getCouponId } from 'src/utils/helper/payment/coupon/get-coupon-id';
import Stripe from 'stripe';
import { CreateCouponDto } from './dto/coupon.create.dto';
import { NewException } from 'src/utils/functions/new-exception';

@Injectable()
export class CouponService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) { }

  async getCoupon({ coupon }: CreateCouponDto) {
    try {
      const coupons = await this.stripeClient.coupons.list();
      const couponId = await getCouponId({ code: coupon, coupons });
      const couponData = await this.stripeClient.coupons.retrieve(couponId);

      return couponData;
    } catch (error) {
      NewException({ error, exceptionDescription: 'erro ao criar um novo cupon', exceptionStatus: HttpStatus.INTERNAL_SERVER_ERROR })
    }
  }
}
