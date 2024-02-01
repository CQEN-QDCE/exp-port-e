import { Module } from '@nestjs/common';
import { RessVirtuelleService } from './ress-virtuelle.service';
import { RessVirtuelleController } from './ress-virtuelle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RessVirtuelle } from './entities/ress-virtuelle.entity';

@Module({
  controllers: [RessVirtuelleController],
  providers: [RessVirtuelleService], 
  imports: [TypeOrmModule.forFeature([RessVirtuelle])],
  exports: [TypeOrmModule]
})
export class RessVirtuelleModule {}
