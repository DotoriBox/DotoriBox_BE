import { SampleDto } from '../sample/sample.dto';
import { TaxiDto } from '../driver/taxi/taxi.dto';

export class CustomerDto {
  id?: number;
  isMale?: boolean;
  taxi?: TaxiDto;
  age?: number;
  taxiId?: number;
  sample?: SampleDto;
  sampleId?: number;
  phone?: string;
}
