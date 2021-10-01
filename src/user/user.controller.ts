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
import { USER_NOT_FOUND_ERROR } from 'src/auth/auth.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserModel } from './user.model';
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
  async patch(@Param('id') id: string, @Body() dto: UserModel) {
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
