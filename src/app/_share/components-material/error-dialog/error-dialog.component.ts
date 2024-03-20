import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IErrorsHttpModel } from '../../../courses/models/iErrorsHttp-model';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent {

  /**DialogData é o tipo pode ser o Observable de error do service como um string, usaremos o Observable error
  ******constructor(@Inject(MAT_DIALOG_DATA) public data: string) {} *****/

  constructor(@Inject(MAT_DIALOG_DATA) public data: IErrorsHttpModel) { }

}
