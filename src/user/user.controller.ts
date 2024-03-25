import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getById(id);
  }

  @Get()
  activeUsers() {
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
