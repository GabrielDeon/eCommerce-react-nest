import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAllProducts(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 16,
    @Query('filter') filter: string = 'none',
    @Query('sortOrder') sortOrder: string = 'asc',
    @Query('categoryId') categoryId: string = 'none',
  ) {
    return this.productService.findAllProducts(
      page,
      perPage,
      filter,
      sortOrder,
      categoryId,
    );
  }

  @Get(':id')
  findProduct(@Param('id') id: string) {
    return this.productService.findProduct(id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 4))
  createProduct(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
    @UploadedFiles() productImages: Array<Express.Multer.File>,
  ) {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    for (const file of productImages) {
      if (!allowedImageTypes.includes(file.mimetype)) {
        throw new BadRequestException(`Invalid file type: ${file.mimetype}`);
      }
    }

    return this.productService.createBaseProduct(
      createProductDto,
      productImages,
    );
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body()
    productUpdate: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, productUpdate);
  }

  @Patch(':id/soft-delete')
  softDeleteProduct(@Param('id') id: string) {
    return this.productService.softDeleteProduct(id);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
