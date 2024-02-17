import { Controller, Get, Param } from "@nestjs/common";
import { CouponService } from "./coupon.service";

@Controller('coupon')
export class CouponController {
    constructor(
        private couponService: CouponService
    ) { }

    @Get('show/:coupon')
    async getCoupon(
        @Param('coupon') coupon: string
    ) {
        return await this.couponService.getCoupon(coupon)
    }
}