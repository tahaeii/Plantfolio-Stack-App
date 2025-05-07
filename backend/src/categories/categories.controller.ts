import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/CreateCategory.dto';
import { isValidId } from 'utils/IdValidator';
import { UpdateCategoryDto } from './dto/UpdateCategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  async getCategories() {
    return await this.categoriesService.getCategories();
  }

  @Get(':id')
  async getCatById(@Param('id') id: string) {
    isValidId('Category', id);
    const category = await this.categoriesService.getCatById(id);
    if (!category) throw new HttpException('Category not found!', 404);
    return category;
  }

  @Patch(':id')
  async updateCat(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCategoryDto,
  ) {
    isValidId('Category', id);
    try {
      const updatedCat = await this.categoriesService.updateCat(
        id,
        updateCatDto,
      );
      return updatedCat;
    } catch (error) {
      throw new HttpException(error?.message, 404);
    }
  }

  @Delete(':id')
  async deleteCat(@Param('id') id: string) {
    isValidId('Category', id);
    const deletedCat = await this.categoriesService.deleteCat(id);
    if (!deletedCat) throw new HttpException('Category not found!', 404);
    return 'Category successfully deleted!';
  }
}
