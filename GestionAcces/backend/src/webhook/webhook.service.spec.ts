import { Test, TestingModule } from '@nestjs/testing';
import { WebHookService } from './webhook.service';

describe('WebHookService', () => {
  let service: WebHookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebHookService],
    }).compile();

    service = module.get<WebHookService>(WebHookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});