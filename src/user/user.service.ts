import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { createUserDto } from './dto/create.user.dto';
import { UserEntity } from 'src/db/entitties/user-entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private manager: EntityManager;

  constructor(
    @Inject('DataSource')
    private dataSource: DataSource,
  ) {
    this.manager = this.dataSource.manager;
  }

  async createUser(data: createUserDto) {
    try {
      const user = await this.manager.findOneBy(UserEntity, {
        email: data.email,
      });
      if (user) {
        throw new Error('User already exists, go login');
      }

      const createUser = this.manager.create(UserEntity, {
        email: data.email,
        name: data.name,
        password: data.password,
        mobile: data.mobile,
        gender: data.gender,
        date_of_birth: data.date_of_birth,
      });

      await this.manager.save(UserEntity, createUser);
      return { message: 'User created successfully', user: createUser };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async updateUser(id: string, data: UpdateUserDto) {
    try {
      const user = await this.manager.findOneBy(UserEntity, { id });
      if (!user) {
        throw new Error('User not found');
      }

      // Update the user properties
      user.date_of_birth = data.date_of_birth;
      user.email = data.email;
      user.gender = data.gender;
      user.name = data.name;
      user.password = data.password;

      await this.manager.save(UserEntity, user); // Use save to update the entity
      return { message: 'User updated successfully' };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.manager.findOneBy(UserEntity, { id });
      if (!user) {
        throw new Error('User not found');
      }

      await this.manager.delete(UserEntity, id);
      return 'Delete user successful';
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async getAllUser() {
    try {
      const users = await this.manager.find(UserEntity);
      if (users.length === 0) {
        throw new Error('No users found');
      }
      return { message: 'Users retrieved successfully', data: users };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.manager.findOneBy(UserEntity, { id });
      if (!user) {
        throw new Error('User not found');
      }
      return { message: 'User retrieved successfully', data: user };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }
}
