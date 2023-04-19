import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttestationEmise } from './entities/attestation-emise.entity';
import { AttestationEmiseService } from './attestation-emise.service';
import { AttestationEmiseController } from './attestation-emise.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [AttestationEmiseController],
  providers: [AttestationEmiseService], 
  imports: [TypeOrmModule.forFeature([AttestationEmise]), HttpModule], 
  exports: [TypeOrmModule, AttestationEmiseService]
})
export class AttestationEmiseModule {}
