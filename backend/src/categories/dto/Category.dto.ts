import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Category title is required!' })
  title: string;

  @IsString()
  @IsOptional()
  image?: string;
}
