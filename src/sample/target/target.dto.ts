import { SampleDto } from '../sample.dto';
import { SampleTargetTimeDto } from './time/time.dto';

export class SampleTargetDto {
  id?: number;
  age?: number;
  isMale?: boolean;
  sampleTargetTimeId: number;
  sampleTargetTime: SampleTargetTimeDto;
  sampleId?: number;
  sampleDto?: SampleDto;
}
