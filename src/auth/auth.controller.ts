import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { NaverAuthGuard } from './guard/naver-auth.guard';
import { JwtAuthGuard } from './guard/local.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(NaverAuthGuard)
  @Get('/callback')
  async authCallBack(@Req() req) {
    return req.user;
  }

  @UseGuards(NaverAuthGuard)
  @Get()
  async authCall() {
    return 'Login';
  }
}
