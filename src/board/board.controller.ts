import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { BoardService } from './board.service';
import { BoardDto } from './dto/board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  @Get(':id')
  async get(@Param('id') id: string) {
    return this.boardService.findBoard(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAll() {
    return this.boardService.findAllBoards();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() dto: BoardDto) {
    return this.boardService.createBoard(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: BoardDto) {
    const updateBoard = await this.boardService.updateBoardById(id, dto);
    return updateBoard;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.boardService.deleteBoardById(id);
  }
}
