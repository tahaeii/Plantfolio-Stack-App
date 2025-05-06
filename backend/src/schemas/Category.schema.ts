import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Category {
  @Prop({
    required: true,
    unique:[true,'Category title already exists!']
  })
  title: string;

  @Prop({
    required: false,
  })
  image?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
