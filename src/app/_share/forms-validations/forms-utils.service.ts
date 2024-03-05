import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsUtilsService {



  /**Este é um metodo rercusivo, onde ele percorrer to o formulario intependente da quantidade de forms */
  /**
   * original loiane
   *   validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (
        control instanceof UntypedFormGroup ||
        control instanceof UntypedFormArray
      ) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormFields(control);
      }
    });
  }
   */

  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      //  console.log(field);
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control?.markAsTouched({ onlySelf: true }); /**este prop. diz para validar cada form invidual, caso contrario ficar todos */
      } else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
        control?.markAsTouched({ onlySelf: true });
        control?.markAsDirty({ onlySelf: true });
        this.validateAllFormFields(control); /**recurcividade chamando o metodo novamente */
      }
    });
  }





  getErrorMessageForm(formGroup: UntypedFormGroup, fieldName: string) {
    /** ------ou---o CAST em DIAMANTE
     * const localField = formGroup.get(fieldName) as UntypedFormControl;
     * return this.getErrorMessageFronField(localField) ;
     */
    const localField = formGroup.get(fieldName)
    return this.getErrorMessageFronField(<UntypedFormControl>localField);
  };

  getErrorMessageFronField(fieldName: UntypedFormControl, minLenght: number = 5, maxlength: number = 100) {

    if (fieldName?.hasError('required')) {
      return 'You must enter a value';
    }
    if (fieldName?.hasError('minlength')) {
      const requiredLength = fieldName.errors ? fieldName.errors['minlength']['requiredLength'] : minLenght; // se tiver retorno a qyantidade, senão retorno o valor padrão
      return `Min lenght: ${requiredLength}`;
    }
    if (fieldName?.hasError('maxlength')) {
      const requiredLength = fieldName.errors ? fieldName.errors['maxlength']['requiredLength'] : maxlength;
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

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const localFormArray = formGroup.get(formArrayName) as UntypedFormArray;
    // return !localFormArray.valid && localFormArray.hasError(('required')) // para testes;
    return !localFormArray.valid && localFormArray.hasError(('required')) && localFormArray.touched;
  }



}
