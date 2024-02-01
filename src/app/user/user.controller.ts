import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @ApiBody({ type: CreateUserDto })
  @Post('create')
  async createUser(@Body() payload: CreateUserDto) {
    return await this.userService.store(payload);
  }
}
