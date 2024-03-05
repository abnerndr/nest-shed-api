import { StripeAddressProps } from 'src/@types/address';
import { CurrencyTypePlanProps, PlanProps } from 'src/@types/plan';

export class CreatePaymentMethodDto {
    type: 'card';
    card: {
        number: string;
        exp_month: number;
        exp_year: number;
        cvc: string;
    }
}

export class CreatePaymentIntentDto {
    user_id: string;
    payment_id: string;
    plan?: PlanProps;
    currency?: CurrencyTypePlanProps;
    automatic_payment: boolean;
    receipt_email: string;
    shipping: {
        address: StripeAddressProps;
        name: string;
    }
}