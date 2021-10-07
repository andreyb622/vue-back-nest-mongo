import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/servicies/user.service';
import { BoardDao } from '../DAO/board.dao';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardDao: BoardDao,
    private readonly userService: UserService,
  ) {}

  async findBoardById(id: string) {
    return this.boardDao.getById(id);
  }

  async findAllBoards(auth: string) {
    const user = await this.userService.findUserByToken(auth);
    return this.boardDao.getAllUsersBoard(user._id.toHexString());
  }

  async createBoard(auth: string, dto: CreateBoardDto) {
    const user = await this.userService.findUserByToken(auth);
    const newBoard = await this.boardDao.createBoard({
      ...dto,
    });
    newBoard.users = [user._id.toHexString()];
    user.boards.push(newBoard._id.toHexString());
    await this.userService.updateUserById(user._id.toHexString(), user);
    return newBoard;
  }

  async updateBoardById(id: string, dto: UpdateBoardDto) {
    return this.boardDao.updateBoardById(id, dto);
  }

  async deleteBoardById(id: string, auth: string) {
    const user = await this.userService.findUserByToken(auth);
    const boardIndex = user.boards.findIndex((boardId) => boardId === id);
    user.boards.splice(boardIndex, 1);
    await this.userService.updateUserById(user._id.toHexString(), user);
    return this.boardDao.deleteBoardById(id);
  }
}
