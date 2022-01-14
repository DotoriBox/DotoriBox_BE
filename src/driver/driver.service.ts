import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverDto } from './driver.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async createDriver(driverDto: DriverDto) {
    return this.driverRepository.save(driverDto);
  }
}
