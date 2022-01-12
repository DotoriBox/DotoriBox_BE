import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DriverToken } from "./token.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DriverToken])],
  providers: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
