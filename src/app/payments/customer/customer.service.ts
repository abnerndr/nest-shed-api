import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { CreateCustomertDto } from './dto/customer.create.dto';
import { NewException } from 'src/utils/functions/new-exception';

@Injectable()
export class CustomerService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) { }

  async createPaymentMethod(data: CreateCustomertDto) {
    try {
      let paymentMethod: Stripe.Response<Stripe.PaymentMethod>;
      if (data.payment_method === 'card') {
        paymentMethod = await this.stripeClient.paymentMethods.create({
          type: 'card',
          card: {
            exp_month: data.card.exp_month,
            exp_year: data.card.exp_year,
            number: data.card.number,
            cvc: data.card.cvc
          },
          billing_details: {
            address: data.address,
            email: data.email,
            name: data.name,
            phone: data.phone
          }
        });
      } else {
        paymentMethod = await this.stripeClient.paymentMethods.create({
          type: 'pix',
          billing_details: {
            address: data.address,
            email: data.email,
            name: data.name,
            phone: data.phone
          }
        });
      }

      return paymentMethod;
    } catch (error) {
      console.log(error);
      NewException({ error, exceptionDescription: 'erro ao criar metodo de pagamento', exceptionStatus: HttpStatus.INTERNAL_SERVER_ERROR })
    }
  }

  async store(data: CreateCustomertDto) {
    try {
      const customer = await this.stripeClient.customers.create({
        address: data.address,
        email: data.email,
        name: data.name,
        phone: data.phone,
        shipping: data.shipping
      });

      return customer;
    } catch (error) {
      NewException({ error, exceptionDescription: 'erro ao criar customer', exceptionStatus: HttpStatus.INTERNAL_SERVER_ERROR })
    }
  }
}
