import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "src/schemas/Product.schema";
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AdminStrategy } from "src/auth/strategy/admin.strategy";

@Module({
    imports: [MongooseModule.forFeature([{
        name:Product.name,
        schema:ProductSchema
    }])],
    providers: [ProductsService,AdminStrategy],
    controllers: [ProductsController]
})

export class ProductsModule{}