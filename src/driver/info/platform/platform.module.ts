import { Module } from '@nestjs/common';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Platform } from './platform.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Platform])],
  controllers: [PlatformController],
  providers: [PlatformService],
  exports: [PlatformService],
})
export class PlatformModule {}
