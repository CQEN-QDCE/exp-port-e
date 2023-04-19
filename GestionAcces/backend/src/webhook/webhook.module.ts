import { Module } from '@nestjs/common';
import { WebHookService } from './webhook.service';
import { WebHookController } from './webhook.controller';
import { AttestationEmiseModule } from 'src/attestation-emise/attestation-emise.module';
import { PersonneModule } from 'src/personne/personne.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [WebHookController],
  providers: [WebHookService],
  imports: [AttestationEmiseModule, PersonneModule, HttpModule]
})
export class WebHookModule {}
