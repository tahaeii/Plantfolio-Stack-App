import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from 'src/schemas/User.schema';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @IsOptional()
  @IsString()
  emailVerificationCode?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  codeExpiresAt?: Date | null;
}
