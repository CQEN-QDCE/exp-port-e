import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RessVirtuelleService } from './ress-virtuelle.service';
import { CreateRessVirtuelleDto } from './dto/create-ress-virtuelle.dto';
import { UpdateRessVirtuelleDto } from './dto/update-ress-virtuelle.dto';

@Controller('ress-virtuelle')
export class RessVirtuelleController {
  constructor(private readonly ressVirtuelleService: RessVirtuelleService) {}

  @Post()
  create(@Body() createRessVirtuelleDto: CreateRessVirtuelleDto) {
    return this.ressVirtuelleService.create(createRessVirtuelleDto);
  }

  @Get()
  findAll() {
    return this.ressVirtuelleService.findAll();
  }

  @Get(':codeRessVirtuelle')
  findOne(@Param('codeRessVirtuelle') codeRessVirtuelle: string) {
    return this.ressVirtuelleService.findOne(+codeRessVirtuelle);
  }

  @Patch(':codeRessVirtuelle')
  update(@Param('codeRessVirtuelle') codeRessVirtuelle: string, @Body() updateRessVirtuelleDto: UpdateRessVirtuelleDto) {
    return this.ressVirtuelleService.update(+codeRessVirtuelle, updateRessVirtuelleDto);
  }

  @Delete(':codeRessVirtuelle')
  remove(@Param('codeRessVirtuelle') codeRessVirtuelle: string) {
    return this.ressVirtuelleService.remove(+codeRessVirtuelle);
  }
}
