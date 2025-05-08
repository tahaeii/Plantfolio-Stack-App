import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Category } from './Category.schema';
import { Tag } from './Tag.schema';

@Schema({ timestamps: true })
export class Product {
  @Prop({
    required: [true, 'Product title is required!'],
    unique: [true, 'Product title should be unique!'],
  })
  title: string;

  @Prop({ required: [true, 'Product image is required!'], default: [] })
  images: string[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  })
  categories: Category[];

  @Prop({
    required: [true, 'Description is required!'],
  })
  description: string;

  @Prop({
    required: [true, 'Price is required!'],
  })
  price: number;

  @Prop({
    required: [true, 'Rating is required!'],
    default: 0,
    min: 0,
    max: 5,
  })
  rating: number;

  @Prop({
    required: [true, 'Review is required!'],
    default: 0,
  })
  review: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] })
  tags: Tag[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
