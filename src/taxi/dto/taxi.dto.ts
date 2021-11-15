import { Customer } from '../../customer/customer.entity';
import { DriverDto } from './driver.dto';
import { Stock } from '../../stock/stock.entity';

export class TaxiDto {
  id?: number;
  taxiNumber: number;
  isDeleted?: boolean;
  driver?: DriverDto;
  customers?: Customer[];
  stocks?: Stock[];
}
