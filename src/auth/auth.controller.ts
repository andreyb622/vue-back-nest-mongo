import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    const oldUser = await this.userService.findUser(dto.email);
    if (oldUser) {
      const user = await this.authService.validateUser(dto.email, dto.password);
      return this.authService.login(user.email);
    }
    const newUser = await this.authService.createUser(dto);
    return this.authService.login(newUser.email);
  }
}
