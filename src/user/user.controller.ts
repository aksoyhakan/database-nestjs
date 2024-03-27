import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth-guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getById(id);
  }

  @UseGuards(JwtGuard)
  @Get()
  activeUsers() {
    return this.userService.activeUsers();
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(@Param('id') userId: number, @Body() body: UpdateUserDto) {
    body.id = userId;
    return this.userService.update(body);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  delete(@Param('id') userId: number) {
    return this.userService.delete(userId);
  }
}
