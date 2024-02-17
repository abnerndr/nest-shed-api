import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCustomertDto, CreatePaymentMethodDto } from "./customer.dto";
import { InjectStripe } from "nestjs-stripe";
import Stripe from "stripe";

@Injectable()
export class CustomerService {
    constructor(@InjectStripe() private readonly stripeClient: Stripe) { }

    async createPaymentMethod(data: CreatePaymentMethodDto) {
        try {
            let paymentMethod: Stripe.Response<Stripe.PaymentMethod>
            if (data.payment_method === 'card') {
                paymentMethod = await this.stripeClient.paymentMethods.create(
                    {

                        type: data.payment_method,
                        card: {
                            exp_month: data.card.exp_month,
                            exp_year: data.card.exp_year,
                            number: data.card.number,
                            cvc: data.card.cvc,
                        },

                    })
            } else {
                paymentMethod = await this.stripeClient.paymentMethods.create({ type: 'pix' })
            }

            return paymentMethod
        } catch (error) {
            console.log(error)
            throw new HttpException('erro ao criar metodo de pagamento', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async store(data: CreateCustomertDto) {
        try {
            const paymentMethod = await this.createPaymentMethod({ card: data.card, payment_method: data.payment_method })

            const customer = await this.stripeClient.customers.create({
                address: data.address,
                email: data.email,
                name: data.name,
                phone: data.phone,
                payment_method: paymentMethod.id,
                shipping: data.shipping
            })
            return customer
        } catch (error) {
            console.log(error)
            throw new HttpException('erro ao criar customer', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
