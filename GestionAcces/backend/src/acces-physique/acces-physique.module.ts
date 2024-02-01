import { Module } from '@nestjs/common';
import { AccesPhysiqueService } from './acces-physique.service';
import { AccesPhysiqueController } from './acces-physique.controller';

@Module({
  controllers: [AccesPhysiqueController],
  providers: [AccesPhysiqueService]
})
export class AccesPhysiqueModule {}
