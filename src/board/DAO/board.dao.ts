import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { BoardModel } from '../models/board.model';

export class BoardDao {
  constructor(
    @InjectModel(BoardModel) private readonly boardModel: ModelType<BoardModel>,
  ) {}

  async getById(id: string) {
    return this.boardModel.findById(id).exec();
  }

  async getAllUsersBoard(userId: string) {
    return this.boardModel.find({ users: userId }).exec();
  }

  async createBoard(dto: CreateBoardDto) {
    const newBoard = new this.boardModel(dto);
    return newBoard.save();
  }

  async updateBoardById(id: string, dto: UpdateBoardDto) {
    return this.boardModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteBoardById(id: string) {
    return this.boardModel.findByIdAndDelete(id).exec();
  }
}
