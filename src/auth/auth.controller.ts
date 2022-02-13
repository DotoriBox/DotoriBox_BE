import {
  Controller,
  Get,
  Redirect,
  Req,
  Res,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { NaverAuthGuard } from './guard/naver-auth.guard';
import { AuthService } from './auth.service';
import { Cookies } from './decorators/cookie.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Redirect('http://localhost:3000/joinpage1', 301)
  @UseGuards(NaverAuthGuard)
  @Get('/callback')
  async authCallBack(@Req() req, @Res({ passthrough: true }) res) {
    res.cookie('refresh_token', req.user.refresh_token, {
      httpOnly: true,
    });

    return;
  }

  @UseGuards(NaverAuthGuard)
  @Get()
  async authCall() {
    return;
  }

  @Post('/refresh/access')
  async refreshAccessToken(@Cookies('refresh_token') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }
}
