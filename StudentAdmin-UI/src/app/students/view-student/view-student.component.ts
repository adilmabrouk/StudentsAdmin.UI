import { GendersService } from './../../services/genders.service';
import { Student } from './../../Interfaces/Student';
import { StudentsService } from './../students.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/Interfaces/Gender';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

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
  isNewStudent: boolean;
  header: string = '';
  dispalyProfileImageUrl: string = '';
  @ViewChild('studentDetailsForm') studentDetailsForm?: NgForm;

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
        {
          if(this.studentId.toLowerCase() === 'Add'.toLowerCase())
          {
            this.isNewStudent = true;
            this.header = 'Add New Student';
            this.setImage();
          }
          else
          {
            this.isNewStudent = false;
            this.header = 'Edit Student';

            this.studentsService.getStudent(this.studentId).subscribe(
              (successResponse)=>
              {
                  this.student = successResponse;
                  this.setImage();
              },
              (errorResponse)=>
              {
                this.setImage();
              })
          }
        }
      });
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
    if(this.studentDetailsForm.form.valid)
    {
      this.studentsService.updateStudent(this.student.id , this.student)
      .subscribe((successResponse)=>
      {
       this.snackBar.open('Student Updated Successfully','Ok',{duration:2000});

       setTimeout(()=>{
         this.router.navigateByUrl('');
      },2000)
      },
      (errorResponse)=>{
          console.log(errorResponse);
      })
    }
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

  onAdd(): void
  {
    if(this.studentDetailsForm.form.valid)
    {
      this.studentsService.addStudent(this.student).subscribe(
        (successResponse)=>{
         this.snackBar.open('Student Added Successfully','Ok',{duration:2000});

         setTimeout(()=>{
            this.router.navigateByUrl(`student/${successResponse.id}`);
         },2000)
        },
        (errorResponse)=>{
           console.log(errorResponse);

        }
      )
    }
  }
  uploadImage(event: any):void
  {
      if(this.studentId)
      {
        const file: File = event.target.files[0];
        this.studentsService.uploadImage(this.student.id,file).subscribe(
          (successResponse)=>{
             this.student.profileImageUrl = successResponse;
             this.setImage();
             this.snackBar.open('Profile Image Updated','Ok',{duration:2000});
          },
          (errorResponse)=>{
             console.log(errorResponse);

          }
        )
      }
  }

  setImage():void
  {
    if(this.student.profileImageUrl)
    {
       this.dispalyProfileImageUrl = this.studentsService.getImagePath(this.student.profileImageUrl);
    }
    else
    {
      this.dispalyProfileImageUrl = '/assets/user.png';
    }
  }





}
