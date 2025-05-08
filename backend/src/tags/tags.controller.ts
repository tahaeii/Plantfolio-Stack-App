import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/CreateTag.dto';

@Controller('tags')
export class TagsController {
    constructor(private tagsService:TagsService){}
    @Post()
    async createPost(@Body() createTagDto:CreateTagDto){
      try {
        const newTag= await this.tagsService.createTag(createTagDto)
        return{
            success:true,
            data:{newTag},
            message:'Tag successfully created!'
        }
      } catch (error) {
        throw new HttpException(error?.message,400)
      }
    }
}
