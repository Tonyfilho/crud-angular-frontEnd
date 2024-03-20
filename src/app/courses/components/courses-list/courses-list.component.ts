import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICourses } from 'src/app/courses/containers/models/iCourses-model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  readonly displayedColumns = ['_id', 'name', 'category', 'actions']; //collun names
  @Input() coursesList!: ICourses[];
  @Output() add = new EventEmitter<boolean>(false);
  @Output() edit = new EventEmitter<ICourses>();
  @Output() delete = new EventEmitter<ICourses>();


  constructor(public dialog: MatDialog,
    ) { }


    onAdd() {
      // this.router.navigate(['courses/new']); Criando Rota relativa, independente do nome "Removeremos o courses"
      this.add.emit(true);
    }


    onEdit(oneCourse: ICourses) {
      this.edit.emit(oneCourse)

    }
    onDelete(course: ICourses) {
    this.delete.emit(course);
    }
}
