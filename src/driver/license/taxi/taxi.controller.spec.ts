import { Test, TestingModule } from '@nestjs/testing';
import { TaxiController } from './taxi.controller';

describe('TaxiController', () => {
  let controller: TaxiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxiController],
    }).compile();

    controller = module.get<TaxiController>(TaxiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
