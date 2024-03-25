import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IErrorsHttpModel } from '../../../courses/models/iErrorsHttp-model';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-error-dialog',
    templateUrl: './error-dialog.component.html',
    styleUrls: ['./error-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton]
})
export class ErrorDialogComponent {

  /**DialogData é o tipo pode ser o Observable de error do service como um string, usaremos o Observable error
  ******constructor(@Inject(MAT_DIALOG_DATA) public data: string) {} *****/

  constructor(@Inject(MAT_DIALOG_DATA) public data: IErrorsHttpModel) { }

}
