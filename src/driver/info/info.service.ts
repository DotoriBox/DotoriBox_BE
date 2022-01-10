import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverInfo } from './info.entity';
import { Repository } from 'typeorm';
import { CreateUserInfoDto, UpdateUserInfoDto } from './info.dto';

@Injectable()
export class InfoService {
  constructor(
    @InjectRepository(DriverInfo)
    private readonly driverInfoRepository: Repository<DriverInfo>,
  ) {}

  async createDriverInfo(userInfoDto: CreateUserInfoDto) {
    await this.driverInfoRepository.save(userInfoDto);
  }

  async updateDriverInfo(userInfoId: number, userInfoDto: UpdateUserInfoDto) {
    await this.driverInfoRepository.update({ id: userInfoId }, userInfoDto);
  }

  async removeDriverInfo(userInfoId: number) {
    await this.driverInfoRepository.update(
      { id: userInfoId },
      { isDeleted: true },
    );
  }
}
