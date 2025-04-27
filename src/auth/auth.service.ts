import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, password, username }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new ConflictException('Account with this email already exists');
    }

    await this.usersService.create({
      email,
      password: await bcrypt.hash(password, 10),
      username,
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException(
        'Account with this email does not exists',
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Wrong password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
