import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './stock.entity';
import { Repository } from 'typeorm';
import { StockDto } from './stock.dto';
import { Taxi } from '../taxi/entity/taxi.entity';
import { Sample } from '../sample/entity/sample.entity';
import { SampleStock } from '../sample/entity/sampleStock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    @InjectRepository(Taxi)
    private readonly taxiRepository: Repository<Taxi>,
    @InjectRepository(Sample)
    private readonly sampleRepository: Repository<Sample>,
    @InjectRepository(SampleStock)
    private readonly sampleStockRepository: Repository<SampleStock>,
  ) {}

  async createStock(stockDto: StockDto) {
    const duplicate = await this.stockRepository.findOne(stockDto);
    if (duplicate) throw new ConflictException();

    await this.sampleStockRepository
      .createQueryBuilder('sample_stock')
      .where({ sampleId: stockDto.sampleId })
      .update({
        amount: () => `amount - ${stockDto.stock}`,
      })
      .execute();

    return this.stockRepository.save(stockDto);
  }

  async useStock(stockDto: StockDto) {
    const result = await this.stockRepository
      .createQueryBuilder()
      .where(stockDto)
      .update({
        stock: () => 'stock - 1',
        sales: () => 'sales + 1',
      })
      .execute();

    await this.sampleStockRepository
      .createQueryBuilder('sample_stock')
      .where({ sampleId: stockDto.sampleId })
      .update({
        amount: () => 'amount - 1',
        sales: () => 'sales + 1',
      })
      .execute();

    if (!result) throw new NotFoundException();

    return result;
  }

  async updateStock(stockId: number, stockDto: StockDto) {
    const result = await this.stockRepository.update(
      {
        id: stockId,
        isDeleted: false,
      },
      stockDto,
    );

    if (!result) throw new NotFoundException();

    return result;
  }

  async deleteStock(stockId: number, sampleId: number) {
    const result = await this.stockRepository.update(
      {
        id: stockId,
        sampleId,
        isDeleted: true,
      },
      {
        isDeleted: false,
      },
    );

    if (!result) throw new NotFoundException();

    return result;
  }

  async checkStock(sampleId: number, taxiId: number) {
    const taxi = await this.taxiRepository.findOne({
      id: taxiId,
      isDeleted: false,
    });

    if (!taxi) throw new NotFoundException();

    const sample = await this.sampleRepository.findOne({
      id: sampleId,
      isDeleted: false,
    });

    if (!sample) throw new NotFoundException();

    const duplicated = await this.stockRepository.findOne({
      taxiId,
      sampleId,
    });

    if (duplicated) throw new ConflictException();

    return { Taxi: taxi, Sample: sample };
  }

  async getStockAll(taxiId: number, query: Record<string, any>) {
    return this.stockRepository.find({
      where: {
        taxiId,
        isDeleted: false,
      },
      order: query,
      relations: ['sample', 'sample.sampleInfo'],
    });
  }

  async getStock(stockDto: StockDto) {
    return this.stockRepository.findOne({
      where: stockDto,
      relations: ['sample', 'sample.sampleInfo'],
    });
  }
}
