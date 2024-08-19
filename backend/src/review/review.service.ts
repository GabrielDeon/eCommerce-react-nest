import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllReviews() {
    let reviews;
    try {
      reviews = await this.prisma.tb_review.findMany({
        where: { deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching Reviews:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching Reviews.',
      );
    }

    if (reviews.length === 0) {
      throw new NotFoundException('No Review was found!');
    }

    return reviews;
  }

  async findReview(id: string) {
    let review = null;

    try {
      review = await this.prisma.tb_review.findUnique({
        where: { id, deleted_at: null },
      });
    } catch (error) {
      console.error('Error fetching Review:', error);
      throw new InternalServerErrorException(
        `An error occurred while fetching Review. Error: ${error.message}`,
      );
    }

    if (review === null) throw new NotFoundException('Review not found!');

    return review;
  }

  async findReviewsByProductId(id_product: string) {
    try {
      const reviews = await this.prisma.tb_review.findMany({
        where: { id_product, deleted_at: null },
      });

      if (reviews.length === 0) {
        throw new NotFoundException('No reviews found for this product.');
      }

      return reviews;
    } catch (error) {
      console.error('Error fetching reviews by Product ID:', error);
      throw new InternalServerErrorException(
        `An error occurred while fetching reviews. Error: ${error.message}`,
      );
    }
  }

  async createReview(reviewData: CreateReviewDto) {
    const { id_product, id_user, rating, ...rest } = reviewData;

    try {
      if (id_product) {
        await this.prisma.tb_product.findFirstOrThrow({
          where: { id: id_product },
        });
      }

      if (id_user) {
        await this.prisma.tb_user.findFirstOrThrow({
          where: { id: id_user },
        });
      }

      const validRatings = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

      if (!validRatings.includes(Number(rating))) {
        throw new InternalServerErrorException(
          `Rating must be a valid number, ex: 1, 1.5, 2...;  Number: ${rating}`,
        );
      }
    } catch (error) {
      console.error('Validation error on createProductVariation:', error);
      throw new InternalServerErrorException(
        `Failed to validate data. Error: ${error.message}`,
      );
    }

    const newReview = {
      ...rest,
      rating,
      product: {
        connect: { id: id_product },
      },
      user: {
        connect: { id: id_user },
      },
    };

    try {
      return await this.prisma.tb_review.create({
        data: newReview,
      });
    } catch (error) {
      console.error(`Error creating a new Review: ${error}`);
      throw new InternalServerErrorException(
        `Failed to create a new Review! Error: ${error.message}`,
      );
    }
  }

  async updateReview(id: string, updateReviewDto: UpdateReviewDto) {
    try {
      return await this.prisma.tb_review.update({
        where: {
          id,
        },
        data: updateReviewDto,
      });
    } catch (error) {
      console.error(`Error while updating a Review: ${error.message}`);
      throw new InternalServerErrorException('Failed to update a Review!');
    }
  }

  async softDeleteReview(id: string) {
    try {
      return await this.prisma.tb_review.update({
        where: { id: id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      console.error(`Error soft-deleting a Review: ${error.message}`);

      throw new InternalServerErrorException(
        `Failed to soft-delete a Review! Error: ${error.message}`,
      );
    }
  }

  async deleteReview(id: string) {
    try {
      return await this.prisma.tb_review.delete({ where: { id } });
    } catch (error) {
      console.error(`Error hard-deleting a Review: ${error.message}`);
      throw new InternalServerErrorException(
        `Failed to hard-delete a Review! Error: ${error.message}`,
      );
    }
  }
}
