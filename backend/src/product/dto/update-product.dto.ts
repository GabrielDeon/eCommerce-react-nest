import { IsOptional, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  image_1: string;

  @IsOptional()
  @IsString()
  image_2: string;

  @IsOptional()
  @IsString()
  image_3: string;

  @IsOptional()
  @IsString()
  image_4: string;
}
