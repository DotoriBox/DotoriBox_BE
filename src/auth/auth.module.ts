import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NaverStrategy } from './strategy/naver.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { InfoModule } from '../driver/info/info.module';
import { TokenModule } from '../driver/token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverToken } from '../driver/token/token.entity';
import { DriverModule } from '../driver/driver.module';
import { HttpModule } from '@nestjs/axios';
import { JwtStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([DriverToken]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    TokenModule,
    DriverModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, NaverStrategy, JwtStrategy],
})
export class AuthModule {}
