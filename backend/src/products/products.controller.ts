import { QueryString } from 'utils/apiFeatures';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { ProductsService } from './products.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const newProduct =
        await this.productsService.createProduct(createProductDto);
      return {
        success: true,
        data: { newProduct },
        message: 'Prodcut successfully created!',
      };
    } catch (error) {
      throw new HttpException(error?.message, 400);
    }
  }

  @Get()
  async getProducts(@Query() query: QueryString) {
    const { products = [], count = 0 } =
      await this.productsService.getProducts(query);
    if (count == 0 || products.length == 0)
      throw new HttpException('No product found!', 404);
    return {
      success: true,
      data: { products },
    };
  }
}
