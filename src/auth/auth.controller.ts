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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Redirect('http://localhost:3000/joinpage1', 301)
  @UseGuards(NaverAuthGuard)
  @Get('/callback')
  async authCallBack(@Req() req, @Res() res) {
    res.cookie('refresh_token', req.user.refresh_token);
    res.cookie('id', req.user.id);
    return;
  }

  @UseGuards(NaverAuthGuard)
  @Get()
  async authCall() {
    return;
  }

  @Post('/refresh/access')
  async refreshAccessToken(@Body() token: { refresh_token: string }) {
    return this.authService.refreshAccessToken(token.refresh_token);
  }
}
