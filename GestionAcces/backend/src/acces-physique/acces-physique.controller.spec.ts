import { Test, TestingModule } from '@nestjs/testing';
import { AccesPhysiqueController } from './acces-physique.controller';
import { AccesPhysiqueService } from './acces-physique.service';

describe('AccesPhysiqueController', () => {
  let controller: AccesPhysiqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccesPhysiqueController],
      providers: [AccesPhysiqueService],
    }).compile();

    controller = module.get<AccesPhysiqueController>(AccesPhysiqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
