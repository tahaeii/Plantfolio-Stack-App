import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "src/schemas/Product.schema";
import { ProductsService } from './products.service';

@Module({
    imports: [MongooseModule.forFeature([{
        name:Product.name,
        schema:ProductSchema
    }])],
    providers: [ProductsService]
})

export class ProductsModule{}