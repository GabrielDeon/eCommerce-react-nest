import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllProducts(page: number, perPage: number, filter: string) {
    const skip = (page - 1) * perPage;
    const take = perPage;

    let orderBy;

    if (filter === 'price') {
      orderBy = { price: 'desc' };
    } else if (filter === 'name') {
      orderBy = { name: 'asc' };
    } else {
      orderBy = undefined;
    }

    let products;
    try {
      products = await this.prisma.tb_product.findMany({
        where: { deleted_at: null },
        include: { category: true },
        skip,
        take,
        orderBy,
      });
      
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching products.',
      );
    }

    if (products.length === 0) {
      throw new NotFoundException('No product was found!');
    }

    const totalProducts = await this.countProducts()    

    return {totalProducts, ...products};
  }

  async findProduct(id: string) {
    let product = null;
    try {
      product = await this.prisma.tb_product.findUnique({
        where: { id: id, deleted_at: null },
        include: { category: true },
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching product.',
      );
    }

    if (product === null) throw new NotFoundException('Product not found!');

    return product;
  }

  async createBaseProduct(
    productData: CreateProductDto,
    productImages: Array<Express.Multer.File>,
  ) {
    const uploadPath = path.join(__dirname, '..', '..', 'Products', 'Images');

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const fileUrls = productImages.map((file) => {
      const filePath = path.join(uploadPath, file.originalname);
      fs.writeFileSync(filePath, file.buffer);
      return `/Products/Images/${file.originalname}`;
    });

    const { base_price, discount_percentage, id_category, ...rest } =
      productData;

    let validDiscountPercentage = 0;
    if (discount_percentage >= 0 && discount_percentage <= 100) {
      validDiscountPercentage = discount_percentage;
    }

    const final_price =
      Number(base_price) - (Number(base_price) * validDiscountPercentage) / 100;

    const newProduct = {
      ...rest,
      base_price,
      discount_percentage: validDiscountPercentage,
      final_price,
      image_1: fileUrls[0],
      image_2: fileUrls[1] || null,
      image_3: fileUrls[2] || null,
      image_4: fileUrls[3] || null,
      category: {
        connect: { id: id_category },
      },
    };

    try {
      await this.prisma.tb_category.findUnique({
        where: { id: id_category },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to validate category for product creation.',
      );
    }

    try {
      return await this.prisma.tb_product.create({ data: newProduct });
    } catch (error) {
      console.error(`Error creating a new product: ${error.message}`);
      throw new InternalServerErrorException(
        `Failed to create a new product! Error: ${error.message}`,
      );
    }
  }

  async updateProduct(id: string, updatedProduct: UpdateProductDto) {
    try {
      return await this.prisma.tb_product.update({
        where: {
          id: id,
        },
        data: updatedProduct,
      });
    } catch (error) {
      console.error(`Error while updating a product: ${error.message}`);
      throw new InternalServerErrorException('Failed to update a product!');
    }
  }

  async softDeleteProduct(id: string) {
    try {
      return await this.prisma.tb_product.update({
        where: { id: id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      console.error(`Error soft-deleting a product: ${error.message}`);

      throw new InternalServerErrorException(
        'Failed to soft-delete a product!',
      );
    }
  }

  async deleteProduct(id: string) {
    try {
      return await this.prisma.tb_product.delete({ where: { id: id } });
    } catch (error) {
      console.error(`Error hard-deleting a product: ${error.message}`);
      throw new InternalServerErrorException(
        'Failed to hard-delete a product!',
      );
    }
  }

  async countProducts() {
    try {
      return await this.prisma.tb_product.count({
        where: { deleted_at: null },
      });
    } catch (error) {
      console.error('Error counting products:', error);
      throw new InternalServerErrorException(
        'An error occurred while counting products.',
      );
    }
  }
}
