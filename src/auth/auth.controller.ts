import {
  Controller,
  Get,
  Redirect,
  Req,
  Res,
  UseGuards,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Cookies } from './decorators/cookie.decorator';
import { HttpService } from '@nestjs/axios';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
  ) {}

  @Get('/')
  async authCallBack(@Query('token') code: string) {
    return this.authService.createUserInfo(code);
  }

  @Post('/refresh/access')
  async refreshAccessToken(@Cookies('refresh_token') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }
}
