import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, first, throwError } from 'rxjs';
import { ICoursesModel } from '../../../_share/_models/iCourses-model';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-coursers',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {


  coursesList$!: Observable<ICoursesModel[]>;

  constructor(private courseService: CoursesService, private router: Router, private route: ActivatedRoute, private matSnckBar: MatSnackBar
  ) {
    this.reflesh();
  };


  onAdd(arg0: any) {
    this.router.navigate(['new'], { relativeTo: this.route });
  };

  onEdit(course: ICoursesModel) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  };

  onDelete(course: ICoursesModel) {
    this.courseService.remove(course._id as string).subscribe({
      next: () => {
        // this.courseService.openDialogSuccess({ name: 'Uoolll', status: 200, statusText: 'Everything Delete', url: '' });
        this.matSnckBar.open('Course was Delete!', 'X', { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' });
        this.reflesh();
      },

    });
  };
  reflesh() {
    this.coursesList$ = this.courseService.list().pipe(catchError(e => {
      this.courseService.openDialogError({ ...e });
      // return pode ser o of ou throwError
      return throwError(() => e);
    }));
  }


}
