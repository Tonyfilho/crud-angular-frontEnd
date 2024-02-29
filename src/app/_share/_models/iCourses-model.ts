import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { ILessoForms, ILesson } from "./iLesson-model";

export interface ICourses {
  _id: string | number;
  name: string;
  category: string;
  lessons: ILesson [];


}
export interface ICoursesForms extends FormGroup< {
  _id: FormControl<string | number|null>;
  name: FormControl<string | null>;
  category: FormControl<string | null>;
  lessons?: ILessoForms;


}> {}

