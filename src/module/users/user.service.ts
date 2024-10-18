import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { createUserDto } from './dtos/create-user.dto';
import { v7 as uuid } from 'uuid';
import { UserResponseDto } from './dtos/user.response.dto';

@Injectable()
export class UserService {
  private readonly users: UserEntity[] = [];

  findUsers(): UserEntity[] {
    return this.users;
  }
  findUserById(id: string): UserEntity {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
      // throw new CustomHttpException();
    }

    return user;
  }
  createUser(user: createUserDto): UserResponseDto {
    const newUser: UserEntity = {
      ...user,
      id: uuid(),
    };

    this.users.push(newUser);
    return new UserResponseDto(newUser);
  }
  updateUser(id: string, user: UpdateUserDto): UserEntity {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }
  deleteUser(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex > -1) {
      this.users.splice(userIndex, 1); // حذف المستخدم من المصفوفة
      return { message: 'User deleted successfully' }; // يمكنك إرجاع رسالة نجاح
    } else {
      return { message: 'User not found' }; // في حال لم يكن المستخدم موجودًا
    }
  }
}
