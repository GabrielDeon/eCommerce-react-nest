import { Decimal } from '@prisma/client/runtime/library';
import {
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductVariationDto {
  @IsNotEmpty()
  @IsString()
  id_product: string;

  @IsOptional()
  @IsString()
  id_size: string;

  @IsOptional()
  @IsString()
  id_color: string;

  @IsNumber()
  stock: number;

  @IsOptional()
  @IsDate()
  deleted_at?: Date;

  @IsDecimal()
  @IsNotEmpty()
  base_price: Decimal;

  @IsDecimal()
  @IsOptional()
  discount_percentage: number;
}
