import { Module } from '@nestjs/common';
import { AccesVirtuelService } from './acces-virtuel.service';
import { AccesVirtuelController } from './acces-virtuel.controller';

@Module({
  controllers: [AccesVirtuelController],
  providers: [AccesVirtuelService]
})
export class AccesVirtuelModule {}
