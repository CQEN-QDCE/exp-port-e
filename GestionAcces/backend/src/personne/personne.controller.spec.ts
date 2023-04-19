import { Test, TestingModule } from '@nestjs/testing';
import { PersonneController } from './personne.controller';
import { PersonneService } from './personne.service';

describe('PersonneController', () => {
  let controller: PersonneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonneController],
      providers: [PersonneService],
    }).compile();

    controller = module.get<PersonneController>(PersonneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
