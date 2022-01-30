import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { InfoService } from './info.service';
import { CreateUserInfoDto, UpdateUserInfoDto } from './info.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Role } from '../../auth/enums/role.enum';
import { Roles } from '../../auth/decorators/role.decorator';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createUserInfo(@Body() infoDto: CreateUserInfoDto) {
    return this.infoService.createDriverInfo(infoDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUserInfoById(@Param('id') id: number) {
    return this.infoService.getDriverInfoById(id);
  }
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getUserInfo(@Body() userDto?: UpdateUserInfoDto) {
    if (userDto) return this.infoService.getDriverInfoByDto(userDto);
    return this.infoService.getDriverInfoAll();
  }
}