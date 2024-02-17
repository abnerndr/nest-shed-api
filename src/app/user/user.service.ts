import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, ResponseUserDto } from './user.dto';
import { createPass } from 'src/utils/helper/user/hash';
import { CompanyService } from '../company/company.service';
import { CustomerService } from '../payments/customer/customer.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userService: Repository<UserEntity>,
    private companyService: CompanyService,
    private customerService: CustomerService
  ) { }

  async store({ data, company_id }: CreateUserDto): Promise<ResponseUserDto> {
    const verifyUser = await this.userService.findOne({ where: { document_number: data.document_number } });
    const company = await this.companyService.showRelation('id', company_id)


    if (verifyUser) {
      throw new HttpException(
        'usuário já existente em nossa base, se ocorreu algum problema tente resetar a senha ou contate o suporte',
        HttpStatus.BAD_REQUEST
      );
    }

    const customerShipping = {
      address: data.address,
      phone: data.email,
      name: data.full_name,
    }

    const customer = await this.customerService.store({
      card: data.payment.card,
      payment_method: data.payment.payment_method,
      address: data.address,
      email: data.email,
      name: data.full_name,
      phone: data.phone,
      shipping: customerShipping,
    })

    const role = company.users.length <= 0 ? 'admin' : 'user'
    const passKey = await createPass(data.document_number);
    data.customer_id = customer.id
    data.role = role
    data.password = passKey;
    data.is_active = true;
    data.company = company

    const user = await this.userService.save(data);

    delete user.password;

    return user;
  }

  async showRelation(dynamicField: string, dynamicValue: string): Promise<UserEntity> {
    let condition: any = {};
    condition[dynamicField] = dynamicValue;
    return this.userService.findOne({ where: condition, relations: { company: true } });
  }

  async show(dynamicField: string, dynamicValue: string): Promise<UserEntity> {
    let condition: any = {};
    condition[dynamicField] = dynamicValue;
    return this.userService.findOne({ where: condition });
  }

  async update(id: string, user: UserEntity): Promise<UserEntity> {
    await this.userService.update(id, user)
    return await this.userService.findOne({ where: { id } })
  }
}
