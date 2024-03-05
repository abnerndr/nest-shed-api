import { ApiProperty } from "@nestjs/swagger";
import { subscriptionPlanProps } from "./subscription";

export class CreateSubscriptionDto {
    @ApiProperty()
    user_id: string;

    @ApiProperty()
    plan: subscriptionPlanProps;

    @ApiProperty()
    coupon: string;
}