import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICoursesModel } from 'src/app/_share/_models/iCourses-model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  readonly displayedColumns = ['_id', 'name', 'category', 'actions']; //collun names
 @Input() coursesList!: ICoursesModel[];

  constructor(public dialog: MatDialog,  private router: Router, private route: ActivatedRoute
  ) {  }


  onAdd() {
    // this.router.navigate(['courses/new']); Criando Rota relativa, independente do nome "Removeremos o courses"
     this.router.navigate(['new'], {relativeTo:this.route});

   }
}
