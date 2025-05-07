import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService:ConfigService)=>({
        uri:configService.get<string>('MONGO_URI')
      })
    }),
    ProductsModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [UsersService],
})
export class AppModule {}
