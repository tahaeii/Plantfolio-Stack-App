import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { isValidId } from 'utils/IdValidator';
import ApiFeatures, { QueryString } from 'utils/apiFeatures';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userDto: any): Promise<UserDocument> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async newUserByAdmin(createUserDto: CreateUserDto) {
    const { password, ...others } = createUserDto;
    const user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('User already exists!');
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await this.createUser({
      password: hashedPass,
      ...others,
    });
    return {
      message: 'User Successfully Created!',
      userId: newUser._id,
    };
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    id: string,
    role: string,
    userId: string,
  ) {
    isValidId('User', id);
    if (!role || !userId || (role !== 'admin' && id !== userId)) {
      throw new UnauthorizedException('Access Denied!');
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException('User Not Found!');
    }
    const { password = '', ...others } = updateUserDto;
    let hashedPass = user.password;
    if (password) {
      hashedPass = await bcrypt.hash(password, 10);
    }
    await this.userModel.findByIdAndUpdate(id, {
      password: hashedPass,
      ...others,
    });
    return {
      message: 'User Info Successfully Updated!',
    };
  }

  async deleteUser(id: string, role: UserRole, userId: string) {
    isValidId('User', id);
    if (!role || !userId || (role !== 'admin' && userId !== id)) {
      throw new UnauthorizedException('Access Denied!');
    }
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new BadRequestException('No User to Delete');
    return {
      message: 'User Successfully Deleted!',
    };
  }

  async getUser(id: string) {
    isValidId('User', id);
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new BadRequestException('User Not Found!');
    return {
      user,
    };
  }

  async getUsers(query: QueryString) {
    const features = new ApiFeatures(this.userModel, query)
      .filters()
      .sort()
      .limitFields()
      .populate()
      .paginate();
    const users = await features.model.select('-password');
    const { page, sort, limit, fields, populate, ...filters } = query;
    const count = await this.userModel.countDocuments(filters);
    return { users, count };
  }
}
