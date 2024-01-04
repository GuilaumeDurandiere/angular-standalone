import { FormArray, FormControl } from "@angular/forms";
import { PrimeIcons } from "primeng/api";

export interface ThemeForm {
  icon: FormControl<PrimeIcons>;
  name: FormControl<string>;
  description: FormControl<string>;
  status: FormControl<boolean>;
  subtheme: FormArray;
};

export interface SubThemeForm {
  name: FormControl<string>;
  description: FormControl<string>;
}

export interface ThemeFormValue {
  icon: PrimeIcons;
  name: string;
  description: string;
  status: boolean;
  subtheme: SubThemeForm;
}

export interface SubThemeFormValue {
  name: string;
  descritpion: string;
}