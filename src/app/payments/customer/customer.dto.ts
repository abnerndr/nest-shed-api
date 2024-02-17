import { ApiProperty } from "@nestjs/swagger";
import Stripe from "stripe";


type AddressProps = {
    city: string | null;
    country: string | null;
    line1: string | null;
    line2: string | null;
    postal_code: string | null;
    state: string | null;
}

type Shipping = {
    address: AddressProps;
    name: string;
    phone: string;
}


export class CreateCustomertDto {
    @ApiProperty()
    payment_method: Stripe.PaymentMethodCreateParams.Type;

    @ApiProperty()
    card: Stripe.PaymentMethodCreateParams.Card1

    @ApiProperty()
    address: AddressProps

    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    phone: string;

    @ApiProperty({ type: 'jsonb', default: {} as Shipping })
    shipping: Shipping

    @ApiProperty()
    coupon?: string
}

export class CreatePaymentMethodDto {
    @ApiProperty()
    payment_method: Stripe.PaymentMethodCreateParams.Type;

    @ApiProperty()
    card: Stripe.PaymentMethodCreateParams.Card1
}