import {
  IsDate,
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
  quantity: number;

  @IsOptional()
  @IsDate()
  deleted_at: Date;
}
