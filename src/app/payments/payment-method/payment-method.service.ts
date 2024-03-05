import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectStripe } from "nestjs-stripe";
import Stripe from "stripe";
import { UserService } from "src/app/user/user.service";
import { CreatePaymentIntentDto, CreatePaymentMethodDto } from "./dto/payment-method.create.dto";
import { NewException } from "src/utils/functions/new-exception";

@Injectable()
export class PaymentMethodService {
    constructor(
        @InjectStripe() private readonly stripeClient: Stripe,
        private userService: UserService
    ) { }

    async createPaymentMethod({ type, card }: CreatePaymentMethodDto) {
        try {
            const paymentMethod = await this.stripeClient.paymentMethods.create({
                type,
                card
            })
            return paymentMethod
        } catch (error) {
            NewException({ error, exceptionDescription: 'erro ao tentar criar metodo de pagamento', exceptionStatus: HttpStatus.INTERNAL_SERVER_ERROR })
        }
    }

    async createPaymentIntent({ plan, user_id, currency, automatic_payment, receipt_email, shipping, payment_id }: CreatePaymentIntentDto) {
        try {
            const user = await this.userService.show('id', user_id)
            const amount = plan === 'basic' ? 1990 : 3990
            payment_id = user.payment_method_id || payment_id
            const paymentMethod = await this.stripeClient.paymentIntents.create({
                amount,
                currency,
                customer: user.customer_id,
                automatic_payment_methods: {
                    enabled: automatic_payment
                },
                receipt_email,
                shipping: {
                    address: shipping.address,
                    name: shipping.name
                },
                payment_method: payment_id
            })
            return paymentMethod
        } catch (error) {
            NewException({ error, exceptionDescription: 'erro ao tentar criar metodo intent de pagamento', exceptionStatus: HttpStatus.INTERNAL_SERVER_ERROR })
        }
    }

}