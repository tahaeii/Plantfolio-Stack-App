import { IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto{
    @IsOptional()
    @IsString()
    title?:string;

    @IsOptional()
    @IsString()
    image?:string;
}