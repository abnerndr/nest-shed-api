import Stripe from 'stripe';

type GetCouponIdProps = {
  coupons: Stripe.Response<Stripe.ApiList<Stripe.Coupon>>;
  code: string;
};

export const getCouponId = async ({ coupons, code }: GetCouponIdProps) => {
  let couponId: string;
  let coupon = coupons.data.filter((item) => item.name === code);
  coupon.map((item) => {
    couponId = item.id;
  });
  return couponId;
};
