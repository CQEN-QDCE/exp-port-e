import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UpdateShortUrlDto } from './dto/update-short-url.dto';

@Controller('v1/short-url')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  /**
   * 
   * @param createShortUrlDto 
   * @returns 
   */
  @Post()
  create(@Body() createShortUrlDto: CreateShortUrlDto) {
    return this.shortUrlService.create(createShortUrlDto);
  }

  /**
   * 
   * @returns 
   */
  @Get()
  findAll() {
    return this.shortUrlService.findAll();
  }

  @Get('/unique/:uniqueId') 
  findUnique(@Param('uniqueId') uniqueId: string){
    return this.findUnique(uniqueId);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shortUrlService.findOne(+id);
  }

  /**
   * 
   * @param id 
   * @param updateShortUrlDto 
   * @returns 
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShortUrlDto: UpdateShortUrlDto) {
    return this.shortUrlService.update(+id, updateShortUrlDto);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortUrlService.remove(+id);
  }
}
