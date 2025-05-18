import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersService } from './users/users.service';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LogModule } from './logging/log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService:ConfigService)=>({
        uri:configService.get<string>('MONGO_URI')
      })
    }),
    ProductsModule,
    CategoriesModule,
    TagsModule,
    AuthModule,
    UsersModule,
    LogModule  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
