import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('send/token')
  async sendToken(
    @Body() payload: { email: string }
  ) {
    return await this.authService.authenticate(payload.email);
  }

  @Post('user/login')
  async login(
    @Body() payload: CreateLoginDto
  ) {
    return await this.authService.login(payload)
  }
}
