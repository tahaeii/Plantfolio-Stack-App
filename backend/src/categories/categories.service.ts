import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schemas/Category.schema';
import { CreateCategoryDto } from './dto/Category.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category.name) private categoryModel:Model<Category>){}
    createCategory(createCategoryDto:CreateCategoryDto){
        const newCategory=new this.categoryModel(createCategoryDto)
        return newCategory.save()
    }
}
