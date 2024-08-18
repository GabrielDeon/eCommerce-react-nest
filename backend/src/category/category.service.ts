import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCategories() {
    let categories;
    try {
      categories = await this.prisma.tb_category.findMany({
        where: { deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching categories.',
      );
    }

    if (categories.length === 0) {
      throw new NotFoundException('No category was found!');
    }

    return categories;
  }

  async findCategory(id: string) {
    let category = null;

    try {
      category = await this.prisma.tb_category.findUnique({
        where: { id, deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching category:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching category.',
      );
    }

    if (category === null) throw new NotFoundException('Category not found!');

    return category;
  }

  async createCategory(categoryData: CreateCategoryDto) {
    try {
      return await this.prisma.tb_category.create({ data: categoryData });
    } catch (error) {
      console.error(`Error creating a new category: ${error.message}`);
      throw new InternalServerErrorException('Failed to create a new category!');
    }
  }

  async updateCategory(id: string, updatedCategory: UpdateCategoryDto) {
    try {
      return await this.prisma.tb_category.update({
        where: {
          id,
        },
        data: updatedCategory,
      });
    } catch (error) {
      console.error(`Error while updating a category: ${error.message}`);
      throw new InternalServerErrorException('Failed to update a category!');
    }
  }

  async softDeleteCategory(id: string) {
    try {
      return await this.prisma.tb_category.update({
        where: { id: id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      console.error(`Error soft-deleting a category: ${error.message + id}`);

      throw new InternalServerErrorException('Failed to soft-delete a category!');
    }
  }

  async deleteCategory(id: string) {
    try {
      return await this.prisma.tb_category.delete({ where: { id } });
    } catch (error) {
      console.error(`Error hard-deleting a category: ${error.message}`);
      throw new InternalServerErrorException('Failed to hard-delete a category!');
    }
  }
}
