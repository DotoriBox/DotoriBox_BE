import { Module } from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { TaxiController } from './taxi.controller';

@Module({
  providers: [TaxiService],
  controllers: [TaxiController]
})
export class TaxiModule {}
