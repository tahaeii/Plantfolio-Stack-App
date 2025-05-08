import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from 'src/schemas/Tag.schema';
import { CreateTagDto } from './dto/CreateTag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}
  async createTag(createTagDto: CreateTagDto) {
    const newTag = new this.tagModel(createTagDto);
    return await newTag.save();
  }
}
