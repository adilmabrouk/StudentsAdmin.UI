import { Gender } from './../Interfaces/Gender';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GendersService {

  baseApiUrl = 'https://localhost:44382/api';

  constructor(private readonly http : HttpClient) { }

  getGenders(): Observable<Gender[]>
  {
    return this.http.get<Gender[]>(this.baseApiUrl + '/genders');
  }

}
