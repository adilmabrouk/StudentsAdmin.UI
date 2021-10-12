import { GendersService } from './../../services/genders.service';
import { Student } from './../../Interfaces/Student';
import { StudentsService } from './../students.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/Interfaces/Gender';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  studentId: string | null;
  genderList: Gender[] = [];
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
  constructor(private readonly studentsService : StudentsService,
              private readonly route: ActivatedRoute,
              private readonly gendersService : GendersService,
              private readonly snackBar : MatSnackBar,
              private router : Router
            ) { }

  ngOnInit(): void
  {
        this.getStudentById();
        this.getGendersList();
  }

  getStudentById()
  {
    this.route.paramMap.subscribe(
      (params)=>
      {
        this.studentId = params.get('id');
        if(this.studentId)
        this.studentsService.getStudent(this.studentId).subscribe(
        (successResponse)=>
        {
            this.student = successResponse;
        })});
  }

  getGendersList()
  {
    this.gendersService.getGenders().subscribe(
      (successResponse)=>
      {
        this.genderList = successResponse;
      }
    )
  }

  onUpdate(): void
  {
     this.studentsService.updateStudent(this.student.id , this.student)
     .subscribe((successResponse)=>
     {
      this.snackBar.open('Student Updated Successfully','Ok',{duration:2000});
     },
     (errorResponse)=>{
         // Log it
     })
  }

  onDelete(): void
  {
     this.studentsService.deleteStudent(this.studentId).subscribe(
       (successResponse)=>{
        this.snackBar.open('Student Deleted Successfully','Ok',{duration:2000});

        setTimeout(()=>{
          this.router.navigateByUrl('');
        },2000);
       },
       ()=>{
         // Log it
       }
     )
  }





}
