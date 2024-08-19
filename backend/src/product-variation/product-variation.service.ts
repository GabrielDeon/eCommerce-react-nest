import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductVariationDto } from './dto/create-product-variation.dto';
import { UpdateProductVariationDto } from './dto/update-product-variation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class ProductVariationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllProductVariations() {
    let productVariations;
    try {
      productVariations = await this.prisma.tb_product_variation.findMany({
        where: { deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching Product Variations:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching Product Variations.',
      );
    }

    if (productVariations.length === 0) {
      throw new NotFoundException('No Product Variation was found!');
    }

    return productVariations;
  }

  async findProductVariation(id: string) {
    let productVariation = null;

    try {
      productVariation = await this.prisma.tb_product_variation.findUnique({
        where: { id, deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching Product Variation:', error);
      throw new InternalServerErrorException(
        `An error occurred while fetching Product Variation. Error: ${error.message}`,
      );
    }

    if (productVariation === null)
      throw new NotFoundException('Product Variation not found!');

    return productVariation;
  }

  async findProductVariationsByProductId(id_product: string) {
    try {
      const productVariation = await this.prisma.tb_product_variation.findMany({
        where: { id_product, deleted_at: null },
      });

      if (productVariation.length === 0)
        throw new NotFoundException(
          `No Product Variations were found for the id_product: ${id_product}`,
        );

      return productVariation;
    } catch (error) {
      console.error('Error fetching Product Variation by Product Id:', error);
      throw new InternalServerErrorException(
        `An error occurred while fetching Product Variation by product Id. Error: ${error.message}`,
      );
    }
  }

  async createProductVariation(
    productVariationData: CreateProductVariationDto,
  ) {
    const { id_product, id_size, id_color, quantity } = productVariationData;

    try {
      if (id_product) {
        await this.prisma.tb_product.findFirstOrThrow({
          where: { id: id_product },
        });
      }

      if (id_size) {
        await this.prisma.tb_size.findFirstOrThrow({
          where: { id: id_size },
        });
      }

      if (id_color) {
        await this.prisma.tb_color.findFirstOrThrow({
          where: { id: id_color },
        });
      }

      if (quantity <= 0) {
        throw new BadRequestException('Quantity must be greater than zero.');
      }
    } catch (error) {
      console.error('Validation error on createProductVariation:', error);
      throw new InternalServerErrorException(
        `Failed to validate data. Error: ${error.message}`,
      );
    }

    const newSKU = await this.generateSKU(id_product, id_size, id_color);

    const newProductVariation = {
      quantity,
      SKU: newSKU,
      product: {
        connect: { id: id_product },
      },
      size: id_size ? { connect: { id: id_size } } : undefined,
      color: id_color ? { connect: { id: id_color } } : undefined,
    };

    try {
      return await this.prisma.tb_product_variation.create({
        data: newProductVariation,
      });
    } catch (error) {
      console.error(`Error creating a new Product Variation: ${error}`);
      throw new InternalServerErrorException(
        `Failed to create a new Product Variation! Error: ${error.message}`,
      );
    }
  }

  async updateProductVariation(
    id: string,
    updatedProductVariation: UpdateProductVariationDto,
  ) {
    try {
      return await this.prisma.tb_product_variation.update({
        where: {
          id,
        },
        data: updatedProductVariation,
      });
    } catch (error) {
      console.error(
        `Error while updating a Product Variation: ${error.message}`,
      );
      throw new InternalServerErrorException(
        'Failed to update a Product Variation!',
      );
    }
  }

  async softDeleteProductVariation(id: string) {
    try {
      return await this.prisma.tb_product_variation.update({
        where: { id: id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      console.error(
        `Error soft-deleting a Product Variation: ${error.message}`,
      );

      throw new InternalServerErrorException(
        'Failed to soft-delete a Product Variation!',
      );
    }
  }

  async deleteProductVariation(id: string) {
    try {
      return await this.prisma.tb_product_variation.delete({ where: { id } });
    } catch (error) {
      console.error(
        `Error hard-deleting a Product Variation: ${error.message}`,
      );
      throw new InternalServerErrorException(
        'Failed to hard-delete a Product Variation!',
      );
    }
  }

  async generateSKU(id_product: string, id_size?: string, id_color?: string) {
    // Extract the first 2 characters of the product UUID
    const productPart = id_product.slice(0, 2).toUpperCase();

    // Extract or assign default values for size and color, limiting to 1 character
    const sizePart = id_size ? id_size.slice(0, 1).toUpperCase() : '0';
    const colorPart = id_color ? id_color.slice(0, 1).toUpperCase() : '0';

    // Generate a 3-character random alphanumeric string
    const randomPart = crypto
      .randomBytes(2)
      .toString('hex')
      .slice(0, 3)
      .toUpperCase();

    // Combine all parts to form the SKU
    const SKU = `${productPart}${sizePart}${colorPart}${randomPart}`;

    // Check if the SKU already exists in the database
    const existingSKU = await this.prisma.tb_product_variation.findUnique({
      where: { SKU },
    });

    // If the SKU exists, recursively generate a new one
    if (existingSKU) {
      return this.generateSKU(id_product, id_size, id_color);
    }

    // Return the unique SKU
    return SKU;
  }
}
