import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICourse } from 'src/app/courses/models/iCourse-model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
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
