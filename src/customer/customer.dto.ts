import { TaxiDto } from '../taxi/dto/taxi.dto';
import { SampleDto } from '../sample/dto/sample.dto';

export class CustomerDto {
  id?: number;
  isMale?: boolean;
  taxi?: TaxiDto;
  age?: number;
  taxiId?: number;
  score?: number;
  review?: string;
  sample?: SampleDto;
  sampleId?: number;
}
