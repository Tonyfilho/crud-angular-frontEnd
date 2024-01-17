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
  constructor(private fb: FormBuilder, private courseService: CoursesService, private _snackBar: MatSnackBar) {
    this.form = fb.group({

      name: [''],
      category: ['']
    })

  }

  onSubmit() {
    this.courseService.save(this.form.value as ICoursesModel).subscribe({
      next: res => { console.log("Our Res: ", res)},
      error: err => {
        console.log(err)
        this.openSnackBar('Sorry you can not save your course!', '');
        this.onCancel();
      }

    });
  }

  onCancel() {
    this.form.reset();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration:5000});
  }

}
