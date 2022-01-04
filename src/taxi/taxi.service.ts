import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Taxi } from './entity/taxi.entity';
import { getManager, Repository } from 'typeorm';
import { Driver } from './entity/driver.entity';
import { TaxiDto } from './dto/taxi.dto';
import { DriverLicense } from './entity/driver.license.entity';
import { DriverTaxiLicense } from './entity/driver.taxiLicense.entity';
import { DriverLicenseDto } from './dto/driver.license.dto';
import { DriverTaxiLicenseDto } from './dto/driver.taxiLicense.dto';
import { DriverDto } from './dto/driver.dto';
import { TaxiPlatformDto } from './dto/taxi.platform.dto';
import { TaxiPlatform } from './entity/taxi.platform.entity';

@Injectable()
export class TaxiService {
  constructor(
    @InjectRepository(Taxi)
    private readonly taxiRepository: Repository<Taxi>,
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    @InjectRepository(DriverLicense)
    private readonly driverLicenseRepository: Repository<DriverLicense>,
    @InjectRepository(DriverTaxiLicense)
    private readonly driverTaxiLicenseRepository: Repository<DriverTaxiLicense>,
    @InjectRepository(TaxiPlatform)
    private readonly taxiPlatformRepository: Repository<TaxiPlatform>,
  ) {}

  async updateByTaxiId(taxiDto: TaxiDto, taxiId: number) {
    const result = await this.taxiRepository.update(
      {
        id: taxiId,
        isDeleted: false,
      },
      taxiDto,
    );

    if (!result) throw new NotFoundException();
    return result;
  }

  async updateTaxiPlatform(
    taxiPlatform: TaxiPlatformDto,
    taxiPlatformId: number,
  ) {
    const result = await this.taxiPlatformRepository.update(
      { id: taxiPlatformId },
      taxiPlatform,
    );
    if (!result) throw new NotFoundException();

    return result;
  }

  async updateTaxiLicensePic(taxiId: number, file) {
    const driver = await this.driverRepository.findOne({ taxiId });
    if (!Driver) throw new NotFoundException();

    return this.driverTaxiLicenseRepository.update(
      {
        driverId: driver.id,
      },
      {
        TaxiLicensePic: file.location,
      },
    );
  }

  async updateDriverLicensePic(taxiId: number, file) {
    const driver = await this.driverRepository.findOne({ taxiId });
    if (!Driver) throw new NotFoundException();

    return this.driverLicenseRepository.update(
      {
        driverId: driver.id,
      },
      {
        DriverLicensePic: file.location,
      },
    );
  }

  async recoverDeletedTaxi(taxiId: number) {
    const result = await this.taxiRepository.update(
      {
        id: taxiId,
        isDeleted: true,
      },
      {
        isDeleted: false,
      },
    );

    if (!result) throw new NotFoundException();
    return result;
  }

  async createTaxi(
    taxiDto: TaxiDto,
    taxiPlatformDto: TaxiPlatformDto,
    driverDto: DriverDto,
    driverLicense: DriverLicenseDto,
    driverTaxiLicense: DriverTaxiLicenseDto,
  ) {
    const duplicate = await this.taxiRepository.findOne({
      taxiNumber: taxiDto.taxiNumber,
    });
    if (duplicate) throw new ConflictException();

    const check = await this.taxiPlatformRepository.findOne(taxiPlatformDto);
    if (!check) throw new NotFoundException();

    await getManager().transaction(async (transactionEntityManager) => {
      const taxi = await transactionEntityManager.save(
        Taxi,
        this.taxiRepository.create(taxiDto),
      );

      const driver = await transactionEntityManager.save(
        Driver,
        this.driverRepository.create({ ...driverDto, taxiId: taxi.id }),
      );

      await transactionEntityManager.save(
        DriverLicense,
        this.driverLicenseRepository.create({
          ...driverLicense,
          driverId: driver.id,
        }),
      );
      await transactionEntityManager.save(
        DriverTaxiLicense,
        this.driverTaxiLicenseRepository.create({
          ...driverTaxiLicense,
          driverId: driver.id,
        }),
      );
    });

    return taxiDto;
  }

  async createTaxiPlatform(taxiPlatformDto: TaxiPlatformDto) {
    const check = await this.taxiPlatformRepository.findOne(taxiPlatformDto);

    if (check) throw new ConflictException();

    return this.taxiPlatformRepository.save(taxiPlatformDto);
  }

  async checkTaxi(taxiDto: TaxiDto) {
    const result = await this.taxiRepository.findOne(taxiDto);
    if (!result || result.isDeleted) throw new NotFoundException();
    return result;
  }

  async deleteTaxi(taxiId: number) {
    const result = this.taxiRepository.update(
      {
        id: taxiId,
        isDeleted: false,
      },
      {
        isDeleted: true,
      },
    );

    if (!result) throw new NotFoundException();

    return result;
  }

  async getAllTaxi(isDeleted: boolean, query: Record<string, unknown>) {
    if (!isDeleted) isDeleted = false;
    return this.taxiRepository.find({
      where: {
        isDeleted,
      },
      relations: ['driver'],
      order: query,
    });
  }

  async getTaxiByTaxiNumber(taxiNumber: number) {
    const result = await this.taxiRepository.findOne({
      where: {
        taxiNumber: +taxiNumber,
        isDeleted: false,
      },
      relations: ['driver'],
    });

    if (!result) throw new NotFoundException();
    return result;
  }
}
