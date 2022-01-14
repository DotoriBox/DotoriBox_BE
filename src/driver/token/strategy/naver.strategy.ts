import { Strategy } from 'passport-naver';
import { PassportStrategy } from '@nestjs/passport';
import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InfoService } from '../../info/info.service';
import { TokenService } from '../token.service';
import { TaxiService } from '../../taxi/taxi.service';
import { DriverService } from '../../driver.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { response } from 'express';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly infoService: InfoService,
    private readonly tokenService: TokenService,
    private readonly driverService: DriverService,
    private readonly httpService: HttpService,
  ) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const name = profile._json.name;

    let user = await this.infoService.getDriverInfoByDto({ name });

    if (!user) {
      const info = await firstValueFrom(
        this.httpService.get('https://openapi.naver.com/v1/nid/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );

      const { mobile, name } = info.data.response;
      const taxi = await this.driverService.createDriver({});
      user = await this.infoService.createDriverInfo({
        phoneNumber: mobile,
        name,
        driverId: taxi.id,
      });

      console.log(user);
    }

    const access_token = await this.tokenService.createDriverToken(
      { driverId: user.driverId, phoneNumber: user.phoneNumber },
      refreshToken,
    );
    const refresh_token = await this.tokenService.refreshDriverToken(
      { driverId: user.driverId, phoneNumber: user.phoneNumber },
      refreshToken,
    );

    return {
      access_token,
      refresh_token,
      type: 'login',
    };
  }
}
