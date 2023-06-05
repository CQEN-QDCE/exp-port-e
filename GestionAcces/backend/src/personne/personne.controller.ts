import { Controller, Get, Body, Patch, Param, Delete, NotFoundException, Put, Post } from '@nestjs/common';
import { PersonneService } from './personne.service';
import { PersonneDto } from './dto/personne.dto';
import { Personne } from './entities/personne.entity';

@Controller('personne')
export class PersonneController {

  constructor(private readonly personneService: PersonneService) {
  }


  @Post()
  create(@Body() createPersonne: PersonneDto) {
    return this.personneService.create(createPersonne);
  }

  @Get()
  async findAll() {
    return (await this.personneService.findAll()).map(personne => PersonneDto.fromEntity(personne))
  }

  @Get(':courriel')
  async findOne(@Param('courriel') courriel: string) {
    const personne = await this.personneService.findById(courriel);
    if (!personne) {
      throw new NotFoundException(`Personne ${courriel} n'existe pas.`);
    }
    return PersonneDto.fromEntity(personne);
  }

  @Put()
  update(@Body() dto: PersonneDto) {
    return this.personneService.save(PersonneDto.toEntity(dto));
  }

  @Delete(':courriel')
  remove(@Param('courriel') courriel: string) {
    return this.personneService.remove(courriel);
  }
}
