import { SampleTargetDto } from './sampleTarget.dto';

export class SampleTargetTimeDto {
  id: number;
  name: string;
  startAt: Date;
  endAt: Date;
  sampleTarget: SampleTargetDto[];
  isDeleted: boolean;
}
