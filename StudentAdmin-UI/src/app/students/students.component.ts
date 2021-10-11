import { Student } from './../Interfaces/Student';
import { StudentsService } from './students.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students : Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender','edit'];
  dataSource : MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matpaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString:string = '';

  constructor(private studentsService : StudentsService) { }

  ngOnInit(): void {

    //fetch students
    this.studentsService.getStudents()
    .subscribe(

      (successResponse) =>{

        this.students = successResponse;

        this.dataSource = new MatTableDataSource<Student>(this.students);

        if(this.matpaginator)
        {
          this.dataSource.paginator = this.matpaginator;
        }

        if(this.matSort)
        {
          this.dataSource.sort = this.matSort;
        }
      },

      (errorResponse) =>{

        console.log(errorResponse);

      }
    )
  }


  filterStudents()
  {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

}
