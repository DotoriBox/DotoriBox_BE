import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrivingLicense } from './driving.entity';
import { Repository } from 'typeorm';
import { DrivingLicenseDto } from './driving.dto';

@Injectable()
export class DrivingService {
  constructor(
    @InjectRepository(DrivingLicense)
    private readonly DrivingLicenseRepository: Repository<DrivingLicense>,
  ) {}

  async getDrivingLicense() {
    return this.DrivingLicenseRepository.find();
  }

  async getDrivingLicenseById(id: number) {
    return this.DrivingLicenseRepository.findOne({ id });
  }

  async createDrivingLicense(DrivingLicenseDto: DrivingLicenseDto) {
    const DrivingLicense = await this.DrivingLicenseRepository.findOne(
      DrivingLicenseDto,
    );

    if (DrivingLicense) throw new ConflictException();

    return this.DrivingLicenseRepository.save(DrivingLicenseDto);
  }

  async updateDrivingLicense(id: number, DrivingLicenseDto: DrivingLicenseDto) {
    const DrivingLicense = await this.DrivingLicenseRepository.findOne(
      DrivingLicenseDto,
    );

    if (!DrivingLicense) throw new NotFoundException();

    return this.DrivingLicenseRepository.update({ id }, DrivingLicenseDto);
  }
}
