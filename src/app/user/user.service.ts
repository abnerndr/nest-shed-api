import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, ResponseUserDto } from './user.dto';
import { format } from 'date-fns';
import { createPass } from 'src/utils/helper/user/hash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userService: Repository<UserEntity>
  ) { }

  async store(data: CreateUserDto): Promise<ResponseUserDto> {
    const verifyUser = await this.userService.findOne({ where: { cpf: data.cpf } });

    if (verifyUser) {
      throw new HttpException(
        'usuário já existente em nossa base, se ocorreu algum problema tente resetar a senha ou contate o suporte',
        HttpStatus.BAD_REQUEST
      );
    }

    const passKey = await createPass(data.cpf ?? data.cnpj);
    const nowDate = format(new Date(), 'yyyy-MM-dd');
    data.password = passKey;
    data.payment_is_valid = true;
    data.last_payment_date = nowDate;
    data.is_active = true;

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
