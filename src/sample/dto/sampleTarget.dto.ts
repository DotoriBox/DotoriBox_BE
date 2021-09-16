import { SampleDto } from './sample.dto';

export class SampleTargetDto {
  id?: number;
  age?: number;
  isMale?: boolean;
  startTime?: string;
  endTime?: string;
  sampleId?: number;
  sampleDto?: SampleDto;
}
