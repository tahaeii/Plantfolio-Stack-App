import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger'; // Import Swagger decorators
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RecaptchaGuard } from './guard/recaptcha.guard';
import { ConflictException } from '@nestjs/common'; // For duplicate user error handling
import { VerifyEmailDto } from './dto/verifyEmail.dto';
import { Response } from 'express';

@ApiTags('Authentication') // Swagger tag to group authentication-related endpoints
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('User already exists with this email!');
      }
      throw error; // Rethrow other unexpected errors
    }
  }

  @Post('verify-email')
  async verifyEmail(@Body() emailDto: VerifyEmailDto) {
    const { userId, code } = emailDto;
    return this.authService.verifyEmail(userId, code);
  }

  @Get('captcha')
  getCaptcha() {
    const { svg, id } = this.authService.generateCaptcha();
    return {
      image:svg,
      captchaId:id
    }
  }

  @Post('')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto, @Req() req) {
    const { role, _id } = req.user;
    return {
      token: await this.authService.login(loginDto),
      user: { role, id: _id },
    };
  }

  @Get('verify-token')
  @UseGuards(JwtAuthGuard)
  verifyToken(@Req() req) {
    try {
      return {
        valid: true,
        expired: false,
        user: { role: req.user.role },
      };
    } catch (error) {
      throw new UnauthorizedException('Token verification failed!');
    }
  }
}
