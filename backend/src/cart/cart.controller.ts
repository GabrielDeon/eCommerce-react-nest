import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  findAllCarts(
    @Query('status') status?: 'ACTIVE' | 'CHECKEDOUT' | 'ABANDONED',
  ) {
    return this.cartService.findAllCarts(status);
  }

  @Get(':id')
  findCart(@Param('id') id: string) {
    return this.cartService.findCart(id);
  }

  @Get('/user/:id')
  findCartsByUserId(@Param('id') id_user: string) {
    return this.cartService.findCartsByUserId(id_user);
  }

  @Post()
  createCart(@Body(ValidationPipe) createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  @Patch(':id')
  updateCart(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.updateCart(id, updateCartDto);
  }

  @Patch(':id/soft-delete')
  softDeleteCart(@Param('id') id: string) {
    return this.cartService.softDeleteCart(id);
  }

  @Delete(':id')
  deleteCart(@Param('id') id: string) {
    return this.cartService.deleteCart(id);
  }
}
