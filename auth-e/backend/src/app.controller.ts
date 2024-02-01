import { Controller, Get } from '@nestjs/common';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';
import { Routes } from 'src/routes';

@Controller(`${Routes.API}`)
export class AppController {

    constructor() { 
    }

    @Get(`/${Routes.NOW}`)
    @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
    public async getCurrentDateTime() {
      let currentDateTime = {};
      currentDateTime['now'] = new Date();
      return currentDateTime;
    }
}
