import { Module } from '@nestjs/common';
import { AccesPhysiqueService } from './acces-physique.service';
import { AccesPhysiqueController } from './acces-physique.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccesPhysique } from './entities/acces-physique.entity';

@Module({
  controllers: [AccesPhysiqueController],
  providers: [AccesPhysiqueService], 
  imports: [TypeOrmModule.forFeature([AccesPhysique])],
  exports: [TypeOrmModule]
})
export class AccesPhysiqueModule {}
