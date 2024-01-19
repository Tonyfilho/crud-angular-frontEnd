import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorDialogComponent } from './components-material/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmationDialogComponent } from './components-material/confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,

  ],
  exports: [ErrorDialogComponent, CategoryPipe, ConfirmationDialogComponent]
})
export class SharedModule { }
