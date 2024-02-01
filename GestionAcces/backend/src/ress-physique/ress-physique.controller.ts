import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RessPhysiqueService } from './ress-physique.service';
import { CreateRessPhysiqueDto } from './dto/create-ress-physique.dto';
import { UpdateRessPhysiqueDto } from './dto/update-ress-physique.dto';

@Controller('ress-physique')
export class RessPhysiqueController {
  constructor(private readonly ressPhysiqueService: RessPhysiqueService) {}

  @Post()
  create(@Body() createRessPhysiqueDto: CreateRessPhysiqueDto) {
    return this.ressPhysiqueService.create(createRessPhysiqueDto);
  }

  @Get()
  findAll() {
    return this.ressPhysiqueService.findAll();
  }

  @Get(':codeRessPhysique')
  findOne(@Param('codeRessPhysique') codeRessPhysique: number) {
    return this.ressPhysiqueService.findOne(codeRessPhysique);
  }

  @Patch(':codeRessPhysique')
  update(@Param('codeRessPhysique') codeRessPhysique: number, @Body() updateRessPhysiqueDto: UpdateRessPhysiqueDto) {
    return this.ressPhysiqueService.update(+codeRessPhysique, updateRessPhysiqueDto);
  }

  @Delete(':codeRessPhysique')
  remove(@Param('codeRessPhysique') codeRessPhysique: number) {
    return this.ressPhysiqueService.remove(+codeRessPhysique);
  }
}
