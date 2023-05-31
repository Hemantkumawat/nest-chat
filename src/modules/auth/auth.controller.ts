import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.schema';
import { UserDto } from '../user/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: LoginDto): Promise<{ accessToken: string,user:User }> {
    return this.authService.login(loginData);
  }

  @Post('register')
  async register(@Body() registerData: UserDto): Promise<{ accessToken: string,user:User }> {
    return this.authService.register(registerData);
  }
}
