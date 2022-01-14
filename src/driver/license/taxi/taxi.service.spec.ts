import { Test, TestingModule } from '@nestjs/testing';
import { TaxiLicenseService } from './taxi-license.service';

describe('TaxiService', () => {
  let service: TaxiLicenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxiLicenseService],
    }).compile();

    service = module.get<TaxiLicenseService>(TaxiLicenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
