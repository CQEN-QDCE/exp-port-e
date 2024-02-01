import { Test, TestingModule } from '@nestjs/testing';
import { AccesPhysiqueService } from './acces-physique.service';

describe('AccesPhysiqueService', () => {
  let service: AccesPhysiqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccesPhysiqueService],
    }).compile();

    service = module.get<AccesPhysiqueService>(AccesPhysiqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
