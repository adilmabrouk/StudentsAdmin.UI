import { Student } from './../Interfaces/Student';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentRequest } from '../Interfaces/StudentRequest';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private baseApiUrl = 'https://localhost:44382/api';

  constructor( private http : HttpClient) { }

  getStudents() : Observable<Student[]>
  {
    return this.http.get<Student[]>(this.baseApiUrl + '/students');
  }

  getStudent(studentId: string): Observable<Student>
  {
    return this.http.get<Student>(this.baseApiUrl + '/students/' + studentId );
  }

  updateStudent(studentId: string, studentRequest: Student): Observable<Student>
  {
     const updateStudentRequest: StudentRequest =
     {

        firstName: studentRequest.firstName,
        lastName: studentRequest.lastName,
        dateOfBirth: studentRequest.dateOfBirth,
        email: studentRequest.email,
        mobile: studentRequest.mobile,
        genderId: studentRequest.genderId,
        physicalAddress: studentRequest.address.physicalAddress,
        postalAddress: studentRequest.address.postalAddress

     }
     return this.http.put<Student>(this.baseApiUrl + '/students/' + studentId, updateStudentRequest);
  }

  deleteStudent(studentId: string): Observable<Student>
  {
    return this.http.delete<Student>(this.baseApiUrl + '/students/' + studentId);
  }

  addStudent(studentRequest: Student): Observable<Student>
  {
    const addStudentRequest: StudentRequest =
    {

       firstName: studentRequest.firstName,
       lastName: studentRequest.lastName,
       dateOfBirth: studentRequest.dateOfBirth,
       email: studentRequest.email,
       mobile: studentRequest.mobile,
       genderId: studentRequest.genderId,
       physicalAddress: studentRequest.address.physicalAddress,
       postalAddress: studentRequest.address.postalAddress

    }
    return this.http.post<Student>(this.baseApiUrl + '/students/add',addStudentRequest);
  }
}
