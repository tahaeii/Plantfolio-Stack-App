import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

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
    // match: [
    //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    //   'Invalid Password!',
    // ],
  })
  password: string;

  @Prop()
  googleId?: string;

  @Prop()
  facebookId?: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ default: false })
  isVerified: boolean; // For email

  @Prop()
  emailVerificationCode?: string;

  @Prop()
  codeExpiresAt: Date; // For email
}

export const UserSchema = SchemaFactory.createForClass(User);
