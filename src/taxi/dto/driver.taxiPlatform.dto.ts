import { TaxiDto } from './taxi.dto';

export class TaxiPlatformDto {
  id: number;
  name: string;
  taxis: TaxiDto[];
}
