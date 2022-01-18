import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverToken } from '../driver/token/token.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserInfoDto } from '../driver/info/info.dto';
import { v4 } from 'uuid';
import { TokenService } from '../driver/token/token.service';
import { userInfo } from 'os';
import { DriverDto } from '../driver/driver.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(DriverToken)
    private readonly driverTokenRepository: Repository<DriverToken>,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
  ) {}

  async createDriverToken(driverDto: DriverDto) {
    const payload = {
      id: driverDto.id,
      phoneNumber: driverDto.phoneNumber,
      uuid: v4(),
    };

    const refreshTokenPayload = {
      id: driverDto.id,
      phoneNumber: driverDto.phoneNumber,
      uuid: v4(),
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '30m',
    });

    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    });

    await this.tokenService.createToken(
      driverDto.id,
      accessToken,
      refreshToken,
    );

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async refreshAccessToken(token: string) {
    const info = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    const payload = {
      id: info.id,
      phoneNumber: info.phoneNumber,
      uuid: v4(),
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '30m',
    });

    await this.tokenService.updateAccessToken(info.id, accessToken);

    return { access_token: accessToken };
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
