import { CreateProductVariationDto } from './create-product-variation.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProductVariationDto extends PartialType(
  CreateProductVariationDto,
) {}
