import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { SizeModule } from './size/size.module';
import { ColorModule } from './color/color.module';


@Module({
  imports: [UserModule, PrismaModule, SizeModule, ColorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
