import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ICoursesForms, ICoursesModel, } from 'src/app/_share/_models/iCourses-model';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  form: ICoursesForms;
  constructor(private fb: FormBuilder, private courseService: CoursesService, private _snackBar: MatSnackBar, private router: Router, private location: Location) {
    this.form = fb.group({
      name: [''],
      category: ['']
    })

  }

  onSubmit() {
    this.courseService.save(this.form.value as ICoursesModel).subscribe({
      next: res => {
        this.openSnackBar("All right! New Course save.")
        this.onCancel();
        console.log(res);
      },
      error: err => {
        this.openSnackBar('Sorry you can not save your course!');
        this.form.reset();
      }

    });
  }

  onCancel() {
    this.form.reset();
    this.location.back();
    // this.router.navigate(['/courses']); usando o location

  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, '', { duration: 5000 });
  }

}