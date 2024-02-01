import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonneModule } from './personne/personne.module';
import { RessVirtuelleModule } from './ress-virtuelle/ress-virtuelle.module';
import { RessPhysiqueModule } from './ress-physique/ress-physique.module';
import { AccesVirtuelModule } from './acces-virtuel/acces-virtuel.module';
import { AccesPhysiqueModule } from './acces-physique/acces-physique.module';
import { configService } from './config.service';
import { AttestationEmiseModule } from './attestation-emise/attestation-emise.module';
import { WebHookModule } from './webhook/webhook.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    PersonneModule,
    AttestationEmiseModule,
    RessVirtuelleModule,
    RessPhysiqueModule,
    AccesVirtuelModule,
    AccesPhysiqueModule,
    WebHookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
