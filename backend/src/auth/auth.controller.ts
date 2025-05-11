import {
  Body,
  Controller,
  Get,
  Post,
  Req,
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

@ApiTags('Authentication') // Swagger tag to group authentication-related endpoints
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseGuards(RecaptchaGuard)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered and token generated',
  })
  @ApiResponse({ status: 400, description: 'Bad request or recaptcha error' })
  @ApiResponse({ status: 409, description: 'Conflict: User already exists' }) // Add conflict response for duplicate user
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

  @Post('login')
  @UseGuards(LocalAuthGuard, RecaptchaGuard)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful and JWT token returned',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid login request format or recaptcha error',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Invalid credentials or recaptcha error',
  }) // Added 401 for invalid credentials
  async login(@Body() loginDto: LoginDto, @Req() req) {
    return {
      token: await this.authService.login(loginDto),
      user: { role: req.user.role },
    };
  }

  @Get('verify-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Verify if the JWT token is valid' })
  @ApiResponse({ status: 200, description: 'Token is valid', type: Object })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Invalid or expired token',
  }) // Added 401 for invalid token
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
