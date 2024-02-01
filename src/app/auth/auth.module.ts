import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWT_SECRET_KEY } from 'src/utils/constants/jwt-secret';
import { UserEntity } from '../user/user.entity';
import { JwtEntity } from './jwt/jwt.entity';
import { JwtAuthService } from './jwt/jwt.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { SendMailService } from '../sendgrid/sendgrid.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, JwtEntity, UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '12h' }
    })
  ],
  providers: [AuthService, JwtAuthService, UserService, SendMailService],
  controllers: [AuthController]
})
export class AuthModule { }
