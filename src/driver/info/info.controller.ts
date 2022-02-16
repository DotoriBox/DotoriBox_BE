import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InfoService } from './info.service';
import { CreateUserInfoDto, UpdateUserInfoDto } from './info.dto';
import { AuthGuard } from '../../auth/guard/naver-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Role } from '../../auth/enums/role.enum';
import { Roles } from '../../auth/decorators/role.decorator';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createUserInfo(@Body() infoDto: CreateUserInfoDto, @Req() request) {
    return this.infoService.createDriverInfo({
      ...infoDto,
      driverId: request.user.id,
    });
  }

  @Get(':driverId')
  @Roles(Role.Driver)
  @UseGuards(AuthGuard)
  async getUserInfoById(@Param('driverId') id: number) {
    return this.infoService.getDriverInfoById(id);
  }

  @Get(':driverId/exist')
  @UseGuards(AuthGuard)
  async isUserInfoExist(@Param('driverId') id: number) {
    return (await (
      await this.infoService.getDriverInfoIsExistById(id)
    ).length) !== 0
      ? { isExist: true }
      : { isExist: false };
  }
}
