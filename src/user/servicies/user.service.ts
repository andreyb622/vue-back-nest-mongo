import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { genSaltSync, hash } from 'bcryptjs';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { UserDao } from '../DAO/user.dao';
import { UpdateUserDto } from '../dto/update-user.dto';
import { USER_NOT_FOUND_ERROR } from '../user.constants';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userDao: UserDao,
  ) {}

  async findUserByEmail(email: string) {
    return this.userDao.getUserByEmail(email);
  }

  async findUserByToken(auth: string) {
    const token: string = auth.split(' ')[1];
    const { email } = await this.jwtService.verifyAsync(token);
    return this.findUserByEmail(email);
  }

  async createUser(dto: AuthDto) {
    const salt = genSaltSync(10);
    const newUser = {
      email: dto.email,
      passwordHash: await hash(dto.password, salt),
    };

    return this.userDao.createUser(newUser);
  }

  async updateUserById(id: string, dto: UpdateUserDto) {
    const updatedUser = await this.userDao.updateUserById(id, dto);
    if (!updatedUser) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }
    return updatedUser;
  }

  async deleteUserById(id: string) {
    const deletedUser = await this.userDao.deleteUserById(id);
    if (!deletedUser) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }
    return deletedUser;
  }
}
