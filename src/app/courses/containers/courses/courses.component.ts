import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { ICoursesModel } from '../../../_share/_models/iCourses-model';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-coursers',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {


  coursesList$!: Observable<ICoursesModel[]>;

  constructor(private courseService: CoursesService,  private router: Router, private route: ActivatedRoute
    ) {
      this.coursesList$ = this.courseService.list().pipe(catchError(e =>  {
        this.courseService.openDialogError({...e})
        // return pode ser o of ou throwError
        return throwError(() => e)
      }));

    }

    onAdd(arg0: any) {
      this.router.navigate(['new'], {relativeTo:this.route});
    }




}
