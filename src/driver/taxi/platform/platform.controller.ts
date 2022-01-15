import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { PlatformDto } from './platform.dto';
import { PlatformService } from './platform.service';

@Controller('platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Post()
  async createPlatform(@Body() platformDto: PlatformDto) {
    return this.platformService.createPlatform(platformDto);
  }

  @Get(':id')
  async getPlatformById(@Param('id') id: number) {
    return this.platformService.getPlatformById(id);
  }
}
