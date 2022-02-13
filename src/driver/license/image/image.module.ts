import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ImageController } from './image.controller';
import { LicenseImage } from './image.entity';
import { ImageService } from './image.service';

@Module({
  imports: [TypeOrmModule.forFeature([LicenseImage])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
