import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './../users/dto/CreateUser.dto';
import { UsersService } from 'src/users/users.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/schemas/User.schema';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private generateJwt(user: any) {
    const payload = {id:user._id, role: user.role, sub: user._id };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '1h',
    });
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { username, email, password } = createUserDto;
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists with this email!');
    }
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.createUser({
      username,
      email,
      password: hashedPass,
    });
    const token = this.generateJwt(newUser);
    // const { password: pass, ...userWithoutPass } = newUser;
    // return { token, user: userWithoutPass };
    return { token };
  }

  async login(loginDto: LoginDto) {
    const token = this.generateJwt(loginDto);
    // const { password, ...userWithoutPass } = createUserDto;
    // return { token, user: userWithoutPass };
    return { token };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user?.password))) {
      return user;
    }
    return null;
  }

  async validateGoogleUser(profile: any): Promise<any> {
    const user = await this.usersService.findByGoogleId(profile?.id);
    if (user) {
      return user;
    }
    const newUser = await this.usersService.createUser({
      username: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id,
    });
    return newUser;
  }

  async validateFacebookUser(profile: any): Promise<any> {
    const user = await this.usersService.findByFacebookId(profile.id);
    if (user) return user;
    const newUser = await this.usersService.createUser({
      username: profile.displayName,
      email: profile.emails[0].value,
      facebookId: profile.id,
    });
    return newUser;
  }
}
