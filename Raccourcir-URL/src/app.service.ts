import { Header, HttpException, HttpStatus, Injectable, Param, Res } from '@nestjs/common';
import { ShortUrlService } from './short-url/short-url.service';

@Injectable()
export class AppService {

  constructor(
    //@InjectRepository(ShortUrl)
    private readonly shortService: ShortUrlService,
  ){}

  getHello(): string {
    return "<h1>Raccourci</h1> <br> Accédez l'API <a href='http://localhost:3000/api'>Swagger</a>";
  }

  // @Header('Content-Type', 'text/plain')
  @Header('Content-Type', 'application/json')
  async getUrlRedirect(@Param('uniqueId') uniqueId: string, @Res() response){

    try{
      let shortUrl = await this.shortService.findUnique(uniqueId);
      
      if(!shortUrl){
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }

      let adresse = shortUrl.originalUrl;
      console.log(adresse);

      response.status(301); 
      response.header("Location", shortUrl.originalUrl);
      response.send(adresse);
      
    } catch(error){
      response.status(404).send("Lien non trouvé; vérifiez le lien que vous devez soumettre.");
    } 
  }
}
