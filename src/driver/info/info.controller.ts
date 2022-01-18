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
import { JwtAuthGuard } from '../../auth/guard/local.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createUserInfo(@Body() infoDto: CreateUserInfoDto) {
    return this.infoService.createDriverInfo(infoDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUserInfoById(@Param('id') id: number) {
    return this.infoService.getDriverInfoById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserInfo(@Body() userDto: UpdateUserInfoDto) {
    if (userDto) return this.infoService.getDriverInfoByDto(userDto);
    return this.infoService.getDriverInfoAll();
  }
}
