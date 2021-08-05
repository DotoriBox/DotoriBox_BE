import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaxiModule } from './taxi/taxi.module';
import { Taxi } from './taxi/entity/taxi.entity';
import { CustomerModule } from './customer/customer.module';
import { StockModule } from './stock/stock.module';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [
    TaxiModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Taxi],
      synchronize: true,
    }),
    CustomerModule,
    StockModule,
    SampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
