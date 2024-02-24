import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const production: TypeOrmModuleOptions = {
      type: 'postgres',
      url: this.configService.get<string>('DB_URL'),
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
      logging: false,
      ssl: {
        rejectUnauthorized: false
      }
    };
    const development: TypeOrmModuleOptions = {
      type: 'postgres',
      url: this.configService.get<string>('DB_URL'),
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
      logging: false
    };
    return this.configService.get<string>('NODE_ENV') === 'production'
      ? production
      : development;
  }
}
