import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, delay, first, of, tap } from 'rxjs';
import { IErrorsHttpModel } from '../_share/_models/iErrorsHttp-model';
import { ErrorDialogComponent } from '../_share/components-material/error-dialog/error-dialog.component';
import { ICoursesModel } from './../_share/_models/iCourses-model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API = "./../../assets/_mockup_services/courses.json";

/**Dialog fpoi oserviço criado para abrir a PopUp de error, aqui pelo Service sem ter que ir para compoment */
  constructor(private http: HttpClient, public dialog: MatDialog) { }

  list() {
    return this.http.get<ICoursesModel[]>(this.API)
      .pipe(
        first(), //just get 1 subscrition, after that close the conection
        delay(1000), // create a delay to see the spinner in front 3s
        tap(localCourses => console.log(localCourses)),
        catchError(e => {
          //  console.error("Error Course: ", e.name)
          this.openDialogError({ ...e })
          /**Precisamos devolver um observable, mesmo q seja um Array vazio */
          return of([])
        }))

  }


  /**Method to load Error Modal */

  openDialogError(errorMsg: IErrorsHttpModel) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }




}
