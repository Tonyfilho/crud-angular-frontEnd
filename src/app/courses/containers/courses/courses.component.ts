import { AsyncPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/_share/components-material/confirmation-dialog/confirmation-dialog.component';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { ICourse } from '../../models/iCourse-model';
import { ICoursePage } from '../../models/iCourse-page';
import { CoursesService } from '../../services/courses.service';

@Component({
    selector: 'app-coursers',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
    standalone: true,
    imports: [
    MatCard,
    MatToolbar,
    CoursesListComponent,
    MatPaginator,
    MatProgressSpinner,
    AsyncPipe
],
})
export class CoursesComponent {


  cursoPages$!: Observable<ICoursePage>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;  /**Manipula a tag do HTML <paginator></paginator> */
  // @Input({ transform: numberAttribute }) pageSize: number = 10; /**Input entra de dados p/ TAG Paginator Paginator ou setar direto no html [pageSize]*/
  //  @Input({ transform: numberAttribute }) pageIndex: number = 0; /**Input entra de dados p/ TAG  Paginator ou setar direto no html [pageIndex] */
  // @Input({ transform: numberAttribute }) length!: number /**Input entra de dados p/ TAG  Paginator, ou setar direto no html [lenght] */
  // @Output() page!: EventEmitter<PageEvent>; /**OutPut Saida de dados da Tag para o Compomente.ts  ou setar diretamente no html (page)*/
  pageIndex: number = 0;
  pageSize: number = 10;

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

  onEdit(course: ICourse) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  };

  onDelete(course: ICourse) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { name: "Are you Sure", color: "accent" },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.courseService.remove(course._id as string).subscribe({
          next: () => {
            this.matSnckBar.open('Course was Delete!', 'X', { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' });
            this.reflesh(); //setando um valor padrão o construtor permite fica vasio
          },
        });
      }
    });

  };

  /**PageEvent  é um Objeto que pode ser visto na class PageEvent, setando um valor padrão o Methodo já não precisa ser setado ficando OPCIONAL this.reflesh()  */
  reflesh(event: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    this.cursoPages$ = this.courseService.list(event.pageIndex, event.pageSize).pipe(
      tap(() => {
        this.pageIndex = event.pageIndex; this.pageSize = event.pageSize;
        console.log("pageSize: ", event.pageSize);
      }),

      catchError(e => {
        this.courseService.openDialogError({ ...e });
        // return pode ser o of ou throwError
        return throwError(() => e);
      }));
  }


}
