import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccesPhysiqueService } from './acces-physique.service';
import { CreateAccesPhysiqueDto } from './dto/create-acces-physique.dto';
import { UpdateAccesPhysiqueDto } from './dto/update-acces-physique.dto';

@Controller('acces-physique')
export class AccesPhysiqueController {
  constructor(private readonly accesPhysiqueService: AccesPhysiqueService) {}

  @Post()
  create(@Body() createAccesPhysiqueDto: CreateAccesPhysiqueDto) {
    return this.accesPhysiqueService.create(createAccesPhysiqueDto);
  }

  @Get()
  findAll() {
    return this.accesPhysiqueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accesPhysiqueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccesPhysiqueDto: UpdateAccesPhysiqueDto) {
    return this.accesPhysiqueService.update(+id, updateAccesPhysiqueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accesPhysiqueService.remove(+id);
  }
}
