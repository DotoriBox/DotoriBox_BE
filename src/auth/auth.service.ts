import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverToken } from '../driver/token/token.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { v4 } from 'uuid';
import { TokenService } from '../driver/token/token.service';
import { DriverDto } from '../driver/driver.dto';
import { InfoService } from '../driver/info/info.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DriverService } from 'src/driver/driver.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
    private readonly infoService: InfoService,
    private readonly httpService: HttpService,
    private readonly driverService: DriverService,
  ) {}

  async createUserInfo(accessToken: string) {
    if (!accessToken) throw new HttpException('Invalid Code', 404);

    const info = await firstValueFrom(
      this.httpService.get('https://openapi.naver.com/v1/nid/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    const { mobile, name } = info.data.response;

    let user = await this.driverService.getDriver({
      phoneNumber: mobile,
      name,
    });

    if (!user || !info) {
      user = await this.driverService.createDriver({
        phoneNumber: mobile,
        name,
      });
    }

    const Tokens = await this.createDriverToken({
      id: user.id,
      phoneNumber: user.phoneNumber,
      role: 'driver',
    });

    await this.tokenService.createToken(
      user.id,
      Tokens.access_token,
      Tokens.refresh_token,
    );

    return {
      ...Tokens,
      id: user.id,
      type: 'login',
    };
  }

  async createDriverToken(driverDto: DriverDto) {
    const payload = {
      id: driverDto.id,
      phoneNumber: driverDto.phoneNumber,
      uuid: v4(),
      role: driverDto.role,
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

    const user = await this.infoService.getDriverInfoById(info.id);

    const payload = {
      id: info.id,
      phoneNumber: info.phoneNumber,
      uuid: v4(),
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '30m',
    });

    await this.tokenService.updateAccessToken(info.id, accessToken);

    return { access_token: accessToken, id: info.id };
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
