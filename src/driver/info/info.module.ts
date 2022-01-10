import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverInfo } from './info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DriverInfo])],
  providers: [InfoService],
  exports: [InfoService],
})
export class InfoModule {}
