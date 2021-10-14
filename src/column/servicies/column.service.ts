import { Injectable } from '@nestjs/common';
import { BoardService } from 'src/board/servicies/board.service';
import { ColumnDao } from '../DAO/column.dao';
import { CreateColumnDto } from '../dto/create-column.dto';
import { UpdateColumnDto } from '../dto/update-column.dto';

@Injectable()
export class ColumnService {
  constructor(
    private readonly columnDao: ColumnDao,
    private readonly boardService: BoardService,
  ) {}

  async findColumnById(id: string) {
    return this.columnDao.getById(id);
  }

  async findAllColumns(boardId: string) {
    const board = await this.boardService.findBoardById(boardId);
    return this.columnDao.getAllColumns(board._id);
  }

  async createColumn({ boardId, name }: CreateColumnDto) {
    const newColumn = await this.columnDao.createColumn({
      name,
      boardId,
    });
    return newColumn;
  }

  async updateColumnById(id: string, dto: UpdateColumnDto) {
    return this.columnDao.updateColumnById(id, dto);
  }

  async deleteColumnById(id: string) {
    return this.columnDao.deleteColumnById(id);
  }
}
