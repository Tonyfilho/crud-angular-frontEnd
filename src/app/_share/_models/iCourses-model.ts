import { FormControl, FormGroup } from "@angular/forms";

export interface ICoursesModel {
  _id: string | number;
  name: string;
  category: string;


}
export interface ICoursesForms extends FormGroup< {
  _id?: FormControl<string | null>;
  name: FormControl<string | null>;
  category: FormControl<string | null>;


}> {}

