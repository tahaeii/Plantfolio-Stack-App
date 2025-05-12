import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from 'src/schemas/User.schema';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user.',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The email of the user.',
    example: 'johndoe@example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password for the user account.',
    example: 'SecureP@ss123',
  })
  @IsString()
  @IsNotEmpty()
  // @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
  password: string;

  @ApiProperty({
    description:
      'Google ID of the user if they signed up using Google authentication.',
    example: 'google_12345',
    required: false,
  })
  @IsString()
  @IsOptional()
  googleId?: string;

  @ApiProperty({
    description:
      'Facebook ID of the user if they signed up using Facebook authentication.',
    example: 'facebook_12345',
    required: false,
  })
  @IsString()
  @IsOptional()
  facebookId?: string;

  @ApiProperty({
    description: 'The role assigned to the user.',
    enum: UserRole,
    default: UserRole.USER,
    example: UserRole.USER,
    required: false,
  })
  
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({
    description: 'The reCAPTCHA token to validate the user',
    example: '03AGdBq24d53cZ3OrjLQO7Avz8STfiGf8LMFLM8',
  })
  @IsString()
  @IsNotEmpty()
  recaptchaToken: string;
}
