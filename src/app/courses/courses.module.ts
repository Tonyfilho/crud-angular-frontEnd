import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './containers/courses/courses.component';
import { HttpClientModule } from '@angular/common/http';

import { CourseFormComponent } from './containers/course-form/course-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { courseResolver } from './guards/course.resolver';







const ROUTERS_COURSES: Routes = [
  {path:"",  component: CoursesComponent},
  {path:"new", component: CourseFormComponent, resolve: { course: courseResolver}}, //pegando os dados pelos Resolver Objeto vazio
  {path:"edit/:id", component: CourseFormComponent, resolve: { course: courseResolver}}, //pegando os dados pelos Resolver Objeto pelo Id
];

@NgModule({
    imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTERS_COURSES),
    CoursesComponent,
    CourseFormComponent,
    CoursesListComponent,
]
})
export class CoursersModule { }
