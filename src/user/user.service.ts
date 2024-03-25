import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserResponseDto } from './dto/get-user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async activeUsers(): Promise<GetUserResponseDto[]> {
    const db = await this.userRepository.find({ relations: ['products'] });
    const newArray = db.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      birthDay: user.birthDay,
      products: user.products?.map((item) => ({
        name: item.name,
      })),
    }));

    return newArray;
  }

  async getById(id: number): Promise<User> {
    const user = this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (user) {
      return user;
    }

    return null;
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: updateUserDto.id,
      },
    });
    if (user) {
      user.name = updateUserDto.name;
      user.email = updateUserDto.email;
    }
    return await this.userRepository.save(user);
  }

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);

    return {
      message: 'User saved successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    };
  }

  async delete(id: number) {
    return this.userRepository.softDelete(id);
  }
}
