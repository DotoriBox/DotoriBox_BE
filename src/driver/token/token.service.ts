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
  ) {}
  async createToken(id: number, accessToken: string, refreshToken: string) {
    const check = await this.driverTokenRepository.findOne({ driverId: id });
    if (check) return check;
    return this.driverTokenRepository.save({
      driverId: id,
      accessToken,
      refreshToken,
    });
  }

  async updateAccessToken(id: number, accessToken: string) {
    return this.driverTokenRepository.update(
      {
        driverId: id,
      },
      {
        accessToken,
      },
    );
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    return this.driverTokenRepository.update(
      {
        driverId: id,
      },
      {
        refreshToken,
      },
    );
  }

  async getToken(id: number) {
    return this.driverTokenRepository.findOne({ driverId: id });
  }
}
