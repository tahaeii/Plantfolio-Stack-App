import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Product {
  @Prop({
    required: [true, 'Product title is required!'],
  })
  title: string;

  @Prop({
    type: [Types.ObjectId],
    ref: 'Category',
  })
  categories: Types.ObjectId[];

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
  })
  rating: number;

  @Prop({
    required: [true, 'Review is required!'],
    default: 0,
  })
  review: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
