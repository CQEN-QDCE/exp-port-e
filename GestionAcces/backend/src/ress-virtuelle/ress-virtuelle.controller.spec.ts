import { Test, TestingModule } from '@nestjs/testing';
import { RessVirtuelleController } from './ress-virtuelle.controller';
import { RessVirtuelleService } from './ress-virtuelle.service';

describe('RessVirtuelleController', () => {
  let controller: RessVirtuelleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RessVirtuelleController],
      providers: [RessVirtuelleService],
    }).compile();

    controller = module.get<RessVirtuelleController>(RessVirtuelleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
