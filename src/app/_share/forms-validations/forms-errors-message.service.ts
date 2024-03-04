import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/courses/services/courses.service';

@Injectable({
  providedIn: 'root'
})
export class FormsErrorsMessageService {



  constructor(private fb: FormBuilder, private courseService: CoursesService, private _snackBar: MatSnackBar, private location: Location) {

  }



  getErrorMessageForm(formGroup: UntypedFormGroup, fieldName: string) {
    /** ------ou---o CAST em DIAMANTE
     * const localField = formGroup.get(fieldName) as UntypedFormControl;
     * return this.getErrorMessageFronField(localField) ;
     */
    const localField = formGroup.get(fieldName)
    return this.getErrorMessageFronField(<UntypedFormControl>localField);
  };

  getErrorMessageFronField(fieldName: UntypedFormControl) {

    if (fieldName?.hasError('required')) {
      return 'You must enter a value';
    }
    if (fieldName?.hasError('minlength')) {
      const requiredLength = fieldName.errors ? fieldName.errors['minlength']['requiredLength'] : 5; // se tiver retorno a qyantidade, senão retorno o valor padrão
      return `Min lenght: ${requiredLength}`;
    }
    if (fieldName?.hasError('maxlength')) {
      const requiredLength = fieldName.errors ? fieldName.errors['maxlength']['requiredLength'] : 100;
      return `Max lenght: ${requiredLength}`;
    }
    // formGroup.getError('name')
    return 'Not a valid field';
  };

  getFormArrayField(formGroup: UntypedFormGroup, formArrayName: string, fieldName: string, index: number) {
    const localFormArray = formGroup.get(formArrayName) as UntypedFormArray;
    const localfield = localFormArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFronField(localfield);
    /** ou-- usar o Diamante depois
     * const localfield = localFormArray.controls[index].get(fieldName)
     * return this.getErrorMessageFronField(<UntypedFormControl>localfield);
     */
  }

  isFormArrayRequired(formGroup : UntypedFormArray){
    const localLesson = formGroup.get('lessons') as UntypedFormArray;
   // return !localLesson.valid && localLesson.hasError(('required')) // para testes;
    return !localLesson.valid && localLesson.hasError(('required'))&& localLesson.touched;
  }


  verificaValidacoesForm(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();
      if (controle instanceof UntypedFormGroup || controle instanceof UntypedFormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }


}
