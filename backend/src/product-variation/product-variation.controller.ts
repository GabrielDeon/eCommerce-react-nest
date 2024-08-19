import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ProductVariationService } from './product-variation.service';
import { CreateProductVariationDto } from './dto/create-product-variation.dto';
import { UpdateProductVariationDto } from './dto/update-product-variation.dto';

@Controller('product-variation')
export class ProductVariationController {
  constructor(
    private readonly productVariationService: ProductVariationService,
  ) {}

  @Get()
  findAllProductVariations() {
    return this.productVariationService.findAllProductVariations();
  }

  @Get('/product/:id')
  findProductVariationByProductId(@Param('id') id_product: string) {
    return this.productVariationService.findProductVariationsByProductId(id_product);
  }

  @Get(':id')
  findProductVariation(@Param('id') id: string) {
    return this.productVariationService.findProductVariation(id);
  }  

  @Post()
  createProductVariation(@Body(ValidationPipe) createProductVariationDto: CreateProductVariationDto) {
    return this.productVariationService.createProductVariation(createProductVariationDto);
  }

  @Patch(':id')
  updateProductVariation(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProductVariationDto: UpdateProductVariationDto,
  ) {
    return this.productVariationService.updateProductVariation(id, updateProductVariationDto);
  }

  @Patch(':id/soft-delete')
  softDeleteProductVariation(@Param('id') id: string) {
    return this.productVariationService.softDeleteProductVariation(id);
  }

  @Delete(':id')
  deleteProductVariation(@Param('id') id: string) {
    return this.productVariationService.deleteProductVariation(id);
  }
}
