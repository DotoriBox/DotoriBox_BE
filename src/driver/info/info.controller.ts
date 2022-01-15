import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InfoService } from './info.service';
import { CreateUserInfoDto, UpdateUserInfoDto } from './info.dto';
import { NaverAuthGuard } from '../../auth/guard/naver-auth.guard';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post()
  async createUserInfo(@Body() infoDto: CreateUserInfoDto) {
    return this.infoService.createDriverInfo(infoDto);
  }

  @UseGuards(NaverAuthGuard)
  @Get(':id')
  async getUserInfoById(@Param('id') id: number) {
    return this.infoService.getDriverInfoById(id);
  }

  @Get()
  async getUserInfo(@Body() userDto: UpdateUserInfoDto) {
    if (userDto) return this.infoService.getDriverInfoByDto(userDto);
    return this.infoService.getDriverInfoAll();
  }
}
