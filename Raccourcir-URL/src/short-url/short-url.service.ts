import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UpdateShortUrlDto } from './dto/update-short-url.dto';
import { ShortUrl } from './entities/short-url.entity';

var crypto = require("crypto");  

@Injectable()
export class ShortUrlService {

  constructor(@InjectRepository(ShortUrl)
    private shortUrlRepository: Repository<ShortUrl>
  ){}

  create(createShortUrlDto: CreateShortUrlDto) {
    
    if(createShortUrlDto.uniqueId == ''){
      const uid = this.generateCode();
      createShortUrlDto.uniqueId = uid;
    } 

    try {
      return this.shortUrlRepository.save(createShortUrlDto);
    } catch (error) {
      if(error instanceof QueryFailedError){
        console.log("Query failed error");
      }
    }
  }

  findAll() {
    return this.shortUrlRepository.find(); 
  }

  findOne(id: number) {
    const shortUrl = this.shortUrlRepository.findOneBy({id}); 

    if (!shortUrl){
      throw new NotFoundException(`Short-url  ${id} not found.`);
    }
    return  shortUrl;
  }

  update(id: number, updateShortUrlDto: UpdateShortUrlDto) {  
    return this.shortUrlRepository.update(id, updateShortUrlDto); 
  }

  remove(id: number) {
    return this.shortUrlRepository.delete(id); 
  }

  generateCode(): string{
    var id = crypto.randomBytes(6).toString("base64");
    id = id.split('/').join('').split('+').join('').split('=').join('');
    return id;
  } 
  
  async findUnique(uniqueId: string): Promise<ShortUrl>{
    const shortUrl = await this.shortUrlRepository.findOne({
      where: { uniqueId },
    });

    if(!shortUrl){
      throw new HttpException(`Link #${uniqueId} not found`, HttpStatus.NOT_FOUND);
    }
    return shortUrl;
  }
}
