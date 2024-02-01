import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  full_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  photo_url: string;

  @ApiProperty()
  address_complete: string;

  @ApiProperty()
  zip_code: string;

  @ApiProperty()
  bussiness_name: string;

  @ApiProperty()
  bussiness_picture_url: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  payment_is_valid: boolean;

  @ApiProperty()
  last_payment_date: string;
}

export class ResponseUserDto extends UserEntity { }
