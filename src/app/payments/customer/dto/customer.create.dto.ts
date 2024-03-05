import { StripeAddressProps } from "src/@types/address";
import { CustomerShippingProps } from "./customer";
import { ApiProperty } from "@nestjs/swagger";
import { StripePaymentCardProps, StripePaymentMethodParamsProps } from "src/@types/stripe-payment";

export class CreateCustomertDto {
    @ApiProperty()
    payment_method: StripePaymentMethodParamsProps;

    @ApiProperty()
    card: StripePaymentCardProps;

    @ApiProperty()
    address: StripeAddressProps;

    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    phone: string;

    @ApiProperty({ type: 'jsonb', default: {} as CustomerShippingProps })
    shipping: CustomerShippingProps;

    @ApiProperty()
    coupon?: string;
}
