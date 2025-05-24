import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'; // Import Swagger decorators
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { VerifyEmailDto } from './dto/verifyEmail.dto';
import { RegisterDto } from './dto/register.dto';
import { GetUser } from 'src/users/decorators/getUser.decorator';
import { UserRole } from 'src/schemas/User.schema';

@ApiTags('Authentication') // Swagger tag to group authentication-related endpoints
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
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
      captcha: svg,
      captchaId: id,
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('')
  async login(
    @Body() loginDto: LoginDto,
    @Request() req
    // @GetUser('sub') id: string,
    // @GetUser('role') role: UserRole,
  ) {
    const token= this.authService.login(loginDto)
    const {id,role}=req.user
    return {
      token ,
      user: { role, id },
    };
  }

  @Get('verify-token')
  @UseGuards(JwtAuthGuard)
  verifyToken(@GetUser('role') role: UserRole) {
    try {
      return {
        valid: true,
        expired: false,
        user: { role },
      };
    } catch (error) {
      throw new UnauthorizedException('Token verification failed!');
    }
  }
}
