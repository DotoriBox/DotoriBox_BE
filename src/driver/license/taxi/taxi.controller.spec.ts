import { Test, TestingModule } from '@nestjs/testing';
import { TaxiLicenseController } from './taxi-license.controller';

describe('TaxiController', () => {
  let controller: TaxiLicenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxiLicenseController],
    }).compile();

    controller = module.get<TaxiLicenseController>(TaxiLicenseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
