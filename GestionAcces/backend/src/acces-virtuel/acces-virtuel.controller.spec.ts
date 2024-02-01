import { Test, TestingModule } from '@nestjs/testing';
import { AccesVirtuelController } from './acces-virtuel.controller';
import { AccesVirtuelService } from './acces-virtuel.service';

describe('AccesVirtuelController', () => {
  let controller: AccesVirtuelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccesVirtuelController],
      providers: [AccesVirtuelService],
    }).compile();

    controller = module.get<AccesVirtuelController>(AccesVirtuelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
