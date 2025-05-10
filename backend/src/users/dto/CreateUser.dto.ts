import {  IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import { UserRole } from "src/schemas/User.schema";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    username:string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    // @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    password:string;

    @IsString()
    @IsOptional()
    googleId?:string

    @IsString()
    @IsOptional()
    facebookId?:string;

    @IsEnum(UserRole)
    role?:UserRole=UserRole.USER;
}