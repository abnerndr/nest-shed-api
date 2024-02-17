import { CompanyEntity } from '../company/company.entity';
import { AddressProps, Permission, Role } from './user.interface';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import Stripe from 'stripe';


export class CreatePaymentDto {
  payment_method: Stripe.PaymentMethodCreateParams.Type;
  card: Stripe.PaymentMethodCreateParams.Card1;
}

export class CreatePropsDto {
  @ApiProperty()
  full_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  document_number: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  photo_url: string;

  @ApiProperty()
  customer_id: string;

  @ApiProperty()
  payment_method_id: string;

  @ApiProperty()
  address: AddressProps;

  @ApiProperty()
  postal_code: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  company: CompanyEntity;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  permissions?: Permission[]

  @ApiProperty()
  payment: CreatePaymentDto
}

export class CreateUserDto {
  data: CreatePropsDto;

  @ApiProperty()
  company_id: string;
}


export class ResponseUserDto extends UserEntity { }
