import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { BoardModel } from './board.model';
import { BoardDto } from './dto/board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(BoardModel) private readonly boardModel: ModelType<BoardModel>,
  ) {}

  async findBoard(id: string) {
    return this.boardModel.findById(id).exec();
  }

  async findAllBoards() {
    return this.boardModel.find().exec();
  }

  async createBoard(dto: BoardDto) {
    const newBoard = new this.boardModel({
      name: dto.name,
    });
    return newBoard.save();
  }

  async updateBoardById(id: string, dto: BoardDto) {
    return this.boardModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteBoardById(id: string) {
    return this.boardModel.findByIdAndDelete(id).exec();
  }
}
