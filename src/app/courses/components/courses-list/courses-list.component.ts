import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICoursesModel } from 'src/app/_share/_models/iCourses-model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  readonly displayedColumns = ['_id', 'name', 'category', 'actions']; //collun names
 @Input() coursesList!: ICoursesModel[];
 @Output() add = new  EventEmitter(false)

  constructor(public dialog: MatDialog,
  ) {  }


  onAdd() {
    // this.router.navigate(['courses/new']); Criando Rota relativa, independente do nome "Removeremos o courses"
    this.add.emit(true);
   }
}
