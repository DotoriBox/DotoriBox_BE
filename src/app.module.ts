import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { StockModule } from './stock/stock.module';
import { SampleModule } from './sample/sample.module';
import { Customer } from './customer/customer.entity';
import { Sample } from './sample/sample.entity';
import { SampleInfo } from './sample/info/info.entity';
import { SampleStock } from './sample/stock/stock.entity';
import { Stock } from './stock/stock.entity';
import { SampleTarget } from './sample/target/target.entity';
import { SampleTargetTime } from './sample/target/time/time.entity';

import { DriverModule } from './driver/driver.module';
import { DrivingLicense } from './driver/license/driving/driving.entity';
import { TaxiLicense } from './driver/license/taxi/taxi.entity';
import { Driver } from './driver/driver.entity';
import { DriverToken } from './driver/token/token.entity';
import { DriverInfo } from './driver/info/info.entity';
import { Taxi } from './driver/taxi/taxi.entity';
import { Platform } from './driver/info/platform/platform.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [
        Driver,
        Customer,
        Sample,
        SampleInfo,
        SampleStock,
        SampleTarget,
        SampleTargetTime,
        Stock,
        DriverToken,
        DrivingLicense,
        TaxiLicense,
        DriverInfo,
        Taxi,
        Platform,
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
    DriverModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
