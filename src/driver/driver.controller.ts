import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getDriver(@Param('id') id: number) {
    return this.driverService.getDriver({ id });
  }
}
