import { Test, TestingModule } from '@nestjs/testing';
import { RessVirtuelleService } from './ress-virtuelle.service';

describe('RessVirtuelleService', () => {
  let service: RessVirtuelleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RessVirtuelleService],
    }).compile();

    service = module.get<RessVirtuelleService>(RessVirtuelleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
