import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserModel } from '../models/user.model';

export class UserDao {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {}

  toHexObjectId(id: string) {
    return new Types.ObjectId(id);
  }

  async getById(id: string) {
    return this.userModel.findById(this.toHexObjectId(id)).exec();
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(dto: CreateUserDto) {
    const newUser = new this.userModel(dto);
    return newUser.save();
  }

  async updateUserById(id: string, dto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(this.toHexObjectId(id), dto, { new: true })
      .exec();
  }

  async deleteUserById(id: string) {
    return this.userModel.findByIdAndDelete(this.toHexObjectId(id)).exec();
  }
}
