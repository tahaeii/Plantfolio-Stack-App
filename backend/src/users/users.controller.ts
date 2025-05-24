import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetUser } from './decorators/getUser.decorator';
import { UserRole } from 'src/schemas/User.schema';
import { QueryString } from 'utils/apiFeatures';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}


  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
    @GetUser('role') role: UserRole,
    @GetUser('sub') userId: string,
  ) {
    return await this.usersService.updateUser(updateUserDto, id, role, userId);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(
    @Param('id') id: string,
    @GetUser('role') role: UserRole,
    @GetUser('sub') userId: string,
  ) {
    return await this.usersService.deleteUser(id, role, userId);
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUser(id);
  }

  @Get('')
  @UseGuards(AdminGuard)
  async getUsers(@Query() query:QueryString) {
    return await this.usersService.getUsers(query);
  }
}
