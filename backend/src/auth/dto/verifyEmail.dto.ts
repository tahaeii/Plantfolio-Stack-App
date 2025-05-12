import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class VerifyEmailDto{
    @IsMongoId()
    @IsNotEmpty()
    userId:string

    @IsString()
    @IsNotEmpty()
    code:string
}