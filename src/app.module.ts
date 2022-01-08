import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaxiModule } from './taxi/taxi.module';
import { Taxi } from './taxi/entity/taxi.entity';
import { CustomerModule } from './customer/customer.module';
import { StockModule } from './stock/stock.module';
import { SampleModule } from './sample/sample.module';
import { Customer } from './customer/customer.entity';
import { Sample } from './sample/entity/sample.entity';
import { SampleInfo } from './sample/entity/sampleInfo.entity';
import { SampleStock } from './sample/entity/sampleStock.entity';
import { Stock } from './stock/stock.entity';
import { Driver } from './taxi/entity/driver.entity';
import { SampleTarget } from './sample/entity/sampleTarget.entity';
import { SampleTargetTime } from './sample/entity/sampleTargetTime.entity';
import { DriverLicense } from './taxi/entity/driver.license.entity';
import { DriverTaxiLicense } from './taxi/entity/driver.taxiLicense.entity';

import { multerOptions } from './lib/multerOptions';
import { TaxiPlatform } from './taxi/entity/taxi.platform.entity';
import { DriverToken } from './taxi/entity/driver.token.entity';

@Module({
  imports: [
    TaxiModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: 3306,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [
        Taxi,
        TaxiPlatform,
        Driver,
        DriverLicense,
        DriverTaxiLicense,
        Customer,
        Sample,
        SampleInfo,
        SampleStock,
        SampleTarget,
        SampleTargetTime,
        Stock,
        DriverToken,
      ],
      synchronize: true,
      migrationsRun: false,
      timezone: 'Z',
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    }),
    CustomerModule,
    StockModule,
    SampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
