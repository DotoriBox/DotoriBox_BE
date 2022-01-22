import { StockDto } from '../stock/stock.dto';
import { CustomerDto } from '../customer/customer.dto';
import { SampleInfoDto } from './info/info.dto';
import { SampleStockDto } from './stock/stock.dto';
import { SampleTargetDto } from './target/target.dto';

export class SampleDto {
  id?: number;
  isDeleted?: boolean;
  image?: string;
  cardImage?: string;
  stocks?: StockDto[];
  customers?: CustomerDto[];
  sampleInfo?: SampleInfoDto;
  sampleStock?: SampleStockDto;
  sampleTargets?: SampleTargetDto[];
}
