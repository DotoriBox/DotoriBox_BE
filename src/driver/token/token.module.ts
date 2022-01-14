import { forwardRef, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverToken } from './token.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { NaverStrategy } from './strategy/naver.strategy';
import { InfoModule } from '../info/info.module';
import { DriverModule } from '../driver.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([DriverToken]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    InfoModule,
    forwardRef(() => DriverModule),
    HttpModule,
  ],
  providers: [TokenService, NaverStrategy],
  controllers: [TokenController],
  exports: [TokenService],
})
export class TokenModule {}
