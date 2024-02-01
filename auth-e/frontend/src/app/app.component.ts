import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { HomeService } from './services/home.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auth-e';
  givenName: string = '';
  familyName: string = '';
  firstFamilyNameLetter: string = '';
  email: string = '';
  username: string = '';
  now: Date = new Date();

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  constructor(public translate: TranslateService, private keycloakService: KeycloakService, private homeService: HomeService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('fr');
  }

  ngOnInit() {
    try {
      const keycloak = this.keycloakService.getKeycloakInstance();
      if (keycloak && keycloak.tokenParsed) {
        this.email = keycloak.tokenParsed["email"];
        this.username = keycloak.tokenParsed["preferred_username"];
        this.givenName = keycloak.tokenParsed["given_name"];
        this.familyName = keycloak.tokenParsed["family_name"];
        this.firstFamilyNameLetter = this.familyName.charAt(0).toUpperCase();
        this.homeService.getNow().pipe(takeUntil(this.ngUnsubscribe)).subscribe(now => {
          this.now = now;
        });
      }
    } catch (e){
      console.log('Failed to load user details', e);
    }
  }

  logout() {
    this.keycloakService.logout();
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
} 
