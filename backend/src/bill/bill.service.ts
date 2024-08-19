import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Injectable()
export class BillService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllBills() {
    let bills;
    try {
      bills = await this.prisma.tb_bill.findMany({
        where: { deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching Bills:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching Bills.',
      );
    }

    if (bills.length === 0) {
      throw new NotFoundException('No Bill was found!');
    }

    return bills;
  }

  async findBillsByCartId(id_cart: string) {
    try {
      const bills = await this.prisma.tb_bill.findMany({
        where: { id_cart, deleted_at: null },
      });

      if (bills.length === 0) {
        throw new NotFoundException('No bills found for this product.');
      }

      return bills;
    } catch (error) {
      console.error('Error fetching bills by Cart ID:', error);
      throw new InternalServerErrorException(
        `An error occurred while fetching bills by Cart Id. Error: ${error.message}`,
      );
    }
  }

  async findBill(id: string) {
    let bill = null;

    try {
      bill = await this.prisma.tb_bill.findUnique({
        where: { id, deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching Bill:', error);
      throw new InternalServerErrorException(
        `An error occurred while fetching Bill. Error: ${error.message}`,
      );
    }

    if (bill === null) throw new NotFoundException('Bill not found!');

    return bill;
  }

  async createBill(billData: CreateBillDto) {
    const { id_cart, ...rest } = billData;

    try {
      if (id_cart) {
        await this.prisma.tb_cart.findFirstOrThrow({
          where: { id: id_cart },
        });
      }
    } catch (error) {
      console.error('Validation error on Bill creation:', error);
      throw new InternalServerErrorException(
        `Validation error on Bill creation. Error: ${error.message}`,
      );
    }

    const newBill = {
      ...rest,      
      cart: {
        connect: { id: id_cart },
      }      
    };

    try {
      return await this.prisma.tb_bill.create({
        data: newBill,
      });
    } catch (error) {
      console.error(`Error creating a new Bill: ${error}`);
      throw new InternalServerErrorException(
        `Failed to create a new Bill! Error: ${error.message}`,
      );
    }
  }

  async updateBill(id: string, updateBillDto: UpdateBillDto) {
    try {
      return await this.prisma.tb_bill.update({
        where: {
          id,
        },
        data: updateBillDto,
      });
    } catch (error) {
      console.error(`Error while updating a Bill: ${error.message}`);
      throw new InternalServerErrorException('Failed to update a Bill!');
    }
  }

  async softDeleteBill(id: string) {
    try {
      return await this.prisma.tb_bill.update({
        where: { id: id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      console.error(`Error soft-deleting a Bill: ${error.message}`);

      throw new InternalServerErrorException(
        `Failed to soft-delete a Bill! Error: ${error.message}`,
      );
    }
  }

  async deleteBill(id: string) {
    try {
      return await this.prisma.tb_bill.delete({ where: { id } });
    } catch (error) {
      console.error(`Error hard-deleting a Bill: ${error.message}`);
      throw new InternalServerErrorException(
        `Failed to hard-delete a Bill! Error: ${error.message}`,
      );
    }
  }
}
