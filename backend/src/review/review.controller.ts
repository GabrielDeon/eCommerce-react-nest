import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  findAllReviews() {
    return this.reviewService.findAllReviews();
  }

  
  @Get('/product/:id')
  findReviewsByProductId(@Param('id') id_product: string) {
    return this.reviewService.findReviewsByProductId(id_product);
  }

  
  @Get(':id')
  findReview(@Param('id') id: string) {
    return this.reviewService.findReview(id);
  }

  @Post()
  createReview(@Body(ValidationPipe) createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }

  @Patch(':id')
  updateReview(@Param('id') id: string, @Body(ValidationPipe) updateReviewDto: UpdateReviewDto) {
    return this.reviewService.updateReview(id, updateReviewDto);
  }

  @Patch(':id/soft-delete')
  softDeleteReview(@Param('id') id: string) {
    return this.reviewService.softDeleteReview(id);
  }

  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    return this.reviewService.deleteReview(id);
  }
}
