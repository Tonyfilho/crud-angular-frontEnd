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





  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string, minLenght?: number, maxlength?: number) {
    /** ------ou---o CAST em DIAMANTE
     * const localField = formGroup.get(fieldName) as UntypedFormControl;
     * return this.getErrorMessageFronField(localField) ;
     */
    const localField = formGroup.get(fieldName)
    return this.getErrorMessageFromField(<UntypedFormControl>localField, minLenght, maxlength);
  };

  getErrorMessageFromField(fieldName: UntypedFormControl, minLenght: number = 5, maxlength: number = 100) {

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

  getErrorMessageFromFormArrayField(formGroup: UntypedFormGroup, formArrayName: string, fieldName: string, index: number) {
    const localFormArray = formGroup.get(formArrayName) as UntypedFormArray;
    const localfield = localFormArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(localfield);
    /** ou-- usar o Diamante depois
     * const localfield = localFormArray.controls[index].get(fieldName)
     * return this.getErrorMessageFronField(<UntypedFormControl>localfield);
     */
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const localFormArray = formGroup.get(formArrayName) as UntypedFormArray;
    // return !localFormArray.valid && localFormArray.hasError(('required')) // para testes;
     console.log("no service invalid e required: ", !localFormArray.valid && localFormArray.touched);
     console.log("no service touched: ", localFormArray.touched);
    return !localFormArray.valid || localFormArray.touched && localFormArray.hasError('required')
  }



}
