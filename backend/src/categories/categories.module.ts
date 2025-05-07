import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "src/schemas/Category.schema";
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
    imports:[MongooseModule.forFeature([{
        name:Category.name,
        schema:CategorySchema
    }])],
    providers: [CategoriesService],
    controllers: [CategoriesController]
})

export class CategoriesModule{}