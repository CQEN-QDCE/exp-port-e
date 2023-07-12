import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Personne } from './entities/personne.entity';
import { PersonneDto } from './dto/personne.dto';

@Injectable()
export class PersonneService {
  
  constructor(@InjectRepository(Personne) private personneRepository: Repository<Personne>) {
  }

  create(createPersonne: PersonneDto) {
    return this.personneRepository.save(createPersonne);
  }

  async findAll() {
    return await this.personneRepository.find(); 
  }

  async findById(courriel: string) {
    return await this.personneRepository.findOneBy({courriel});
  }

  async findByEmail(courriel: string) {
    return await this.personneRepository.findOne({ where: { courriel: courriel } });
  }

  async save(personne: Personne) {
    return await this.personneRepository.save(personne);
  }

  async remove(courriel: string) {
    return await this.personneRepository.delete(courriel);
  }

}
