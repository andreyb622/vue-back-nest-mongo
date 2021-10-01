import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardDto } from './dto/board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  @Get(':id')
  async get(@Param('id') id: string) {
    return this.boardService.findBoard(id);
  }

  @Get('/')
  async getAll() {
    return this.boardService.findAllBoards();
  }

  @Post('/')
  async create(@Body() dto: BoardDto) {
    return this.boardService.createBoard(dto);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: BoardDto) {
    const updateBoard = await this.boardService.updateBoardById(id, dto);
    return updateBoard;
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.boardService.deleteBoardById(id);
  }
}
