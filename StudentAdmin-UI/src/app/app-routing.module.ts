import { ViewStudentComponent } from './students/view-student/view-student.component';
import { StudentsComponent } from './students/students.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {
    path : '',
    component : StudentsComponent
  },
  {
    path: 'students',
    component: StudentsComponent
  },
  {
    path: 'student/:id',
    component: ViewStudentComponent
  }
];

@NgModule({
  declarations: [],

  imports: [
    RouterModule.forRoot(routes)
  ],

  exports:[RouterModule]
})
export class AppRoutingModule { }
