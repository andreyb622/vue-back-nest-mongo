import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { USER_NOT_FOUND_ERROR } from 'src/auth/auth.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUsers() {
    return this.userService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id') id: Types.ObjectId, @Body() dto: UserDto) {
    const updatedUser = await this.userService.updateUserById(id, dto);
    if (!updatedUser) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }
    return updatedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedUser = await this.userService.deleteUserById(id);
    if (!deletedUser) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }
  }
}
