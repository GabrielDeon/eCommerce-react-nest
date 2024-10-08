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
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { BillModule } from './bill/bill.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    SizeModule,
    ColorModule,
    CategoryModule,
    ProductModule,
    ProductVariationModule,
    ReviewModule,
    CartModule,
    CartItemModule,
    BillModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','..', 'Products', 'Images'),
      serveRoot: '/product-image',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
