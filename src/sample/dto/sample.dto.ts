import { StockDto } from '../../stock/stock.dto';
import { CustomerDto } from '../../customer/customer.dto';
import { SampleInfoDto } from './sampleInfo.dto';
import { SampleStockDto } from './sampleStock.dto';
import { SampleTargetDto } from './sampleTarget.dto';

export class SampleDto {
  id?: number;
  isDeleted?: boolean;
  image?: string;
  stocks?: StockDto[];
  customers?: CustomerDto[];
  sampleInfo?: SampleInfoDto;
  sampleStock?: SampleStockDto;
  sampleTarget?: SampleTargetDto;
}
