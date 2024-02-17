import { SubscriptionEntity } from "./subscription.entity";

export class CreateSubscriptionDto {
    user_id: string;
    plan: 'basic' | 'pro';
    coupon: string;
}

export class ResponseSubscriptionDto extends SubscriptionEntity {

}
