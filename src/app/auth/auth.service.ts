import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { JwtAuthService } from './jwt/jwt.service';
import { JwtService } from '@nestjs/jwt';
import { createPass } from 'src/utils/helper/user/hash';

import { WEBSITE_URL } from 'src/utils/constants/web-url';

import { SendMailService } from '../sendgrid/sendgrid.service';

import * as bcrypt from 'bcryptjs';
import { JWT_SECRET_KEY } from 'src/utils/constants/jwt-secret';
import { ShowJwtDto } from './jwt/jwt.dto';
import { CreateJwtVerifyDto, CreateLoginDto, CreateSendTokenDto } from './dto/auth.create.dto';
import { ResponseAuthenticateDto, ResponseSendTokenDto } from './dto/auth.response.dto';
import { ShowLoginDto } from './dto/auth.show.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtAuthService: JwtAuthService,
    private jwtService: JwtService,
    private sendMailService: SendMailService,
    private configService: ConfigService
  ) { }

  async sendTokenByEmail({
    email,
    link,
    name
  }: CreateSendTokenDto): Promise<ResponseSendTokenDto> {
    await this.sendMailService.sendLoginEmail({ email, link, name });
    return {
      status: 200,
      title: 'e-mail enviado com sucesso!',
      message: `email enviado para: ${email}, fique de olha na sua caixa caso não encontre olhe no spam`
    };
  }

  async authenticate(email: string): Promise<ResponseAuthenticateDto> {
    const user = await this.userService.show('email', email);
    if (!user) {
      throw new HttpException(
        'Usuário não encontrado na base de dados, tente realizar um cadastro ou entre em contato com o suporte.',
        HttpStatus.NOT_FOUND
      );
    }
    const code = await createPass(user?.document_number);
    const url = `${WEBSITE_URL}/validate?token=${code}&email=${email}`;
    const firstName = user.full_name.split(' ')[0];
    const hash = await bcrypt.hash(code, 10);
    user.password = hash;
    await this.userService.update(user.id, user);
    await this.sendTokenByEmail({ email: user.email, link: url, name: firstName });

    return {
      status: 201,
      title: 'e-mail enviado com sucesso!',
      message: 'o e-mail de autenticação foi enviado fique atento',
      sended: user.email
    };
  }

  async login({ email, pass_key }: CreateLoginDto): Promise<ShowLoginDto> {
    const user = await this.userService.showRelation('email', email);

    const verifyPassKey = await bcrypt.compare(pass_key, user.password);

    if (!verifyPassKey) {
      throw new HttpException('link inválido ou expirado!', HttpStatus.UNAUTHORIZED);
    }

    const jwtData = {
      userId: user.id,
      username: user.email
    };

    const token = this.jwtService.sign(jwtData, {
      secret: JWT_SECRET_KEY
    });

    const jwt = await this.jwtVerify({ token, user_id: user.id });

    delete user.password;

    return {
      user,
      token: jwt.token
    };
  }

  // verificar jwt
  async jwtVerify({ token, user_id }: CreateJwtVerifyDto): Promise<ShowJwtDto> {
    const jwtData = await this.jwtAuthService.show('user_id', user_id);
    if (jwtData) {
      const deleteMessage = await this.jwtAuthService.destroy(jwtData?.id);
      if (deleteMessage === null) {
        new HttpException('token não pode ser renovado!', HttpStatus.BAD_REQUEST);
      }
    }

    const createToken = {
      token,
      user_id
    };

    const jwtResponse = await this.jwtAuthService.store(createToken);

    if (!jwtResponse) {
      new HttpException(
        'login inválidado, entre em contato com o suporte!',
        HttpStatus.NOT_IMPLEMENTED
      );
    }

    return jwtResponse;
  }
}
