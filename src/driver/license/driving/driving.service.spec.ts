import { Test, TestingModule } from '@nestjs/testing';
import { DrivingService } from './driving.service';

describe('DrivingService', () => {
  let service: DrivingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrivingService],
    }).compile();

    service = module.get<DrivingService>(DrivingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
