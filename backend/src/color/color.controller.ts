import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get()
  findAllColors() {
    return this.colorService.findAllColors();
  }

  @Get(':id')
  findColor(@Param('id') id: string) {
    return this.colorService.findColor(id);
  }

  @Post()
  createColor(@Body(ValidationPipe) createColorDto: CreateColorDto) {
    return this.colorService.createColor(createColorDto);
  }

  @Patch(':id')
  updateColor(@Param('id') id: string, @Body(ValidationPipe) updateColorDto: UpdateColorDto) {
    return this.colorService.updateColor(id, updateColorDto);
  }

  @Patch(':id/soft-delete')
  softDeleteColor(@Param('id') id: string) {
    return this.colorService.softDeleteColor(id);
  }

  @Delete(':id')
  deleteColor(@Param('id') id: string) {
    return this.colorService.deleteColor(id);
  }
}
