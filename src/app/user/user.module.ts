import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CompanyEntity } from '../company/company.entity';
import { CompanyService } from '../company/company.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CompanyEntity])],
  providers: [UserService, CompanyService],
  controllers: [UserController]
})
export class UserModule { }
