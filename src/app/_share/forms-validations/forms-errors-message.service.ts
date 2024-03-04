import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/courses/services/courses.service';

@Injectable({
  providedIn: 'root'
})
export class FormsErrorsMessageService {

  form!: UntypedFormGroup;

  constructor(private fb: FormBuilder, private courseService: CoursesService, private _snackBar: MatSnackBar, private location: Location) {
    this.form = this.fb.group({
      _id: [''],
      name: new FormControl(''),
      category: new FormControl(''),
      lessons: this.fb.array([]),
    });
  }



  getErrorMessageForm(fieldName: string) {
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
