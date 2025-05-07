import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Types } from "mongoose";

export class CreateProductDto{
    @IsString()
    @IsNotEmpty({message:'Product title is required!'})
    title:string

    @IsArray()
    @IsMongoId({each:true,message:'Each category ID should be a valid mongoDB objectId!'})
    categories:Types.ObjectId[]

    @IsString()
    @IsNotEmpty({message:'Product description is required!'})
    description:string

    @IsNumber()
    @Min(0,{message:'Price must be a positive number!'})
    price:number;

    @IsNumber()
    @Min(0,{message:'Rating should be a positive number!'})
    rating:number=0

    @IsNumber()
    @Min(0,{message:'Review should be a positive number!'})
    review:number=0
}