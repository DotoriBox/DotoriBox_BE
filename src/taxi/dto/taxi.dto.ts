import { Customer } from '../../customer/customer.entity';
import { DriverDto } from './driver.dto';

export class TaxiDto {
  id?: number;
  taxiNumber: number;
  isDeleted: boolean;
  driver?: DriverDto;
  customers?: Customer[];
}
