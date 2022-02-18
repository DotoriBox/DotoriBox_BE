import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LicenseImage } from './image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(LicenseImage)
    private readonly imageRepository: Repository<LicenseImage>,
  ) {}

  async setLicenseImage(
    driverId: number,
    driverLicenseImage: string,
    taxiLicenseImage: string,
  ) {
    const driver = await this.imageRepository.save({
      driverId,
      driverLicenseImage,
      taxiLicenseImage,
    });

    return driver;
  }

  async getLicenseImage(driverId: number) {
    return this.imageRepository.findOne({ driverId });
  }
}
