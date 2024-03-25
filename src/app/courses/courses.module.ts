import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { CoursesComponent } from './containers/courses/courses.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseFormComponent } from './containers/course-form/course-form.component';
import { ROUTERS_COURSES } from './courser.routes';









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
