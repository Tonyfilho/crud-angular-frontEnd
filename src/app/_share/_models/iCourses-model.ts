import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { ILesson } from "./iLesson-model";

export interface ICourses {
  _id: string | number;
  name: string;
  category: string;
  lesson: ILesson [];


}
export interface ICoursesForms extends FormGroup< {
  _id: FormControl<string | null>;
  name: FormControl<string | null>;
  category: FormControl<string | null>;
  lesson?: FormArray<ILesson | any>;


}> {}

