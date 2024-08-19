import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get()
  findAllBills() {
    return this.billService.findAllBills();
  }
  
  @Get('/cart/:id')
  findBillsByCartId(@Param('id') id_cart: string) {    
    return this.billService.findBillsByCartId(id_cart);
  }
  
  @Get(':id')
  findBill(@Param('id') id: string) {
    return this.billService.findBill(id);
  }

  @Post()
  createBill(@Body(ValidationPipe) createBillDto: CreateBillDto) {
    return this.billService.createBill(createBillDto);
  }

  @Patch(':id')
  updateBill(@Param('id') id: string, @Body(ValidationPipe) updateBillDto: UpdateBillDto) {
    return this.billService.updateBill(id, updateBillDto);
  }

  @Patch(':id/soft-delete')
  softDeleteBill(@Param('id') id: string) {
    return this.billService.softDeleteBill(id);
  }

  @Delete(':id')
  deleteBill(@Param('id') id: string) {
    return this.billService.deleteBill(id);
  }
}


