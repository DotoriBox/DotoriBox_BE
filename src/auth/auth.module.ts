import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { InfoModule } from '../driver/info/info.module';
import { TokenModule } from '../driver/token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverToken } from '../driver/token/token.entity';
import { DriverModule } from '../driver/driver.module';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([DriverToken]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    TokenModule,
    DriverModule,
    HttpModule,
    InfoModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
