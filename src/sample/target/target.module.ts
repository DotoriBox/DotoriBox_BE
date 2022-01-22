import { Module } from '@nestjs/common';
import { TimeModule } from './time/time.module';
import { TargetController } from './target.controller';
import { SampleTargetService } from './target.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleTarget } from './target.entity';

@Module({
  imports: [TimeModule, TypeOrmModule.forFeature([SampleTarget])],
  controllers: [TargetController],
  providers: [SampleTargetService],
})
export class TargetModule {}
