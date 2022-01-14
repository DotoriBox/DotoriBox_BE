import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxiLicense } from './taxi.entity';
import { Repository } from 'typeorm';
import { TaxiLicenseDto } from './taxi.dto';

@Injectable()
export class TaxiLicenseService {
  constructor(
    @InjectRepository(TaxiLicense)
    private readonly taxiLicenseRepository: Repository<TaxiLicense>,
  ) {}

  async getTaxiLicense() {
    return this.taxiLicenseRepository.find();
  }

  async getTaxiLicenseById(id: number) {
    const taxiLicense = await this.taxiLicenseRepository.findOne({ id });
    if (!taxiLicense) throw new NotFoundException();

    return taxiLicense;
  }

  async createTaxiLicense(taxiLicenseDto: TaxiLicenseDto) {
    const taxiLicense = await this.taxiLicenseRepository.findOne(
      taxiLicenseDto,
    );

    if (taxiLicense) throw new ConflictException();

    return this.taxiLicenseRepository.save(taxiLicenseDto);
  }

  async updateTaxiLicense(id: number, taxiLicenseDto: TaxiLicenseDto) {
    const taxiLicense = await this.taxiLicenseRepository.findOne(
      taxiLicenseDto,
    );

    if (!taxiLicense) throw new NotFoundException();

    return this.taxiLicenseRepository.update({ id }, taxiLicenseDto);
  }
}
