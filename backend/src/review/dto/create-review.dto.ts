import { Decimal } from '@prisma/client/runtime/library';
import { IsDate, IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  id_user: string;

  @IsString()
  @IsNotEmpty()
  id_product: string;

  @IsDecimal()
  @IsNotEmpty()
  rating: Decimal;

  @IsString()
  @IsOptional()
  review_text: string;

  @IsOptional()
  @IsDate()
  deleted_at: Date;
}
