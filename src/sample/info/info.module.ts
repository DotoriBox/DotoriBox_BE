import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleInfo } from './info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SampleInfo])],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
