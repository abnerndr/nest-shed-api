export class CreateUserDto {
    full_name: string;
    email: string;
    cpf: string;
    cnpj: string;
    phone: string;
    photo_url: string;
    address_complete: string;
    zip_code: string;
    bussiness_name: string;
    bussiness_picture_url: string;
    is_active: boolean;
    payment_is_valid: boolean;
    last_payment_date: string;
}
