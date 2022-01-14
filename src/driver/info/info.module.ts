import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverInfo } from './info.entity';
import { InfoController } from './info.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DriverInfo])],
  providers: [InfoService],
  exports: [InfoService],
  controllers: [InfoController],
})
export class InfoModule {}
