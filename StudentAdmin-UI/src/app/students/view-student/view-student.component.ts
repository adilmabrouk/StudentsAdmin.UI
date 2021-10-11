import { Student } from './../../Interfaces/Student';
import { StudentsService } from './../students.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  studentId: string | null;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }
  constructor(private studentsService : StudentsService,private readonly route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      (params)=>
      {
        this.studentId = params.get('id');
        if(this.studentId)
        this.studentsService.getStudent(this.studentId).subscribe(
          (successResponse)=>{
            this.student = successResponse;
            console.log(this.student);

          }
        )
      }
    )
  }





}
