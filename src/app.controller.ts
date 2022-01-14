import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UseGuards } from '@nestjs/common';
import { NaverAuthGuard } from './driver/token/guard/naver-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(NaverAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
