import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from 'src/module/auth/auth.service';
import { IsPublic } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  async login(@Body() body: LoginDto) {
    const token = await this.authService.login(body.email);
    return { token };
  }
}
