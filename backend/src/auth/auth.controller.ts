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

  @Post('')
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() loginDto: LoginDto,
    @GetUser('sub') id: string,
    @GetUser('role') role: UserRole,
  ) {
    return {
      token: await this.authService.login(loginDto),
      user: { role, id },
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
