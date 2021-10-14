import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ColumnService } from '../servicies/column.service';
import { UpdateColumnDto } from '../dto/update-column.dto';
import { CreateColumnDto } from '../dto/create-column.dto';

@UseGuards(JwtAuthGuard)
@Controller('Column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.columnService.findColumnById(id);
  }

  @Get('/')
  async getAll(@Query('boardId') boardId: string) {
    return this.columnService.findAllColumns(boardId);
  }

  @Post('/')
  async create(@Body() dto: CreateColumnDto) {
    return this.columnService.createColumn(dto);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: UpdateColumnDto) {
    return this.columnService.updateColumnById(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.columnService.deleteColumnById(id);
  }
}
