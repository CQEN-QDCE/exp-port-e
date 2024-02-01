import { Test, TestingModule } from '@nestjs/testing';
import { RessPhysiqueController } from './ress-physique.controller';
import { RessPhysiqueService } from './ress-physique.service';

describe('RessPhysiqueController', () => {
  let controller: RessPhysiqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RessPhysiqueController],
      providers: [RessPhysiqueService],
    }).compile();

    controller = module.get<RessPhysiqueController>(RessPhysiqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
