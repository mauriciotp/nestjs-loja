import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { v4 as uuid } from 'uuid';
import { ListUserDto } from './dto/ListUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.name = userData.name;
    userEntity.id = uuid();

    this.userRepository.save(userEntity);
    return {
      user: new ListUserDto(userEntity.id, userEntity.name),
      message: 'user created successfully',
    };
  }

  @Get()
  async listUsers() {
    const savedUsers = await this.userRepository.list();
    const usersList = savedUsers.map(
      (user) => new ListUserDto(user.id, user.name),
    );

    return usersList;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updatedUser = await this.userRepository.update(id, newData);

    return {
      user: updatedUser,
      message: 'user updated successfully',
    };
  }
}
