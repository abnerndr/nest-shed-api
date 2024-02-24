import { Body, Controller, Post } from "@nestjs/common";
import { PaymentMethodService } from "./payment-method.service";
import { CreatePaymentIntentDto, CreatePaymentMethodDto } from "./payment-method.dto";

@Controller('payment')
export class PaymentMethodController {
    constructor(
        private paymentMethodService: PaymentMethodService
    ) { }

    @Post('create/method')
    async createPayment(
        @Body() payload: CreatePaymentMethodDto
    ) {
        return await this.paymentMethodService.createPaymentMethod(payload)
    }

    @Post('create/intent')
    async createInent(
        @Body() payload: CreatePaymentIntentDto
    ) {
        return await this.paymentMethodService.createPaymentIntent(payload)
    }
}