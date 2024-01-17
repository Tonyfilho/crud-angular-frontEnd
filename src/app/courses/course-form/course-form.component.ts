import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ICoursesForms,  } from 'src/app/_share/_models/iCourses-model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  form: ICoursesForms;
  constructor(private fb: FormBuilder) {
    this.form = fb.group({

      name: [''],
      category: ['']
    })

  }

  onSubmit() {}

  onCancel() {}
}
