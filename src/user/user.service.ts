import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | any> {
    const SALT = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, SALT);
    createUserDto.password = hashPassword;

    try {
      const userExist = await this.userRepository.findOne({
        where: [{ email: createUserDto.email }],
      });

      if (userExist) {
        throw new HttpException(
          'User with the same username or email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const createUser = await this.userRepository.save(createUserDto);
      createUser.password = undefined;
      return createUser;
    } catch (error) {
      throw new HttpException(
        'User with that username or email already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll(): Promise<FindUserDto[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<FindUserDto> {
    return this.userRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userUpdate = await this.userRepository.findOne(id);
    userUpdate.name = updateUserDto.name;
    // userUpdate.password = updateUserDto.password;
    return this.userRepository.save(userUpdate);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'The user with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
}
