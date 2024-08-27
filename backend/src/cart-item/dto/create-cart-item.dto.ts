import { Decimal } from '@prisma/client/runtime/library';
import { IsDate, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCartItemDto {
  @IsString()
  @IsNotEmpty()
  id_cart: string;

  @IsString()
  @IsNotEmpty()
  id_product_variation: string;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;  

  @IsOptional()
  @IsDate()
  deleted_at: Date;  

  @IsOptional()
  @IsDecimal()
  price_at_addition: Decimal;

  
  
}
