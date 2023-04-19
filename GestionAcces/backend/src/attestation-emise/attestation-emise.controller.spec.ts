import { Test, TestingModule } from '@nestjs/testing';
import { AttestationEmiseController } from './attestation-emise.controller';
import { AttestationEmiseService } from './attestation-emise.service';

describe('AttestationEmiseController', () => {
  let controller: AttestationEmiseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttestationEmiseController],
      providers: [AttestationEmiseService],
    }).compile();

    controller = module.get<AttestationEmiseController>(AttestationEmiseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
