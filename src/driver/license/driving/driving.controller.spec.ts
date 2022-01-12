import { Test, TestingModule } from '@nestjs/testing';
import { DrivingController } from './driving.controller';

describe('DrivingController', () => {
  let controller: DrivingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrivingController],
    }).compile();

    controller = module.get<DrivingController>(DrivingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
