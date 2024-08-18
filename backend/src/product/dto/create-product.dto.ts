import { Decimal } from '@prisma/client/runtime/library';
import { IsDate, IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  id_category: string;

  @IsString()
  @IsNotEmpty()
  product_name: string;

  @IsString()
  @IsNotEmpty()
  short_description: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDecimal()
  @IsNotEmpty()
  base_price: Decimal;

  @IsDecimal()
  @IsOptional()
  discount_percentage: number;  

  @IsString()
  @IsNotEmpty()
  tags: string;  

  @IsOptional()
  @IsDate()
  deleted_at: Date;  
}
