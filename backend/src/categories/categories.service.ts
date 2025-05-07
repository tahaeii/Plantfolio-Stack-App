import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schemas/Category.schema';
import { CreateCategoryDto } from './dto/CreateCategory.dto';
import { UpdateCategoryDto } from './dto/UpdateCategory.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category.name) private categoryModel:Model<Category>){}
    createCategory(createCategoryDto:CreateCategoryDto){
        const newCategory=new this.categoryModel(createCategoryDto)
        return newCategory.save()
    }

    getCategories(){
        return this.categoryModel.find()
    }

    getCatById(id:string){
        return this.categoryModel.findById(id)
    }

    updateCat(id:string,updateCatDto:UpdateCategoryDto){
        return this.categoryModel.findByIdAndUpdate(id,updateCatDto,{new:true})
    }

    deleteCat(id:string){
        return this.categoryModel.findByIdAndDelete(id)
    }
}
