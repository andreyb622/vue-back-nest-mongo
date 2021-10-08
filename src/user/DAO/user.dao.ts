import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { DAOBaseClass } from 'src/utils/entities/DAOBaseClass';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserModel } from '../models/user.model';

export class UserDao extends DAOBaseClass {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {
    super();
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
