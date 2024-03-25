import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICourse } from 'src/app/courses/models/iCourse-model';
import { CategoryPipe } from '../../../_share/pipes/category.pipe';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatIcon,
        MatCardHeader,
        MatMiniFabButton,
        MatIconButton,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        CategoryPipe,
    ],
})
export class CoursesListComponent {

  readonly displayedColumns = ['_id', 'name', 'category', 'actions']; //collun names
  @Input() coursesList!: ICourse[];
  @Output() add = new EventEmitter<boolean>(false);
  @Output() edit = new EventEmitter<ICourse>();
  @Output() delete = new EventEmitter<ICourse>();


 

  constructor(public dialog: MatDialog,
  ) { }


  onAdd() {
    // this.router.navigate(['courses/new']); Criando Rota relativa, independente do nome "Removeremos o courses"
    this.add.emit(true);
  }


  onEdit(oneCourse: ICourse) {
    this.edit.emit(oneCourse)

  }
  onDelete(course: ICourse) {
    this.delete.emit(course);
  }
}
