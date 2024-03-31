import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserResponseDto } from 'src/user/dto/login-user-response';
import { ResponseCreator } from 'utils/ResponseCreater';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto): Promise<User> {
    const hashPassword = await bcrypt.hashSync(user.password, 12);
    user.password = hashPassword;
    const newUser = await this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async getByMail(email: string): Promise<User> {
    try {
      const searchUser = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      if (!searchUser) {
        throw new BadRequestException('Invalid credentials');
      } else {
        return searchUser;
      }
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async login(userLogin: LoginUserDto): Promise<LoginUserResponseDto> {
    const searchUser = this.getByMail(userLogin.email);

    if (
      !(await bcrypt.compareSync(
        userLogin.password,
        (await searchUser).password,
      ))
    ) {
      throw new BadRequestException('Wrong password');
    }

    const jwt = await this.jwtService.signAsync({
      subject: (await searchUser).id,
      name: (await searchUser).name,
    });

    return ResponseCreator.constructLoginResponse(
      (await searchUser).name,
      await jwt,
    );
  }
}
