import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMaterialModule } from '../_share/app-material/app-material.module';
import { CoursesComponent } from './containers/courses/courses.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../_share/shared.module';
import { CourseFormComponent } from './containers/course-form/course-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesListComponent } from './components/courses-list/courses-list.component';







const ROUTERS_COURSES: Routes = [
  {path:"",  component: CoursesComponent},
  {path:"new", component: CourseFormComponent},
  {path:"edit/:id", component: CourseFormComponent},
];

@NgModule({
  declarations: [
    CoursesComponent,
    CourseFormComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTERS_COURSES),
  ]
})
export class CoursersModule { }
