import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { UserService } from 'src/user/user.service';
import { BoardModel } from './board.model';
import { BoardDto } from './dto/board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(BoardModel) private readonly boardModel: ModelType<BoardModel>,
    private readonly userService: UserService,
  ) {}

  async findBoard(id: string) {
    return this.boardModel.findById(id).exec();
  }

  async findAllBoards() {
    return this.boardModel.find().exec();
  }

  async createBoard(auth: string, dto: BoardDto) {
    const user = await this.userService.findUserByToken(auth);
    const newBoard = new this.boardModel({
      name: dto.name,
    });
    newBoard.users.push(user._id);
    user.boards.push(newBoard._id);
    await this.userService.updateUserById(user._id, user);
    return newBoard.save();
  }

  async updateBoardById(id: string, dto: BoardDto) {
    return this.boardModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteBoardById(id: string, auth: string) {
    const user = await this.userService.findUserByToken(auth);
    const mongoId = new Types.ObjectId(id);
    const boardIndex = user.boards.findIndex((boardId) => boardId === mongoId);
    user.boards.splice(boardIndex, 1);
    await this.userService.updateUserById(user._id, user);
    return this.boardModel.findByIdAndDelete(id).exec();
  }
}
