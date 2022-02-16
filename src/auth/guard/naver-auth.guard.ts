import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      request.user = await this.authService.verifyToken(
        request.headers['access-token'],
      );
    } catch (error) {
      console.log(error.message);
      switch (error.message) {
        case 'jwt must be provided':
          throw new UnauthorizedException();
        case 'invalid token':
          throw new HttpException('Invalid Token', 401);
        case 'jwt expired':
          if (!request.headers['refresh-token'])
            throw new UnauthorizedException();
          request.user = this.authService.refreshAccessToken(
            request.headers['refresh-token'],
          );
        default:
          throw new HttpException('Unknown Error', 500);
      }
    }

    return request.user !== null;
  }
}
