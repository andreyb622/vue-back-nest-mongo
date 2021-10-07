import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserModel } from '../models/user.model';

export class UserDao {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {}

  async getById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(dto: CreateUserDto) {
    const newUser = new this.userModel(dto);
    return newUser.save();
  }

  async updateUserById(id: string, dto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteUserById(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
