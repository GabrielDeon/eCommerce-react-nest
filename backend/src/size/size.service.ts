import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Injectable()
export class SizeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllSizes() {
    let sizes;
    try {
      sizes = await this.prisma.tb_size.findMany({
        where: { deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching sizes.',
      );
    }

    if (sizes.length === 0) {
      throw new NotFoundException('No size was found!');
    }

    return sizes;
  }

  async findSize(id: string) {
    let size = null;

    try {
      size = await this.prisma.tb_size.findUnique({
        where: { id, deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching size:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching size.',
      );
    }

    if (size === null) throw new NotFoundException('Size not found!');

    return size;
  }

  async createSize(sizeData: CreateSizeDto) {
    try {
      return await this.prisma.tb_size.create({ data: sizeData });
    } catch (error) {
      console.error(`Error creating a new size: ${error.message}`);
      throw new InternalServerErrorException('Failed to create a new user!');
    }
  }

  async updateSize(id: string, updatedSize: UpdateSizeDto) {
    try {
      return await this.prisma.tb_size.update({
        where: {
          id,
        },
        data: updatedSize,
      });
    } catch (error) {
      console.error(`Error while updating a user: ${error.message}`);
      throw new InternalServerErrorException('Failed to update a user!');
    }
  }

  async softDeleteSize(id: string) {
    try {
      return await this.prisma.tb_size.update({
        where: { id: id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      console.error(`Error soft-deleting a size: ${error.message + id}`);

      throw new InternalServerErrorException('Failed to soft-delete a size!');
    }
  }

  async deleteSize(id: string) {
    try {
      return await this.prisma.tb_size.delete({ where: { id } });
    } catch (error) {
      console.error(`Error hard-deleting a size: ${error.message}`);
      throw new InternalServerErrorException('Failed to hard-delete a size!');
    }
  }
}
