import { FormControl } from "@angular/forms";

export interface SubThemeForm {
  name: FormControl<string>;
  description: FormControl<string>;
}


export interface SubThemeFormValue {
  name: string;
  descritpion: string;
}