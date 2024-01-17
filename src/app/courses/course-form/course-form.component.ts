import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ICoursesForms, ICoursesModel,  } from 'src/app/_share/_models/iCourses-model';
import { CoursesService } from '../courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  form: ICoursesForms;
  constructor(private fb: FormBuilder, private courseService: CoursesService, private _snackBar: MatSnackBar, private router: Router) {
    this.form = fb.group({

      name: [''],
      category: ['']
    })

  }

  onSubmit() {
    this.courseService.save(this.form.value as ICoursesModel).subscribe({
      next: res => {
        this.form.reset();
       // this.courseService.openDialogError()
       console.log(res);
    },
      error: err => {
        this.openSnackBar('Sorry you can not save your course!', '');

      }

    });
  }

  onCancel() {
    this.form.reset();
    this.router.navigate(['/courses']);

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration:5000});
  }

}
