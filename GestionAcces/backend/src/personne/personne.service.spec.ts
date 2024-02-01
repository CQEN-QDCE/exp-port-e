import { Test, TestingModule } from '@nestjs/testing';
import { PersonneService } from './personne.service';

describe('PersonneService', () => {
  let service: PersonneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonneService],
    }).compile();

    service = module.get<PersonneService>(PersonneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined(); 
  });
});
 