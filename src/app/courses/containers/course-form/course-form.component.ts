import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      category: new FormControl('', [Validators.required])
    });
    this.form.setValue({
      _id: localCourse._id as any,
      name: localCourse.name,
      category: localCourse.category,
    });

    this.form.get('_id')?.value ? this.localButton = "Update" : this.localButton = "Save"
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


  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'You must enter a value';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5; // se tiver retorno a qyantidade, senão retorno o valor padrão
      return `Min lenght: ${requiredLength}`;
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Max lenght: ${requiredLength}`;
    }

    // this.form.getError('name')
    return 'Not a valid field';

  };



}
