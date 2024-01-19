import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ICoursesForms, ICoursesModel, } from 'src/app/_share/_models/iCourses-model';
import { CoursesService } from '../../services/courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  form!: ICoursesForms;
  localButton: string = "Save"
  constructor(private fb: FormBuilder, private courseService: CoursesService, private _snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute) {
    const localCourse: ICoursesModel = this.route.snapshot.data['course'];
   //console.log(localCourse.category);
    this.form = this.fb.group({
      _id: [''],
      name: new FormControl(''),
      category: new FormControl('')
    });
    this.form.setValue({
      _id: localCourse._id as any,
      name: localCourse.name,
      category: localCourse.category,
    });

    this.form.get('_id')?.value ? this.localButton = "Update": this.localButton = "Save"
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
