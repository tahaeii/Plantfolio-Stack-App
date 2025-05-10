import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: any): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findByEmail(email:string):Promise<User | null>{
    return this.userModel.findOne({email})
  }

  async findByGoogleId(googleId:string):Promise<User | null>{
    return this.userModel.findOne({googleId})
  }

  async findByFacebookId(facebookId:string):Promise<User | null>{
    return this.userModel.findOne({facebookId})
  }
}
