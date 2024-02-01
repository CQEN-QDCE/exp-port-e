import { Test, TestingModule } from '@nestjs/testing';
import { AccesVirtuelService } from './acces-virtuel.service';

describe('AccesVirtuelService', () => {
  let service: AccesVirtuelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccesVirtuelService],
    }).compile();

    service = module.get<AccesVirtuelService>(AccesVirtuelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
