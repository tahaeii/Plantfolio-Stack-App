import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './../users/dto/CreateUser.dto';
import { UsersService } from 'src/users/users.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/schemas/User.schema';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { MailerService } from '@nestjs-modules/mailer';
import { generateCode } from 'utils/generateCode';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailerService: MailerService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  generateJwt(user: any) {
    const payload = { role: user.role, sub: user._id };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '1h',
    });
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { password, recaptchaToken, ...others } = createUserDto;
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('User already exists with this email!');
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const code = generateCode();

    const newUser = await this.usersService.createUser({
      ...others,
      password: hashedPass,
      isVerified: false,
      emailVerificationCode: code,
      codeExpiresAt: new Date(Date.now() + 30 * 60 * 1000),
    });

    await this.mailerService.sendMail({
      to: newUser.email,
      subject: 'Verify your email',
      html: `<p>Your verification code is <strong>${code}</strong></p>`,
    });

    const token = this.generateJwt(newUser);

    return {
      message: 'Verification code sent to email!',
      userId: (newUser as UserDocument)._id,
      token,
    };
  }

  async verifyEmail(userId: string, code: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User Not Found!');

    if (
      user.emailVerificationCode !== code ||
      new Date() > user.codeExpiresAt!
    ) {
      throw new BadRequestException('Invalid or expired code!');
    }

    user.isVerified = true;
    // user.emailVerificationCode = null;
    // user.codeExpiresAt = null;
    await user.save();

    return {
      message: 'Email Verified Successfully!',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    const token = this.generateJwt(user);
    // const { password, ...userWithoutPass } = createUserDto;
    // return { token, user: userWithoutPass };
    return token;
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
