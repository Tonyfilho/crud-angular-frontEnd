import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, throwError } from 'rxjs';
import { ICoursesModel } from '../_share/_models/iCourses-model';
import { CoursesService } from './courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-coursers',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  displayedColumns = ['_id', 'name', 'category', 'actions']; //collun names
  coursesList$!: Observable<ICoursesModel[]>;

  constructor(private courseService: CoursesService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute
  ) {
    this.coursesList$ = this.courseService.list().pipe(catchError(e =>  {
      this.courseService.openDialogError({...e})
     // return pode ser o of ou throwError
      return throwError(() => e)
    }));

  }


  onAdd() {
   // this.router.navigate(['courses/new']); Criando Rota relativa, independente do nome "Removeremos o courses"
    this.router.navigate(['new'], {relativeTo:this.route});

  }


}
