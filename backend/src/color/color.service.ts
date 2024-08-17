import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllColors() {
    let colors;
    try {
      colors = await this.prisma.tb_color.findMany({
        where: { deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching colors:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching colors.',
      );
    }

    if (colors.length === 0) {
      throw new NotFoundException('No color was found!');
    }

    return colors;
  }

  async findColor(id: string) {
    let color = null;

    try {
      color = await this.prisma.tb_color.findUnique({
        where: { id, deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching color:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching color.',
      );
    }

    if (color === null) throw new NotFoundException('Color not found!');

    return color;
  }

  async createColor(colorData: CreateColorDto) {
    try {
      return await this.prisma.tb_color.create({ data: colorData });
    } catch (error) {
      console.error(`Error creating a new color: ${error.message}`);
      throw new InternalServerErrorException('Failed to create a new color!');
    }
  }

  async updateColor(id: string, updatedColor: UpdateColorDto) {
    try {
      return await this.prisma.tb_color.update({
        where: {
          id,
        },
        data: updatedColor,
      });
    } catch (error) {
      console.error(`Error while updating a color: ${error.message}`);
      throw new InternalServerErrorException('Failed to update a color!');
    }
  }

  async softDeleteColor(id: string) {
    try {
      return await this.prisma.tb_color.update({
        where: { id: id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      console.error(`Error soft-deleting a color: ${error.message + id}`);

      throw new InternalServerErrorException('Failed to soft-delete a color!');
    }
  }

  async deleteColor(id: string) {
    try {
      return await this.prisma.tb_color.delete({ where: { id } });
    } catch (error) {
      console.error(`Error hard-deleting a color: ${error.message}`);
      throw new InternalServerErrorException('Failed to hard-delete a color!');
    }
  }
}
