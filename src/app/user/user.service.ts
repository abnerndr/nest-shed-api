import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, ResponseUserDto } from './user.dto';
import { createPass } from 'src/utils/helper/user/hash';
import { CompanyService } from '../company/company.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userService: Repository<UserEntity>,
    private companyService: CompanyService
  ) { }

  async store({ data, company_id }: CreateUserDto): Promise<ResponseUserDto> {
    const verifyUser = await this.userService.findOne({ where: { document_number: data.document_number } });
    const company = await this.companyService.show('id', company_id)


    if (verifyUser) {
      throw new HttpException(
        'usuário já existente em nossa base, se ocorreu algum problema tente resetar a senha ou contate o suporte',
        HttpStatus.BAD_REQUEST
      );
    }

    const passKey = await createPass(data.document_number);
    data.password = passKey;
    data.is_active = true;
    data.company = company

    const user = await this.userService.save(data);

    delete user.password;

    return user;
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
