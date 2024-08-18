import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { SizeModule } from './size/size.module';
import { ColorModule } from './color/color.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ProductVariationModule } from './product-variation/product-variation.module';
import { ReviewModule } from './review/review.module';


@Module({
  imports: [UserModule, PrismaModule, SizeModule, ColorModule, CategoryModule, ProductModule, ProductVariationModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
