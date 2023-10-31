import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ICoursesModel } from '../_share/_models/iCourses-model';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-coursers',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  displayedColumns = ['name', 'category']; //collun names
  coursesList!: Observable<ICoursesModel[]>;

  constructor(private courseService: CoursesService) {
     this.coursesList = this.courseService.list();
  }

}
