import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { Routes } from '../routes';

@Injectable()
export class HomeService {

  private apiUrl: string = environment.config.apiUrl;

  constructor(private http: HttpClient) {
  }

  getNow(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${Routes.NOW}`).pipe(map((pojo: any) => {
      return new Date(pojo.now);
    }));
  }
}