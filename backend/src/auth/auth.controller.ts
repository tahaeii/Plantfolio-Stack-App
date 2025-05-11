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
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Authentication') // Tag to categorize this controller in Swagger UI
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseGuards(RecaptchaGuard)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Successfully registered a user.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.',
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  // login
  @UseGuards(LocalAuthGuard, RecaptchaGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login and get a JWT token' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in. Token is returned.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid credentials.',
  })
  async login(@Body() loginDto: LoginDto, @Req() req) {
    return {
      token: await this.authService.login(loginDto),
      user: { role: req.user.role },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify-token')
  @ApiOperation({ summary: 'Verify if the token is valid and not expired' })
  @ApiResponse({
    status: 200,
    description: 'Token is valid and not expired.',
    schema: {
      example: {
        valid: true,
        expired: false,
        user: { role: 'user' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid or expired token.',
  })
  @ApiBearerAuth() // Shows that this endpoint requires a Bearer token
  verifyToken(@Req() req) {
    return {
      valid: true,
      expired: false,
      user: { role: req.user.role },
    };
  }
}
