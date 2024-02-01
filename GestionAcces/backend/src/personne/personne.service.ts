import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Personne } from './entities/personne.entity';

@Injectable()
export class PersonneService {
  
  constructor(@InjectRepository(Personne) private personneRepository: Repository<Personne>) {
  }

  async findAll() {
    return await this.personneRepository.find(); 
  }

  async findById(id: number) {
    return await this.personneRepository.findOneBy({id});
  }

  async findByEmail(courriel: string) {
    return await this.personneRepository.findOne({ where: { courriel: courriel } });
  }

  async save(personne: Personne) {
    return await this.personneRepository.save(personne);
  }


  async remove(codePersonne: number) {
    return await this.personneRepository.delete(codePersonne);
  }

}
