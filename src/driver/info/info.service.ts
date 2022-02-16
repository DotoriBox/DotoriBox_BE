import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverInfo } from './info.entity';
import { Repository } from 'typeorm';
import { CreateUserInfoDto, UpdateUserInfoDto } from './info.dto';
import { userInfo } from 'os';

@Injectable()
export class InfoService {
  constructor(
    @InjectRepository(DriverInfo)
    private readonly driverInfoRepository: Repository<DriverInfo>,
  ) {}

  async createDriverInfo(userInfoDto: CreateUserInfoDto) {
    return this.driverInfoRepository.save(userInfoDto);
  }

  async updateDriverInfo(userInfoId: number, userInfoDto: UpdateUserInfoDto) {
    return this.driverInfoRepository.update({ id: userInfoId }, userInfoDto);
  }

  async removeDriverInfo(userInfoId: number) {
    return this.driverInfoRepository.update(
      { id: userInfoId },
      { isDeleted: true },
    );
  }

  async getDriverInfoById(id: number) {
    return this.driverInfoRepository.findOne(
      { driverId: id },
      { relations: ['platform', 'driver', 'driver.taxi'] },
    );
  }

  async getDriverInfoIsExistById(id: number) {
    return this.driverInfoRepository.find({ driverId: id });
  }

  async getDriverInfoByDto(userInfoDto: UpdateUserInfoDto) {
    return this.driverInfoRepository.findOne(userInfoDto);
  }

  async getDriverInfoAll() {
    return this.driverInfoRepository.find();
  }
}
