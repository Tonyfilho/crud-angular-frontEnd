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
import { courseResolver } from './_guards/course.resolver';







const ROUTERS_COURSES: Routes = [
  {path:"",  component: CoursesComponent},
  {path:"new", component: CourseFormComponent, resolve: { course: courseResolver}}, //pegando os dados pelos Resolver Objeto vazio
  {path:"edit/:id", component: CourseFormComponent, resolve: { course: courseResolver}}, //pegando os dados pelos Resolver Objeto pelo Id
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
