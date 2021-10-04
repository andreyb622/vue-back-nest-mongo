import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { genSaltSync, hash } from 'bcryptjs';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { UserDto } from './dto/user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,

    private readonly jwtService: JwtService,
  ) {}

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findUserByToken(auth: string) {
    const token: string = auth.split(' ')[1];
    const { email } = await this.jwtService.verifyAsync(token);
    return this.findUserByEmail(email);
  }

  async findAllUsers() {
    return this.userModel.find().exec();
  }

  async createUser(dto: AuthDto) {
    const salt = genSaltSync(10);
    const newUser = new this.userModel({
      email: dto.email,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
  }

  async updateUserById(id: Types.ObjectId, dto: UserDto) {
    return this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteUserById(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
