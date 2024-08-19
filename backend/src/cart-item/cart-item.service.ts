import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartItemService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCartItems() {
    let cartitems;
    try {
      cartitems = await this.prisma.tb_cart_item.findMany({
        where: { deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching Cart Items:', error);
      throw new InternalServerErrorException(
        `An error occurred while fetching Cart Items. Error: ${error.message}`,
      );
    }

    if (cartitems.length === 0) {
      throw new NotFoundException('No Cart Item was found!');
    }

    return cartitems;
  }

  async findCartItem(id: string) {
    let cartitems = null;

    try {
      cartitems = await this.prisma.tb_cart_item.findUnique({
        where: { id, deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching Cart Item:', error);
      throw new InternalServerErrorException(
        `An error occurred while fetching Cart Item. Error: ${error.message}`,
      );
    }

    if (cartitems === null) throw new NotFoundException('Cart Item not found!');

    return cartitems;
  }

  async findCartItemsByCartId(id_cart: string) {
    try {
      const cartItems = await this.prisma.tb_cart_item.findMany({
        where: { id_cart, deleted_at: null },
      });

      if (cartItems.length === 0) {
        throw new NotFoundException('No Cart Item found for this product.');
      }

      return cartItems;
    } catch (error) {
      console.error('Error fetching Cart Items by Product ID:', error);
      throw new InternalServerErrorException(
        `An error occurred while fetching Cart Items. Error: ${error.message}`,
      );
    }
  }

  async createCartItem(createCartItemDto: CreateCartItemDto) {
    const { id_cart, id_product_variation, quantity, ...rest } =
      createCartItemDto;
    let productVar;

    try {
      if (id_cart) {
        await this.prisma.tb_cart.findFirstOrThrow({
          where: { id: id_cart },
        });
      }

      if (id_product_variation) {
        productVar = await this.prisma.tb_product_variation.findFirstOrThrow({
          where: { id: id_product_variation },
          include: { product: true },
        });
      }

      if (quantity <= 0 || quantity > productVar.quantity) {
        throw new InternalServerErrorException(
          `Failed to validate data. Quantity number is invalid or surpass stock!`,
        );
      }
    } catch (error) {
      console.error('Validation error on createProductVariation:', error);
      throw new InternalServerErrorException(
        `${error.message}`,
      );
    }

    const newCartItem = {
      ...rest,
      price_at_addition: productVar.product.final_price,
      quantity,
      product_variation: {
        connect: { id: id_product_variation },
      },
      cart: {
        connect: { id: id_cart },
      },
    };

    try {
      return await this.prisma.tb_cart_item.create({
        data: newCartItem,
      });
    } catch (error) {
      console.error(`Error creating a new Cart Item: ${error}`);
      throw new InternalServerErrorException(
        `Failed to create a new Cart Item! Error: ${error.message}`,
      );
    }
  }

  async updateCartItem(id: string, updateCartItemDto: UpdateCartItemDto) {
    try {
      return await this.prisma.tb_cart_item.update({
        where: {
          id,
        },
        data: updateCartItemDto,
      });
    } catch (error) {
      console.error(`Error while updating a Cart Item: ${error}`);
      throw new InternalServerErrorException(`Failed to update a Cart Item! Error: ${error.message}`);
    }
  }

  async softDeleteCartItem(id: string) {
    try {
      return await this.prisma.tb_cart_item.update({
        where: { id: id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      console.error(`Error soft-deleting a Cart Item: ${error}`);

      throw new InternalServerErrorException(
        `Failed to soft-delete a Cart Item! Error: ${error.message}`,
      );
    }
  }

  async deleteCartItem(id: string) {
    try {
      return await this.prisma.tb_cart_item.delete({ where: { id } });
    } catch (error) {
      console.error(`Error hard-deleting a Cart Item: ${error}`);
      throw new InternalServerErrorException(
        `Failed to hard-delete a Cart Item! Error: ${error.message}`,
      );
    }
  }
}
