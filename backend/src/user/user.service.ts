import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(role?: 'ADMIN' | 'USER') {
    let users;
    if (role) {
      users = await this.prisma.tb_user.findMany({
        where: { role, deleted_at: null },
      });
    } else {
      users = await this.prisma.tb_user.findMany({
        where: { deleted_at: null },
      });
    }

    if (users.length === 0) {
      throw new NotFoundException('Users not found!');
    }

    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.tb_user.findUnique({
      where: { id: id, deleted_at: null },
    });

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async createUser(userData: CreateUserDto) {
    const { password } = userData;
    let hashedPassword: string;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.error(`Error while hashing password: ${error.message}`);
      throw new InternalServerErrorException('Failed to hash the password.');
    }

    const newUserData = { ...userData, password: hashedPassword };

    try {
      return await this.prisma.tb_user.create({ data: newUserData });
    } catch (error) {
      console.error(`Error creating a new user: ${error.message}`);

      throw new InternalServerErrorException('Failed to create a new user!');
    }
  }

  async update(id: string, updatedUser: UpdateUserDto) {
    try {
      return await this.prisma.tb_user.update({
        where: {
          id: id,
        },
        data: updatedUser,
      });
    } catch (error) {
      console.error(`Error while updating a user: ${error.message}`);
      throw new InternalServerErrorException('Failed to update a user!');
    }    
  }

  async softDelete(id: string) {
    try {
      return await this.prisma.tb_user.update({
        where: { id: id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      console.error(`Error soft-deleting a user: ${error.message}`);

      throw new InternalServerErrorException('Failed to soft-delete a user!');
    }    
  }

  async delete(id: string) {
    try {
      return await this.prisma.tb_user.delete({ where: { id: id } });
    } catch (error) {
      console.error(`Error hard-deleting a user: ${error.message}`);

      throw new InternalServerErrorException('Failed to hard-delete a user!');
    }    
  }
}
