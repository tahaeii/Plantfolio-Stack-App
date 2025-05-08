import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Tag {
  @Prop({
    required: [true, 'Tag title is required!'],
    unique: [true, 'Tag name should be unique!'],
  })
  name: string;

  @Prop({
    required: [true, 'Tag title is required!'],
  })
  link: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
