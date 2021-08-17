import { StockDto } from '../../stock/stock.dto';
import { CustomerDto } from '../../customer/customer.dto';
import { SampleInfoDto } from './sampleInfo.dto';
import { SampleStockDto } from './sampleStock.dto';

export class SampleDto {
  id?: number;
  price?: number;
  explain?: string;
  sampleName?: string;
  isDeleted?: boolean;
  image?: string;
  stocks?: StockDto[];
  customers?: CustomerDto[];
  sampleInfo?: SampleInfoDto;
  sampleStock?: SampleStockDto;
}
