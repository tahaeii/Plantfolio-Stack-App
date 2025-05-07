import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/Product.schema';
import { CreateProductDto } from './dto/Product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel:Model<Product>){
    }
    createProduct(createProductDto:CreateProductDto){
        const newProduct=new this.productModel(createProductDto)
        return newProduct.save()
    }
}
