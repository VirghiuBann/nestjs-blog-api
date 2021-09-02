import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
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
    userUpdate.username = updateUserDto.username;
    userUpdate.password = updateUserDto.password;
    return this.userRepository.save(userUpdate);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
