import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthGuard } from 'src/auth/guard/naver-auth.guard';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get(':driverId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Driver)
  async getDriver(@Param('driverId') id: number) {
    return this.driverService.getDriver({ id });
  }
}
