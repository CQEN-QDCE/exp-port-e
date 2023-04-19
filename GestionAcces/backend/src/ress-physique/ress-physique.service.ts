import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRessPhysiqueDto } from './dto/create-ress-physique.dto';
import { UpdateRessPhysiqueDto } from './dto/update-ress-physique.dto';
import { RessPhysique } from './entities/ress-physique.entity';

@Injectable()
export class RessPhysiqueService {

  constructor(@InjectRepository(RessPhysique)
	  private ressPhysiqueRepository: Repository<RessPhysique>
  ){}

  create(createRessPhysiqueDto: CreateRessPhysiqueDto) {
    return this.ressPhysiqueRepository.save(createRessPhysiqueDto);
  }

  findAll() {
    return this.ressPhysiqueRepository.find(); 
  }

  findOne(codeRessPhysique: number) {
    return this.ressPhysiqueRepository.findOneBy({codeRessPhysique}); 
  }

  update(codeRessPhysique: number, updateRessPhysiqueDto: UpdateRessPhysiqueDto) {
    return this.ressPhysiqueRepository.update(codeRessPhysique, updateRessPhysiqueDto);
  }

  remove(codeRessPhysique: number) {
    return this.ressPhysiqueRepository.delete(codeRessPhysique);
  }
}
