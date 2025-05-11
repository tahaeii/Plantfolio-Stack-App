import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RecaptchaGuard } from './guard/recaptcha.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Post('register')
  @UseGuards(RecaptchaGuard)
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  // login
  @UseGuards(LocalAuthGuard,RecaptchaGuard)
  @Post()
  async login(@Body() loginDto: LoginDto, @Req() req) {
    return {
      token: await this.authService.login(loginDto),
      user: { role: req.user.role },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify-token')
  verifyToekn(@Req() req) {
    return {
      valid: true,
      expired: false,
      user: { role: req.user.role },
    };
  }
}
