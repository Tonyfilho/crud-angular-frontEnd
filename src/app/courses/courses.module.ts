import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMaterialModule } from '../_share/app-material/app-material.module';
import { CoursesComponent } from './courses.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../_share/shared.module';






const ROUTERS_COURSES: Routes = [
  {path:"", redirectTo:"coursers"}
];

@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild(ROUTERS_COURSES),
  ]
})
export class CoursersModule { }
