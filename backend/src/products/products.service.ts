import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/Product.schema';
import { CreateProductDto } from './dto/CreateProduct.dto';
import ApiFeatures, { QueryString } from 'utils/apiFeatures';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto);
    return await newProduct.save();
  }

  async getProducts(queryString: QueryString) {
    const features = new ApiFeatures(this.productModel, queryString)
      .filters()
      .sort()
      .limitFields()
      .populate()
      .paginate()
      .secondPopulate('categories');
    const products = await features.model;
    console.log(queryString)
    const {page,sort,limit,fields,populate,...filters}=queryString
    console.log(filters)
    const count = await this.productModel.countDocuments(filters);
    return { products, count };
  }
}
