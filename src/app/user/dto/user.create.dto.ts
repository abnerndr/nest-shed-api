import { ApiProperty } from '@nestjs/swagger';
import { AddressProps } from 'src/@types/address';
import { CompanyEntity } from 'src/app/company/company.entity';
import { UserPermissionsProps, UserRolesProps } from './user';
import { CreatePaymentMethodDto } from 'src/app/payments/payment-method/dto/payment-method.create.dto';

export class CreateUserDataDto {
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
    permissions: UserPermissionsProps;

    @ApiProperty()
    role: UserRolesProps[];

    @ApiProperty()
    payment: CreatePaymentMethodDto;
}

export class CreateUserDto {
    @ApiProperty({ default: CreateUserDataDto })
    data: CreateUserDataDto;

    @ApiProperty({ default: '' })
    company_id: string;
}