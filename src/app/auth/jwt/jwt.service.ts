import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtEntity } from './jwt.entity';
import { Repository } from 'typeorm';
import { CreateJwtDto, ShowJwtDto } from './jwt.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthService {
  constructor(
    @InjectRepository(JwtEntity) private jwtService: Repository<JwtEntity>,
    private configService: ConfigService
  ) {}

  async store({ token, user_id }: CreateJwtDto): Promise<ShowJwtDto> {
    const create = this.jwtService.create({
      token,
      user_id
    });
    return await this.jwtService.save(create);
  }

  async show(dynamicField: string, dynamicValue: string): Promise<ShowJwtDto> {
    let condition: any = {};
    condition[dynamicField] = dynamicValue;
    const jwt = await this.jwtService.findOne({ where: condition });
    return jwt;
  }

  async generateToken() {
    const key = this.configService.get<string>('JWT_SECRET_AUTH');
    const hash = await bcrypt.hash(key, 22);
    return hash;
  }

  async destroy(id: string) {
    const res = await this.jwtService.delete(id);
    if (res) {
      return 'success deleting';
    } else {
      return null;
    }
  }
}
