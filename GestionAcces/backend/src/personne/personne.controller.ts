import { Controller, Get, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { PersonneService } from './personne.service';
import { PersonneDto } from './dto/personne.dto';
import { Personne } from './entities/personne.entity';

@Controller('personne')
export class PersonneController {

  constructor(private readonly personneService: PersonneService) {
  }

  @Get()
  async findAll() {
    return (await this.personneService.findAll()).map(personne => PersonneDto.fromEntity(personne))
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const personne = await this.personneService.findById(id);
    if (!personne) {
      throw new NotFoundException(`Personne ${id} n'existe pas.`);
    }
    return PersonneDto.fromEntity(personne);
  }

  @Put()
  update(@Body() dto: PersonneDto) {
    return this.personneService.save(PersonneDto.toEntity(dto));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.personneService.remove(id);
  }
}
