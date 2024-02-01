import { Test, TestingModule } from '@nestjs/testing';
import { RessPhysiqueService } from './ress-physique.service';

describe('RessPhysiqueService', () => {
  let service: RessPhysiqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RessPhysiqueService],
    }).compile();

    service = module.get<RessPhysiqueService>(RessPhysiqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
