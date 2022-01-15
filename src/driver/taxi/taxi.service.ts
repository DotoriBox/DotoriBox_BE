import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taxi } from './taxi.entity';
import { TaxiDto } from './taxi.dto';

@Injectable()
export class TaxiService {
  constructor(
    @InjectRepository(Taxi)
    private readonly taxiRepository: Repository<Taxi>,
  ) {}

  async createTaxi(taxiDto: TaxiDto) {
    return this.taxiRepository.save(taxiDto);
  }

  async updateTaxi(id: number, taxiDto: TaxiDto) {
    const taxi = await this.taxiRepository.findOne(taxiDto);
    if (!taxi) throw new ConflictException();

    return this.taxiRepository.update({ id }, taxiDto);
  }

  async getTaxi(id: number) {
    const Taxi = await this.taxiRepository.findOne(
      { taxiNumber: id },
      { relations: ['driver'] },
    );
    if (!Taxi) throw new NotFoundException();

    return Taxi;
  }
}
