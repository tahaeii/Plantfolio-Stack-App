import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "src/schemas/Category.schema";
import { CategoriesService } from './categories.service';

@Module({
    imports:[MongooseModule.forFeature([{
        name:Category.name,
        schema:CategorySchema
    }])],
    providers: [CategoriesService]
})

export class CategoriesModule{}