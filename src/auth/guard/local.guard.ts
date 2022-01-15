import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InfoService } from '../../driver/info/info.service';
import { DriverService } from '../../driver/driver.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly infoService: InfoService,
    private readonly driverService: DriverService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { access_token, refresh_token } = request.headers;

    if (!access_token)
      throw new HttpException('Token is undefined', HttpStatus.UNAUTHORIZED);

    const token = await this.validateToken(access_token, refresh_token);
    if (token.access_token)
      response.setHeader('access_token', token.access_token);
    request.user = token.access_token
      ? this.authService.verifyToken(token.access_token)
      : token;
    return true;
  }

  async validateToken(accessToken: string, refreshToken: string) {
    try {
      return this.authService.verifyToken(accessToken);
    } catch (e) {
      switch (e.message) {
        case 'invalid token':
          throw new HttpException('Invalid Token', 401);
        case 'jwt expired':
          return this.authService.refreshAccessToken(refreshToken);
        default:
          throw new HttpException('Unknown Error', 500);
      }
    }
  }
}
