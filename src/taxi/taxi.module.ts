import { Module } from '@nestjs/common';
import { TaxiController } from './taxi.controller';
import { TaxiService } from './taxi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taxi } from './entity/taxi.entity';
import { Driver } from './entity/driver.entity';
import { StockModule } from '../stock/stock.module';
import { SampleService } from '../sample/sample.service';
import { Sample } from '../sample/entity/sample.entity';
import { SampleInfo } from '../sample/entity/sampleInfo.entity';
import { SampleTargetTime } from '../sample/entity/sampleTargetTime.entity';
import { SampleTarget } from '../sample/entity/sampleTarget.entity';
import { SampleStock } from '../sample/entity/sampleStock.entity';
import { Stock } from '../stock/stock.entity';
import { DriverLicense } from './entity/driver.license.entity';
import { DriverTaxiLicense } from './entity/driver.taxiLicense.entity';
import { TaxiPlatform } from './entity/taxi.platform.entity';
import { TaxiPlatformController } from './taxi.platform.controller';
import { DriverToken } from './entity/driver.token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Taxi,
      TaxiPlatform,
      Driver,
      DriverLicense,
      DriverTaxiLicense,
      Sample,
      Stock,
      SampleInfo,
      SampleStock,
      SampleTarget,
      SampleTargetTime,
      DriverToken,
    ]),
    StockModule,
  ],
  controllers: [TaxiController, TaxiPlatformController],
  providers: [TaxiService, SampleService],
})
export class TaxiModule {}
