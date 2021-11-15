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

@Injectable()
export class TaxiService {
  constructor(
    @InjectRepository(Taxi)
    private readonly taxiRepository: Repository<Taxi>,
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    @InjectRepository(DriverLicense)
    private readonly driverLicense: Repository<DriverLicense>,
    @InjectRepository(DriverTaxiLicense)
    private readonly driverTaxiLicense: Repository<DriverTaxiLicense>,
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
    driverDto: DriverDto,
    driverLicense: DriverLicenseDto,
    driverTaxiLicense: DriverTaxiLicenseDto,
  ) {
    const duplicate = await this.taxiRepository.findOne({
      taxiNumber: taxiDto.taxiNumber,
    });

    if (duplicate) throw new ConflictException();

    console.log(taxiDto);

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
        this.driverLicense.create({
          ...driverLicense,
          driverId: driver.id,
        }),
      );
      await transactionEntityManager.save(
        DriverTaxiLicense,
        this.driverTaxiLicense.create({
          ...driverTaxiLicense,
          driverId: driver.id,
        }),
      );
    });

    return taxiDto;
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
    const result = await this.taxiRepository.find({
      where: {
        isDeleted,
      },
      relations: ['driver'],
      order: query,
    });

    return result;
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
