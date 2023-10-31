import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ICoursesModel } from '../_share/_models/iCourses-model';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-coursers',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  displayedColumns = ['name', 'category']; //collun names
  coursesList$!: Observable<ICoursesModel[]>;

  constructor(private courseService: CoursesService, public dialog: MatDialog) {
     this.coursesList$ = this.courseService.list();

  }





}
