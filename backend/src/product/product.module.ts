import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductVariationModule } from 'src/product-variation/product-variation.module';

@Module({
  imports: [PrismaModule, ProductVariationModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
