import { FormArray, FormControl } from "@angular/forms";
import { SubThemeForm } from "./sub-theme-form";

export interface ThemeForm {
  icon: FormControl<string>;
  libelle: FormControl<string>;
  description: FormControl<string>;
  sousThemes: FormArray;
};

export interface ThemeFormValue {
  icon: string;
  libelle: string;
  description: string;
  sousThemes: SubThemeForm[];
}