import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './servicies/user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUserById(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }
}
