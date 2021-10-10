import { Student } from './../Interfaces/Student';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private baseApiUrl = "https://localhost:44382/api";

  constructor( private http : HttpClient) { }

  getStudents() : Observable<Student[]>
  {
    return this.http.get<Student[]>(this.baseApiUrl + "/students");
  }
}
