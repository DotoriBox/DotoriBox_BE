import { Strategy } from 'passport-naver';
import { PassportStrategy } from '@nestjs/passport';
import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../../driver/token/token.service';
import { DriverService } from '../../driver/driver.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly driverService: DriverService,
    private readonly httpService: HttpService,
    private readonly tokenService: TokenService,
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

    const Tokens = await this.authService.createDriverToken({
      id: user.id,
      phoneNumber: user.phoneNumber,
    });

    await this.tokenService.createToken(
      user.id,
      Tokens.access_token,
      Tokens.refresh_token,
    );

    return {
      ...Tokens,
      type: 'login',
    };
  }
}
