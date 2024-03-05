import { ApiProperty } from "@nestjs/swagger";

export class CreateCompanyDto {
    @ApiProperty({ type: 'text', default: 'company name' })
    name: string;

    @ApiProperty({ type: 'text', default: '11100033399' })
    document_number: string;

    @ApiProperty({ type: 'text', default: '0090000000' })
    phone: string;

    @ApiProperty({ type: 'text', default: 'email@example.com' })
    email: string;

    @ApiProperty({ type: 'text', default: 'street, n° number, nightborhood, city - state' })
    address: string;

    @ApiProperty({ type: 'text', default: '11000333' })
    zip_code: string;

    @ApiProperty({ type: 'text', default: 'http://domain.com/profile/photo/123123514.png' })
    photo_url: string;

    @ApiProperty({ type: 'boolean', default: true })
    is_active: boolean;

    @ApiProperty({ type: 'boolean', default: true })
    payment_is_valid: boolean;

    @ApiProperty({ type: 'text', default: 'yyyy-mm-dd' })
    last_payment_date: string;
}