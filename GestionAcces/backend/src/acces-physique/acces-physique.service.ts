import { Injectable } from '@nestjs/common';
import { CreateAccesPhysiqueDto } from './dto/create-acces-physique.dto';
import { UpdateAccesPhysiqueDto } from './dto/update-acces-physique.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccesPhysique } from './entities/acces-physique.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccesPhysiqueService {

  constructor(@InjectRepository(AccesPhysique)
	  private accessPhysiqueRepository: Repository<AccesPhysique>
  ){}

  create(createAccesPhysiqueDto: CreateAccesPhysiqueDto) {
    return this.accessPhysiqueRepository.save(createAccesPhysiqueDto); 
  }

  findAll() {
    return this.accessPhysiqueRepository.find();
  }

  findOne(courriel: string) {
    return this.accessPhysiqueRepository.findOneBy({courriel});
  }

  update(courriel: string, updateAccesPhysiqueDto: UpdateAccesPhysiqueDto) {
    return this.accessPhysiqueRepository.update(courriel, updateAccesPhysiqueDto);
  }

  remove(courriel: string) {
    return this.accessPhysiqueRepository.delete(courriel);
  }
}
