import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, first, of, throwError } from 'rxjs';


import { ICourse } from '../models/iCourse-model';
import { ErrorDialogComponent } from 'src/app/_share/components-material/error-dialog/error-dialog.component';
import { IErrorsHttpModel } from 'src/app/courses/models/iErrorsHttp-model';
import { ConfirmationDialogComponent } from 'src/app/_share/components-material/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  //private readonly API = "./../../assets/_mockup_services/courses.json";
  //private readonly API = "http://localhost:8080/api/courses";
 // private readonly API = "api/courses"; //Usaremos o Proxy para resolver o error de CORRs(Corrs é feito por segurança)
 private readonly API = "api/coursesexeption"; //mudamos o ENDPOINT para a versão mais atual do backend

  /**Dialog fpoi oserviço criado para abrir a PopUp de error, aqui pelo Service sem ter que ir para compoment */
  constructor(private http: HttpClient, public dialog: MatDialog) { }

  list(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.API)
      .pipe(
        first(), //just get 1 subscrition, after that close the conection
        // delay(1000), // create a delay to see the spinner in front 3s
        //tap(localCourses => console.log(localCourses)),
        catchError(e => {
          this.openDialogError({ ...e })
          /**Precisamos devolver um observable, mesmo q seja um Array vazio */
          return of([])
        }))

  }

  loadById(id: string): Observable<ICourse> {
    return this.http.get<ICourse>(`${this.API}/${id}`)
      .pipe(
        first(),
        catchError(e => {
          this.openDialogError({ ...e })

          return throwError(() => console.error(e));
        }))
  }

  //save(record: Partial<{ _id?: string | null | undefined; name: string ; category: string  }>) {
  save(record: ICourse): Observable<ICourse> {
    if (!record._id) {
     // console.log("record: ", record._id);
      return this.create(record);
    }
   // console.log("update: ", record);
    return this.update(record);
  }

  private create(record: Partial<ICourse>) {
    return this.http.post<ICourse>(this.API, record).pipe(first(), catchError(e => {
      this.openDialogError({ ...e })
      return throwError(() => console.error(e));
    }));
  }

  private update(record: Partial<ICourse>) {
    return this.http.put<ICourse>(`${this.API}/${record._id}`, record).pipe(first(), catchError(e => {
      this.openDialogError({ ...e })
      return throwError(() => console.error(e));
    }));
  }
  remove(id: string): Observable<Object> {
    return this.http.delete(`${this.API}/${id}`).pipe(first(), catchError(e => {
      this.openDialogError({ ...e })
      return throwError(() => console.error(e));
    }));
  }




  /**Method to load Error Modal */
  openDialogError(errorMsg: IErrorsHttpModel) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  openDialog(message: string, color: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {name: message, color: color},
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {


    });
  }

}
