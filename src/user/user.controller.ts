import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getById(id);
  }

  @Get()
  activeUsers(@Req() req: Request) {
    const token = req.headers?.authorization;
    return this.userService.activeUsers();
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Put(':id')
  update(@Param('id') userId: number, @Body() body: UpdateUserDto) {
    body.id = userId;
    return this.userService.update(body);
  }

  @Delete(':id')
  delete(@Param('id') userId: number) {
    return this.userService.delete(userId);
  }
}
