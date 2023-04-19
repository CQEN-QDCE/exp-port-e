import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRessVirtuelleDto } from './dto/create-ress-virtuelle.dto';
import { UpdateRessVirtuelleDto } from './dto/update-ress-virtuelle.dto';
import { RessVirtuelle } from './entities/ress-virtuelle.entity';

@Injectable()
export class RessVirtuelleService {

  constructor(@InjectRepository(RessVirtuelle)
	private ressVirtuelleRepository: Repository<RessVirtuelle>
  ){}

  create(createRessVirtuelleDto: CreateRessVirtuelleDto) {
    return this.ressVirtuelleRepository.save(createRessVirtuelleDto); 
  }

  findAll() {
    return this.ressVirtuelleRepository.find(); 
  }

  findOne(codeRessVirtuelle: number) {
    return this.ressVirtuelleRepository.findOneBy({codeRessVirtuelle}); 
  }

  update(codeRessVirtuelle: number, updateRessVirtuelleDto: UpdateRessVirtuelleDto) {
    return this.ressVirtuelleRepository.update(codeRessVirtuelle, updateRessVirtuelleDto);
  }

  remove(codeRessVirtuelle: number) {
    return this.ressVirtuelleRepository.delete(codeRessVirtuelle); 
  }
}
