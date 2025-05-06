import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "src/schemas/Category.schema";

@Module({
    imports:[MongooseModule.forFeature([{
        name:Category.name,
        schema:CategorySchema
    }])]
})

export class CategoriesModule{}