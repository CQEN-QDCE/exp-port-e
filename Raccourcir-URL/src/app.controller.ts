import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

require('dotenv').config();

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  /**
   * Méthode d'exemple du framework
   * @returns redirectionne la page vers la page base de l'API
   */
  @Get()
  getHello(@Res() response) {
    const SUBDOMAIN = process.env.APP_SUBDOMAIN
    const DOMAIN    = process.env.APP_DOMAIN
    response.redirect(`https://p.apps.exp.openshift.cqen.ca/api`); 
  }

  /**
   * Redireciona a resposta para a página linkada no URL longo. 
   * @param id URL longo registrada no banco de dados e relacionada ao shortURL recebido
   * @param response objeto http response do express utilizado para fazer o encaminhamento à página de destino
   */
  @Get(':uniqueId')
  getUrlRedirect(@Param('uniqueId') uniqueId: string, @Res() response){
    this.appService.getUrlRedirect(uniqueId, response); 
  }
}
