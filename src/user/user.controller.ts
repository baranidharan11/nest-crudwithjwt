import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Post('createUser')
  async createUser(@Body() data: createUserDto) {
    return await this.userservice.createUser(data);
  }

  @Delete('deleteUser/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userservice.deleteUser(id);
  }

  @Get('')
  async getAllUser() {
    return this.userservice.getAllUser();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return this.userservice.getUserById(id);
  }

  @Patch('updateUser/:id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return await this.userservice.updateUser(id, data);
  }
}
