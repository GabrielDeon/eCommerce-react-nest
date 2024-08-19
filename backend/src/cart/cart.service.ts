import {  
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCarts(status?: 'ACTIVE' | 'CHECKEDOUT' | 'ABANDONED') {
    try {
      const whereCondition = {
        status: status || undefined, // Include status only if it's provided
        deleted_at: null,
      };
  
      const carts = await this.prisma.tb_cart.findMany({
        where: whereCondition,
      });
  
      if (carts.length === 0) {
        console.log("THE WARRRRRRRRRRRRRNING");     
        throw new NotFoundException('No Cart was found!');           
      }
  
      return carts;
    } catch (error) {
      console.error('Error fetching Carts:', error);
      throw new InternalServerErrorException(
        `Error: ${error.message}`
      );
    }
  }  

  async findCart(id: string) {
    let cart = null;

    try {
      cart = await this.prisma.tb_cart.findUnique({
        where: { id, deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching Cart:', error);
      throw new InternalServerErrorException(
        `An error occurred while fetching Cart. Error: ${error.message}`,
      );
    }

    if (cart === null) throw new NotFoundException('Cart not found!');

    return cart;
  }

  async findCartsByUserId(id_user: string) {
    let cart = null;

    try {
      cart = await this.prisma.tb_cart.findMany({
        where: { id_user, deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching Carts by Product Id:', error);
      throw new InternalServerErrorException(
        `An error occurred while fetching Carts by product Id. Error: ${error.message}`,
      );
    }

    if (cart.length === 0)
      throw new NotFoundException(
        `No Carts were found for the id_user: ${id_user}`,
      );

    return cart;
  }

  async createCart(cartData: CreateCartDto) {
    const { id_user, ...rest } = cartData;

    try {
      if (id_user) {
        await this.prisma.tb_user.findFirstOrThrow({
          where: { id: id_user },
        });
      }
    } catch (error) {
      console.error('Validation error while creating Cart:', error);
      throw new InternalServerErrorException(
        `Failed to validate id_user. Error: ${error.message}`,
      );
    }

    const newCart = {
      ...rest,
      user: {
        connect: { id: id_user },
      },
    };

    try {
      return await this.prisma.tb_cart.create({
        data: newCart,
      });
    } catch (error) {
      console.error(`Error creating a new Cart: ${error}`);
      throw new InternalServerErrorException(
        `Failed to create a new Cart! Error: ${error.message}`,
      );
    }
  }

  async updateCart(id: string, updateCartDto: UpdateCartDto) {
    try {
      return await this.prisma.tb_cart.update({
        where: {
          id,
        },
        data: updateCartDto,
      });
    } catch (error) {
      console.error(`Error while updating a Cart: ${error}`);
      throw new InternalServerErrorException(
        `Failed to update a Cart! Error: ${error.message}`,
      );
    }
  }

  async softDeleteCart(id: string) {
    try {
      return await this.prisma.tb_cart.update({
        where: { id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      console.error(`Error soft-deleting a Cart: ${error}`);

      throw new InternalServerErrorException(
        `Failed to soft-delete a Cart! Error: ${error.message}`,
      );
    }
  }

  async deleteCart(id: string) {
    try {
      return await this.prisma.tb_cart.delete({ where: { id } });
    } catch (error) {
      console.error(`Error hard-deleting a Cart: ${error.message}`);
      throw new InternalServerErrorException(
        `Failed to hard-delete a Cart! Error: ${error.message}`,
      );
    }
  }
}
