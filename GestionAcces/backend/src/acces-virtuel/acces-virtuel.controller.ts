import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccesVirtuelService } from './acces-virtuel.service';
import { CreateAccesVirtuelDto } from './dto/create-acces-virtuel.dto';
import { UpdateAccesVirtuelDto } from './dto/update-acces-virtuel.dto';

@Controller('acces-virtuel')
export class AccesVirtuelController {
  constructor(private readonly accesVirtuelService: AccesVirtuelService) {}

  @Post()
  create(@Body() createAccesVirtuelDto: CreateAccesVirtuelDto) {
    return this.accesVirtuelService.create(createAccesVirtuelDto);
  }

  @Get()
  findAll() {
    return this.accesVirtuelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accesVirtuelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccesVirtuelDto: UpdateAccesVirtuelDto) {
    return this.accesVirtuelService.update(+id, updateAccesVirtuelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accesVirtuelService.remove(+id);
  }
}
