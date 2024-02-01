import { Module } from '@nestjs/common';
import { RessPhysiqueService } from './ress-physique.service';
import { RessPhysiqueController } from './ress-physique.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RessPhysique } from './entities/ress-physique.entity';

@Module({
  controllers: [RessPhysiqueController],
  providers: [RessPhysiqueService], 
  imports: [TypeOrmModule.forFeature([RessPhysique])], 
  exports: [TypeOrmModule]
})

export class RessPhysiqueModule {}
