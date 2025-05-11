import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/schemas/User.schema';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the user for login.',
    example: 'user@example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user for login.',
    example: 'SecureP@ss123',
  })
  @IsString()
  @IsNotEmpty()
  // @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
  password: string;


  @ApiProperty({
    description: 'The reCAPTCHA token to validate the user',
    example: '03AGdBq24d53cZ3OrjLQO7Avz8STfiGf8LMFLM8',
  })
  @IsString()
  @IsNotEmpty()
  recaptchaToken: string;
}
