import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, first, throwError } from 'rxjs';
import { ICourses } from '../../models/iCourses-model';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/_share/components-material/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-coursers',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {


  coursesList$!: Observable<ICourses[]>;

  constructor(private courseService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private matSnckBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.reflesh();
  };


  onAdd(arg0: any) {
    this.router.navigate(['new'], { relativeTo: this.route });
  };

  onEdit(course: ICourses) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  };

  onDelete(course: ICourses) {

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { name: "Are you Sure", color: "accent" },
      });
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.courseService.remove(course._id as string).subscribe({
            next: () => {
              this.matSnckBar.open('Course was Delete!', 'X', { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' });
              this.reflesh();
            },
          });
        }
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
