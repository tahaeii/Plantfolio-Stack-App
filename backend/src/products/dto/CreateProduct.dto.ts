import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
  IsMongoId,
  IsArray,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Size } from 'src/schemas/Product.schema';


export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Product title is required!' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Product image is required!' })
  image: string;

  @IsArray()
  @IsMongoId({ each: true })
  categories: string[];

  @IsString()
  @IsNotEmpty({ message: 'Description is required!' })
  description: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty({ message: 'Price is required!' })
  price: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  discount?: number;

  @IsArray()
  @IsMongoId({ each: true })
  tags: string[];

  @IsEnum(Size, { message: 'Invalid size value' })
  size: Size;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsNotEmpty({ message: 'SKU is required!' })
  sku: string;
}
