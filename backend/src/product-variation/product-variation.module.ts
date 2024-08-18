import { Module } from '@nestjs/common';
import { ProductVariationController } from './product-variation.controller';
import { ProductVariationService } from './product-variation.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductVariationController],
  providers: [ProductVariationService]
})
export class ProductVariationModule {}
