import { Component, Input } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ICoursesModel } from 'src/app/_share/_models/iCourses-model';
import { CoursesService } from '../courses.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  readonly displayedColumns = ['_id', 'name', 'category', 'actions']; //collun names
 @Input() coursesList!: ICoursesModel[];

  constructor(private courseService: CoursesService, public dialog: MatDialog
  ) {


  }
}
