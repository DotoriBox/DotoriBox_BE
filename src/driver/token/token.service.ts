import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverToken } from './token.entity';
import { Repository } from 'typeorm';
import { DriverTokenDto } from './token.dto';
import CryptoJS from 'crypto-js';
import { CreateUserInfoDto, UpdateUserInfoDto } from '../info/info.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(DriverToken)
    private readonly driverTokenRepository: Repository<DriverToken>,
    private readonly jwtService: JwtService,
  ) {}

  async createDriverToken(
    userInfoDto: UpdateUserInfoDto,
    refreshToken: string,
  ) {
    const payload = {
      id: userInfoDto.driverId,
      phoneNumber: userInfoDto.phoneNumber,
      refreshToken: refreshToken,
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '30m',
    });
  }

  async refreshDriverToken(
    userInfoDto: UpdateUserInfoDto,
    refreshToken: string,
  ) {
    const payload = {
      id: userInfoDto.driverId,
      phoneNumber: userInfoDto.phoneNumber,
      refreshToken: refreshToken,
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '14d',
    });
  }
}
