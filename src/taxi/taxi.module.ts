import { Module } from '@nestjs/common';
import { TaxiController } from './taxi.controller';
import { TaxiService } from './taxi.service';

@Module({
  controllers: [TaxiController],
  providers: [TaxiService],
})
export class TaxiModule {}
