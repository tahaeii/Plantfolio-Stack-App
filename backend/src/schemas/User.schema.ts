import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: [true, 'Username is required!'] })
  username: string;

  @Prop({
    required: [true, 'Email address is required!'],
    unique: [true, 'Email address is already taken!'],
  })
  email: string;

  @Prop({
    required: [true, 'Password is required!'],
    match: [
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      'Invalid Password!',
    ], // Move to dto register
  })
  password: string;

  @Prop()
  googleId?: string;

  @Prop()
  facebookId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
