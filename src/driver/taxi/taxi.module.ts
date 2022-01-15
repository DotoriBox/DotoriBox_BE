import { forwardRef, Module } from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { TaxiController } from './taxi.controller';
import { PlatformModule } from './platform/platform.module';
import { Taxi } from './taxi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from '../token/token.module';
import { DriverModule } from '../driver.module';

@Module({
  imports: [PlatformModule, TypeOrmModule.forFeature([Taxi])],
  providers: [TaxiService],
  controllers: [TaxiController],
  exports: [TaxiService],
})
export class TaxiModule {}
