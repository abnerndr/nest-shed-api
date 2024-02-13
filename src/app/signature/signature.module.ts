import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignatureEntity } from './signature.entity';
import { SignatureService } from './signature.service';

@Module({
  imports: [TypeOrmModule.forFeature([SignatureEntity])],
  providers: [SignatureService]
})
export class SignatureModule {}
