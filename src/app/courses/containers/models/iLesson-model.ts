import { FormControl, FormGroup } from "@angular/forms";

export interface ILesson {
  id: string | number;
  name: string;
  youtubeUrl: string;


}
export interface ILessoForms extends FormGroup<{
  id: FormControl<string | number | null>;
  name: FormControl<string | null>;
  youtubeUrl: FormControl<string | null>;
}> {}

