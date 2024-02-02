import { CompanyEntity } from '../company/company.entity';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

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
  address: string;

  @ApiProperty()
  zip_code: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  company: CompanyEntity;
}

export class CreateUserDto {
  data: CreatePropsDto;

  @ApiProperty()
  company_id: string;
}

export class ResponseUserDto extends UserEntity { }
