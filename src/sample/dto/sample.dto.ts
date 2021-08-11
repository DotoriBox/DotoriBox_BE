import { StockDto } from '../../stock/stock.dto';
import { CustomerDto } from '../../customer/customer.dto';

export class SampleDto {
  id?: number;
  price?: number;
  explain?: string;
  sampleName?: string;
  isDeleted?: boolean;
  stocks?: StockDto[];
  customers?: CustomerDto[];
}
