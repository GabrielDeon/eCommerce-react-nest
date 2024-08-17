import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUsers(@Query('role') role?: 'ADMIN' | 'USER') {
    return this.userService.findAllUsers(role);
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }

  @Post()
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body()
    userUpdate: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, userUpdate);
  }

  @Patch(':id/soft-delete')
  softDeleteUser(@Param('id') id: string) {
    return this.userService.softDeleteUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
