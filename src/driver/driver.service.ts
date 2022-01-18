import { ConflictException, Injectable } from '@nestjs/common';
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
    const driver = await this.driverRepository.findOne(driverDto);
    if (driver) throw new ConflictException();

    return this.driverRepository.save(driverDto);
  }

  async getDriver(driverDto: DriverDto) {
    return this.driverRepository.findOne(driverDto);
  }
}
