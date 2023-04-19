import { Injectable } from '@nestjs/common';
import { CreateAccesVirtuelDto } from './dto/create-acces-virtuel.dto';
import { UpdateAccesVirtuelDto } from './dto/update-acces-virtuel.dto';

@Injectable()
export class AccesVirtuelService {
  create(createAccesVirtuelDto: CreateAccesVirtuelDto) {
    return 'This action adds a new accesVirtuel';
  }

  findAll() {
    return `This action returns all accesVirtuel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accesVirtuel`;
  }

  update(id: number, updateAccesVirtuelDto: UpdateAccesVirtuelDto) {
    return `This action updates a #${id} accesVirtuel`;
  }

  remove(id: number) {
    return `This action removes a #${id} accesVirtuel`;
  }
}
