import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtEntity } from './jwt.entity';
import { Repository } from 'typeorm';
import { CreateJwtDto, ShowJwtDto } from './jwt.dto';


@Injectable()
export class JwtAuthService {
    constructor(@InjectRepository(JwtEntity) private jwtService: Repository<JwtEntity>) { }

    async store({ token, user_id }: CreateJwtDto): Promise<ShowJwtDto> {
        const create = this.jwtService.create({
            token,
            user_id
        })
        return await this.jwtService.save(create)
    }

    async showByToken(token: string): Promise<ShowJwtDto> {
        const jwt = await this.jwtService.findOne({ where: { token } })
        return jwt
    }

    async showByUser(userId: string): Promise<ShowJwtDto> {
        const jwt = await this.jwtService.findOne({
            where: { user_id: userId },
        });
        return jwt;
    }

}