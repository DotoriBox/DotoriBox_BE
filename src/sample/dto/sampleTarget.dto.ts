import { SampleDto } from './sample.dto';
import { SampleTargetTimeDto } from './sampleTargetTime.dto';

export class SampleTargetDto {
  id?: number;
  age?: number;
  isMale?: boolean;
  sampleTargetTimeId: number;
  sampleTargetTime: SampleTargetTimeDto;
  sampleId?: number;
  sampleDto?: SampleDto;
}
