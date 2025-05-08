import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from 'src/schemas/Tag.schema';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

@Module({
    imports:[MongooseModule.forFeature([{
        name:Tag.name,
        schema:TagSchema
    }])],
    providers: [TagsService],
    controllers: [TagsController]
})
export class TagsModule {}
