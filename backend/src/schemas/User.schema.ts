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
  })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  // Verufy by emial
  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ type: String, required: false, default: null })
  emailVerificationCode?: string | null;

  @Prop({ type: Date, required: false, default: null })
  codeExpiresAt?: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
