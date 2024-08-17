import { Controller, Delete, Get, Param, Patch, Post, ValidationPipe, Body} from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Get()
  findAllSizes() {
    return this.sizeService.findAllSizes();
  }

  @Get(':id')
  findSize(@Param('id') id: string) {
    return this.sizeService.findSize(id);
  }

  @Post()
  createSize(@Body(ValidationPipe) createSizeDto: CreateSizeDto) {
    return this.sizeService.createSize(createSizeDto);
  }

  @Patch(':id')
  updateSize(@Param('id') id: string, @Body(ValidationPipe) updateSizeDto: UpdateSizeDto) {
    return this.sizeService.updateSize(id, updateSizeDto);
  }

  @Patch(':id/soft-delete')
  softDeleteSize(@Param('id') id: string) {
    return this.sizeService.softDeleteSize(id);
  }

  @Delete(':id')
  deleteSize(@Param('id') id: string) {
    return this.sizeService.deleteSize(id);
  }
}
