import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Get()
  findAllCartItems() {
    return this.cartItemService.findAllCartItems();
  }

  @Get('/cart/:id')
  findCartItemsByCartId(@Param('id') id_cart: string) {
    return this.cartItemService.findCartItemsByCartId(id_cart);
  }

  @Get(':id')
  findCartItem(@Param('id') id: string) {
    return this.cartItemService.findCartItem(id);
  }

  @Post()
  createCartItem(@Body(ValidationPipe) createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.createCartItem(createCartItemDto);
  }

  @Patch(':id')
  updateCartItem(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemService.updateCartItem(id, updateCartItemDto);
  }

  @Patch(':id/soft-delete')
  softDeleteCartItem(@Param('id') id: string) {
    return this.cartItemService.softDeleteCartItem(id);
  }

  @Delete(':id')
  deleteCartItem(@Param('id') id: string) {
    return this.cartItemService.deleteCartItem(id);
  }
}
