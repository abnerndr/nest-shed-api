import Stripe from 'stripe'

type Address = Stripe.Address

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
    plan?: 'basic' | 'pro';
    currency?: 'brl';
    automatic_payment: boolean;
    receipt_email: string;
    shipping: {
        address: Address;
        name: string;
    }
}