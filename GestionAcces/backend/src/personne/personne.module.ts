import { Module } from '@nestjs/common';
import { PersonneService } from './personne.service';
import { PersonneController } from './personne.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personne } from './entities/personne.entity';

@Module({
  controllers: [PersonneController],
  providers: [PersonneService], 
  imports: [TypeOrmModule.forFeature([Personne])], 
  exports: [TypeOrmModule, PersonneService]
})
export class PersonneModule {}
