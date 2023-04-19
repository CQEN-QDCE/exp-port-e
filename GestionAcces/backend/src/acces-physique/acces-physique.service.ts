import { Injectable } from '@nestjs/common';
import { CreateAccesPhysiqueDto } from './dto/create-acces-physique.dto';
import { UpdateAccesPhysiqueDto } from './dto/update-acces-physique.dto';

@Injectable()
export class AccesPhysiqueService {
  create(createAccesPhysiqueDto: CreateAccesPhysiqueDto) {
    return 'This action adds a new accesPhysique';
  }

  findAll() {
    return `This action returns all accesPhysique`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accesPhysique`;
  }

  update(id: number, updateAccesPhysiqueDto: UpdateAccesPhysiqueDto) {
    return `This action updates a #${id} accesPhysique`;
  }

  remove(id: number) {
    return `This action removes a #${id} accesPhysique`;
  }
}
