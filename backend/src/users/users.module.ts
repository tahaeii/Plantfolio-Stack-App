import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { UsersController } from './users.controller';
import { AdminStrategy } from 'src/auth/strategy/admin.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UsersService, AdminStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
