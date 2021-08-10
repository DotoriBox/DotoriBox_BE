import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Taxi } from './entity/taxi.entity';
import { Repository } from 'typeorm';
import { Driver } from './entity/driver.entity';
import { TaxiDto } from './dto/taxi.dto';

@Injectable()
export class TaxiService {
  constructor(
    @InjectRepository(Taxi)
    private readonly taxiRepository: Repository<Taxi>,
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
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

  async createTaxi(taxiDto: TaxiDto) {
    const duplicate = await this.taxiRepository.findOne({
      taxiNumber: taxiDto.taxiNumber,
    });

    if (duplicate) throw new ConflictException();

    await this.driverRepository.save(taxiDto.driver);
    return this.taxiRepository.save(taxiDto);
  }

  async checkTaxi(taxiDto: TaxiDto) {
    const result = await this.taxiRepository.findOne(taxiDto);
    if (!result || result.isDeleted) throw new NotFoundException();
    return result;
  }

  async deleteTaxi(taxiDto: TaxiDto) {
    return this.taxiRepository.update(taxiDto, {
      isDeleted: true,
    });
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
