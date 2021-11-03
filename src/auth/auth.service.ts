import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from '../user/models/user.model';
import { compare } from 'bcryptjs';

import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/servicies/user.service';
import { WRONG_EMAIL_OR_PASSWORD_ERROR } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async createUser(dto: AuthDto) {
    return this.userService.createUser(dto);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserModel, 'email'>> {
    const user = await this.userService.findUserByEmail(email);
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!user || !isCorrectPassword) {
      throw new UnauthorizedException(WRONG_EMAIL_OR_PASSWORD_ERROR);
    }
    return { email: user.email };
  }

  async login(dto: AuthDto) {
    const oldUser = await this.userService.findUserByEmail(dto.email);
    if (oldUser) {
      const user = await this.validateUser(dto.email, dto.password);
      return this.returnToken(user.email);
    }
    const newUser = await this.createUser(dto);
    return this.returnToken(newUser.email);
  }

  async returnToken(email: string) {
    return {
      access_token: await this.jwtService.signAsync({ email }),
    };
  }
}
