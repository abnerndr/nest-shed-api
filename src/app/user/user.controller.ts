import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBody({ type: CreateUserDto })
  @Post('create/:company_id')
  async createUser(
    @Body() data: CreateUserDto['data'],
    @Param('company_id') companyId: CreateUserDto['company_id']
  ) {
    return await this.userService.store({ data, company_id: companyId });
  }

  @Get('show/:user_id')
  async showUser(@Param('user_id') userId: string) {
    return await this.userService.showRelation('id', userId);
  }
}
