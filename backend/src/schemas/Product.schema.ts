import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Category } from './Category.schema';
import { Tag } from './Tag.schema';

export enum Size {
  MEDIUM = 'medium',
  TALL = 'tall',
  STANDARD = 'standard',
  SEMI = 'semi',
  MINI = 'mini',
}

@Schema({ timestamps: true })
export class Product {
  @Prop({
    required: [true, 'Product title is required!'],
    unique: [true, 'Product title should be unique!'],
  })
  title: string;

  @Prop({ required: [true, 'Product image is required!'] })
  image: string;

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

  @Prop({ default: 0 })
  discount: number; // In percent

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

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  })
  tags: Tag[];

  @Prop({
    required: [true, 'Size is required!'],
    enum: Size,
    // default: Size.MEDIUM,
  })
  size: Size;

  @Prop({ required: [true, 'Quantity is required!'], default: 1 })
  quantity: number;

  @Prop({ required: [true, 'SKU is required!'] })
  sku: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
